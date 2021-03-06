import {refresh} from "./Mutation";
import {generateJwt, getUser, handleErrors, handleErrors_login} from "./utils";
import {prisma} from "../generated/prisma-client";
import {STATUS} from "../consts";

const axios = require("axios").default;
const querystring = require("querystring");

require('dotenv').config();

async function forceRefresh(parent, args, context) {
  let lastRefresh = await prisma.databaseRefreshes();
  const now: Date = new Date(Date.now());

  if (lastRefresh.length === 0) {
    await prisma.createDatabaseRefresh(
      {
        date: now.toISOString()
      }
    );
  } else {
    await prisma.updateDatabaseRefresh({
      where: {
        id: lastRefresh[0].id
      },
      data: {
        date: now.toISOString()
      }
    })
  }
  await refresh(parent, args, context, "");
}

async function checkShouldRefresh(parent, args, context) {
  let lastRefresh = await prisma.databaseRefreshes();
  const now: Date = new Date(Date.now());

  if (lastRefresh.length === 0) {
    await prisma.createDatabaseRefresh(
      {
        date: now.toISOString()
      }
    );
    await refresh(parent, args, context, "");
  } else {
    const then: Date = new Date(Date.parse(lastRefresh[0].date));
    const diff: number = now.getTime() - then.getTime();
    if (diff > 60 * 60 * 1000) {
      await prisma.updateDatabaseRefresh({
        where: {
          id: lastRefresh[0].id
        },
        data: {
          date: now.toISOString()
        }
      });
      await refresh(parent, args, context, "");
    }
  }
}

async function login(parent, args, context) {
  if (args.code === undefined || args.code === '') {
    throw new Error('Empty code');
  }
  let token = await axios.post("https://login.microsoftonline.com/common/oauth2/v2.0/token",
  querystring.stringify({
    "client_id": "9d7c5742-6f63-4f05-b10c-f5b0c1506582",
    "scope": "https://graph.microsoft.com/User.Read",
    "redirect_uri": "http://localhost:3000",
    "grant_type": "authorization_code",
    "client_secret": process.env.AZURESECRET,
    "code": args.code
  }), {'Content-Type': "application/x-www-form-urlencoded"}
  ).catch((error) => {console.error(error); });
  if (token === undefined || token.data === undefined)
    return null;
  let user_data = await axios.get(
    "https://graph.microsoft.com/v1.0/me",
    {headers: {Authorization: token.data.token_type + " " + token.data.access_token}}
  ).catch((error) => {console.error(error); });
  if (user_data === undefined || user_data.data === undefined)
    return null;
  let user_found = await prisma.user({
    email: user_data.data.mail
  });
  let notifications = [];
  if (user_found === null) {
    user_found = await prisma.createUser({
      name: user_data.data.displayName,
      email: user_data.data.mail,
    });
    await forceRefresh(parent, args, context);
  } else {
    await checkShouldRefresh(parent, args, context);
    notifications = await prisma.user({email: user_data.data.mail}).notifications();
  }
  const jwt = await generateJwt({id: user_found.id });
  const xp = await getXp(parent, args, context, user_found.id);
  return {user: {...user_found, notifications: notifications}, jwt: jwt, xp: xp};
}

async function loginCookie(parent, args, context, userId) {
  await checkShouldRefresh(parent, args, context);
  const xp = await getXp(parent, args, context, userId);
  const user = await prisma.user({id: userId});
  const notifications = await prisma.user({id: userId}).notifications();
  return {
    user: {...user, notifications: notifications},
    xp: xp
  };
}

async function getXp(parent, args, context, userId) {
  const activities = await getActivitiesXp(parent, args, context, userId);
  const makers = await getMakerXp(parent, args, context, userId);
  const sharings = await getSharingXp(parent, args, context, userId);
  const experienceProjects = await getExperienceProjectXp(parent, args, context, userId);
  return {
    got: activities.got + makers.got + sharings.got + experienceProjects.got,
    pending: activities.pending + makers.pending + sharings.pending + experienceProjects.pending
  };
}

async function getActivitiesXp(parent, args, context, userId) {
  let activities = await getUserActivities(parent, args, context, userId);
  const now = new Date(Date.now());

  let got = activities.reduce((acc, elem) => {
    const elemDate = new Date(elem['activity']['end']);
    return elem.presence || (!elem.presence && elemDate < now) ? acc + elem.xp : acc;
  }, 0);
  let pending = activities.reduce((acc, elem) => {
    const elemDate = new Date(elem['activity']['end']);
    return elem.presence === false && elemDate > now ? acc + elem['activity']['xp'] : acc
  }, 0);
  return {got: got, pending: pending};
}

async function getMakerXp(parent, args, context, userId) {
  let makers = await getUserMaker(parent, args, context, userId);
  let got = makers.reduce((acc, elem) => elem.status === STATUS.FINISHED ? acc + elem.xp : acc, 0);
  let pending = makers.reduce((acc, elem) => elem.status === STATUS.ACCEPTED ? acc + elem.xp : acc, 0);
  return {got: got, pending: pending};
}

async function getSharingXp(parent, args, context, userId) {
  let sharings = await getUserSharing(parent, args, context, userId);
  let got = sharings.reduce((acc, elem) => (elem.status === STATUS.FINISHED || elem.status === STATUS.ABSENT) ? acc + elem.xp : acc, 0);
  let pending = sharings.reduce((acc, elem) => elem.status === STATUS.ACCEPTED ? acc + elem.xp : acc, 0);
  return {got: got, pending: pending};
}

async function getExperienceProjectXp(parent, args, context, userId) {
  let experienceProjects = await getUserExperienceProjects(parent, args, context, userId);
  let got = experienceProjects.reduce((acc, elem) => elem.status === STATUS.FINISHED ? acc + 3 : acc, 0);
  let pending = experienceProjects.reduce((acc, elem) => elem.status === STATUS.ACCEPTED ? acc + 3 : acc, 0);
  return {got: got, pending: pending};
}

async function getUserActivities(parent, args, context, userId) {
  const query = `
    query {
      userPresences(
        where: {
          user: {
            id: "${userId}"
          }
        }
      ) {
        presence
        xp
        activity {
          xp
          code
          title
          description
          begin
          end
          type
        }
      }
    }
  `;
  let userPresences = await prisma.$graphql(query);
  return userPresences.userPresences;
}

async function getAllActivities(_parent, _args, _context) {
  return prisma.activities({});
}

async function getUserMaker(parent, args, context, userId) {
  const user = await prisma.user({id: userId});
  if (user === undefined || user === null) {
    throw new Error('Invalid user');
  }
  const query = `
    query {
      makers {
        title
        description
        co_workers
        functionalities
        technologies
        delivery
        organisation
        resources
        informations
        xp
        status
        messages {
          author
          date
          message
        }
      }
    }
  `;
  let allMakers = await prisma.$graphql(query);
  return allMakers.makers.map((elem) => {
    if (elem.co_workers.find(e => e === user.email) !== undefined)
      return elem;
  }).filter((elem) => elem !== undefined);
}

async function getUserSharing(parent, args, context, userId) {
  const user = await getUser(userId);
  const query = `
    query {
      sharings {
        title
        co_workers
        description
        date
        xp
        type
        status
        messages {
          author
          date
          message
        }
      }
    }
  `;
  const allSharing = await prisma.$graphql(query);
  return allSharing.sharings.map((elem) => {
    if (elem.co_workers.find(e => e === user.email) !== undefined)
      return elem;
  }).filter((elem) => elem !== undefined);
}

async function getUserExperienceProjects(parent, args, context, userId) {
  const user = await prisma.user({id: userId});
  if (user === undefined || user === null) {
    throw new Error('Invalid user');
  }
  const query = `
    query {
      experienceProjects {
        title
        user
        description
        competencies
        informations
        status
        messages {
          author
          date
          message
        }
      }
    }
  `;
  const allProjects = await prisma.$graphql(query);
  return allProjects.experienceProjects.map((elem) => {
    if (elem.user === user.email)
      return elem;
  }).filter((elem) => elem !== undefined);
}

async function getAllUserXp(parent, args, context, userId) {
  const admin = await prisma.user({id: userId});
  if ((admin === undefined || admin === null) || admin.privilege === 0) {
    throw new Error('Invalid user');
  }
  await checkShouldRefresh(parent, args, context);
  const allUserActivities = await prisma.$graphql(`
    query {
      userPresences {
        user {
          id
        }
        presence
        xp
        activity {
          xp
          end
        }
      }
    }
  `);
  const allMakers = await prisma.$graphql(`
    query {
      makers {
        co_workers
        status
        xp
      }
    }
  `);
  const allSharings = await prisma.$graphql(`
    query {
      sharings {
        co_workers
        status
        xp
      }
    }
  `);
  const allXpProjects = await prisma.$graphql(`
    query {
      experienceProjects {
        user
        status
      }
    }
  `);
  const now = new Date(Date.now());
  const allUsers = await prisma.users();
  return allUsers.map((user) => {
    const userMakers = allMakers.makers.map((elem) => {
      if (elem.co_workers.find(e => e === user.email) !== undefined)
        return elem;
    }).filter((elem) => elem !== undefined);
    let got = userMakers.reduce((acc, elem) => elem.status === STATUS.FINISHED ? acc + elem.xp : acc, 0);
    let pending = userMakers.reduce((acc, elem) => elem.status === STATUS.ACCEPTED ? acc + elem.xp : acc, 0);
    const userSharings = allSharings.sharings.map((elem) => {
      if (elem.co_workers.find(e => e === user.email) !== undefined)
        return elem;
    }).filter((elem) => elem !== undefined);
    got += userSharings.reduce((acc, elem) => (elem.status === STATUS.FINISHED || elem.status === STATUS.ABSENT) ? acc + elem.xp : acc, 0);
    pending += userSharings.reduce((acc, elem) => elem.status === STATUS.ACCEPTED ? acc + elem.xp : acc, 0);
    const userExperienceProjects = allXpProjects.experienceProjects.map((elem) => {
      if (elem.user === user.email)
        return elem;
    }).filter((elem) => elem !== undefined);
    got += userExperienceProjects.reduce((acc, elem) => elem.status === STATUS.FINISHED ? acc + 3 : acc, 0);
    pending += userExperienceProjects.reduce((acc, elem) => elem.status === STATUS.ACCEPTED ? acc + 3 : acc, 0);
    const userActivities = allUserActivities.userPresences.map((elem) => {
      if (elem.user.id === user.id)
        return elem;
    }).filter((elem) => elem !== undefined);
    got += userActivities.reduce((acc, elem) => {
      const elemDate = new Date(elem['activity']['end']);
      return elem.presence || (!elem.presence && elemDate < now) ? acc + elem.xp : acc;
    }, 0);
    pending += userActivities.reduce((acc, elem) => {
      const elemDate = new Date(elem['activity']['end']);
      return elem.presence === false && elemDate > now ? acc + elem['activity']['xp'] : acc
    }, 0);
    return {email: user.email, xp: {got: got, pending: pending}};
  });
}

async function getAdminUserInfo(parent, args, context, userId) {
  const admin = await prisma.user({id: userId});
  if ((admin === undefined || admin === null) || admin.privilege === 0) {
    throw new Error('Invalid user');
  }
  if (args.email === undefined) {
    throw new Error('No args');
  }
  let user_found = await prisma.user({
    email: args.email
  });
  if (user_found === undefined || user_found === null)
    return null;
  const activitiesXp = await getActivitiesXp(parent, args, context, user_found.id);
  const makers = await getMakerXp(parent, args, context, user_found.id);
  const sharings = await getSharingXp(parent, args, context, user_found.id);
  const experienceProjects = await getExperienceProjectXp(parent, args, context, user_found.id);
  const allXp = await getXp(parent, args, context, user_found.id);
  const activities = await getUserActivities(parent ,args, context, user_found.id);
  return {user: user_found, xp: allXp, activitiesXp: activitiesXp, makerXp: makers, sharingXp: sharings, experienceProjectXp: experienceProjects, activities: activities};
}

async function getAdminMakers(parent, args, context, userId) {
  const admin = await prisma.user({id: userId});
  if ((admin === undefined || admin === null) || admin.privilege === 0) {
    throw new Error('Invalid user');
  }
  const query = `
    query {
      makers {
        id
        title
        description
        co_workers
        functionalities
        technologies
        delivery
        organisation
        resources
        informations
        xp
        status
        messages {
          author
          date
          message
        }
      }
    }
  `;
  const allMakers = await prisma.$graphql(query);
  return allMakers.makers;
}

async function getAdminSharings(parent, args, context, userId) {
  const admin = await prisma.user({id: userId});
  if ((admin === undefined || admin === null) || admin.privilege === 0) {
    throw new Error('Invalid user');
  }
  const query = `
    query {
      sharings {
        id
        title
        co_workers
        description
        date
        xp
        type
        status
        messages {
          author
          date
          message
        }
      }
    }
  `;
  const allSharings = await prisma.$graphql(query);
  return allSharings.sharings;
}

async function getAdminExperienceProjects(parent, args, context, userId) {
  const admin = await prisma.user({id: userId});
  if ((admin === undefined || admin === null) || admin.privilege === 0) {
    throw new Error('Invalid user');
  }
  const query = `
    query {
      experienceProjects {
        id
        title
        user
        description
        competencies
        informations
        status
        messages {
          author
          date
          message
        }
      }
    }
  `;
  const allExperience = await prisma.$graphql(query);
  return allExperience.experienceProjects;
}

export const Query = {
  login: handleErrors(login),
  loginCookie: handleErrors_login(loginCookie),

  getXp: handleErrors_login(getXp),
  getActivitiesXp: handleErrors_login(getActivitiesXp),
  getMakerXp: handleErrors_login(getMakerXp),
  getSharingXp: handleErrors_login(getSharingXp),
  getExperienceProjectXp: handleErrors_login(getExperienceProjectXp),

  getUserActivities: handleErrors_login(getUserActivities),
  getAllActivities: handleErrors(getAllActivities),
  getUserMaker: handleErrors_login(getUserMaker),
  getUserSharing: handleErrors_login(getUserSharing),
  getUserExperienceProjects: handleErrors_login(getUserExperienceProjects),

  getAllUserXp: handleErrors_login(getAllUserXp),
  getAdminUserInfo: handleErrors_login(getAdminUserInfo),
  getAdminMakers: handleErrors_login(getAdminMakers),
  getAdminSharings: handleErrors_login(getAdminSharings),
  getAdminExperienceProjects: handleErrors_login(getAdminExperienceProjects)
};