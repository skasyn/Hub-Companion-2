import {refresh} from "./Mutation";
import {generateJwt, handleErrors, handleErrors_login} from "./utils";
import {prisma} from "../generated/prisma-client";
const axios = require("axios").default;
const querystring = require("querystring");

require('dotenv').config();

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
    if (diff > 1 * 60 * 60 * 1000) {
      await refresh(parent, args, context, "");
      await prisma.updateDatabaseRefresh({
        where: {
          id: lastRefresh[0].id
        },
        data: {
          date: now.toISOString()
        }
      })
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
    outlookId: user_data.data.id
  });
  if (user_found === null) {
    user_found = await prisma.createUser({
      outlookId: user_data.data.id,
      name: user_data.data.displayName,
      email: user_data.data.mail,
    });
    await refresh(parent, args, context, "");
  } else {
    await checkShouldRefresh(parent, args, context);
  }
  const jwt = await generateJwt({id: user_found.id });
  return {user: user_found, jwt: jwt};
}

async function loginCookie(parent, args, context, userId) {
  if (userId === undefined || userId === '') {
    throw new Error('Empty code');
  }
  await checkShouldRefresh(parent, args, context);
  return prisma.user({
    id: userId
  });
}

async function getXp(parent, args, context, userId) {
  if (userId === undefined || userId === '') {
    throw new Error('Empty code');
  }
  let activities = await prisma.user({
    id: userId
  }).activities();
  if (activities === null) {
   throw new Error('User not found');
  }
  let xp = 0;
  for (let activityPresence of activities) {
      xp += activityPresence.xp;
  }
  return xp;
}

async function getUserActivities(parent, args, context, userId) {
  if (userId === undefined || userId === '') {
    throw new Error('Empty code');
  }
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
        activity {
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

async function getAllActivities(parent, args, context) {
  return prisma.activities({});
}

async function getUserMaker(parent, args, context, userId) {
  if (userId === undefined || userId === '') {
    throw new Error('Empty code');
  }
  const user = await prisma.user({id: userId});
  if (user === undefined || user === null) {
    throw new Error('Invalid user');
  }
  const allMakers = await prisma.makers({});
  const userMakers = allMakers.map((elem) => {
    if (elem.co_workers.find(e => e === user.email) !== undefined)
      return elem;
  }).filter((elem) => elem !== undefined);
  return userMakers;
}

async function getUserSharing(parent, args, context, userId) {
  if (userId === undefined || userId === '') {
    throw new Error('Empty code');
  }
  const user = await prisma.user({id: userId});
  if (user === undefined || user === null) {
    throw new Error('Invalid user');
  }
  const allSharings = await prisma.sharings({});
  const userSharings = allSharings.map((elem) => {
    if (elem.co_workers.find(e => e === user.email) !== undefined)
      return elem;
  }).filter((elem) => elem !== undefined);
  return userSharings;
}

async function getUserExperienceProjects(parent, args, context, userId) {
  if (userId === undefined || userId === '') {
    throw new Error('Empty code');
  }
  const user = await prisma.user({id: userId});
  if (user === undefined || user === null) {
    throw new Error('Invalid user');
  }
  const allProjects = await prisma.experienceProjects({});
  const userProjects = allProjects.map((elem) => {
    if (elem.user === user.email)
      return elem;
  }).filter((elem) => elem !== undefined);
  return userProjects;
}

export const Query = {
  login: handleErrors(login),
  loginCookie: handleErrors_login(loginCookie),
  getXp: handleErrors_login(getXp),
  getUserActivities: handleErrors_login(getUserActivities),
  getAllActivities: handleErrors(getAllActivities),
  getUserMaker: handleErrors_login(getUserMaker),
  getUserSharing: handleErrors_login(getUserSharing),
  getUserExperienceProjects: handleErrors_login(getUserExperienceProjects),
};