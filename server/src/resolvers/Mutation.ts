import {handleErrors_login} from "./utils";
import {getActivities} from "./refresh";
import {prisma} from "../generated/prisma-client";
import {STATUS} from "../consts";

require('dotenv').config();

export async function refresh(parent, args, context, userId) {
  // TODO: Change into custom fields
  const year = "2019";
  const hubModule = "B-INN-000";
  const city = "PAR";

  await getActivities(year, hubModule, city);
  return true;
}

async function submitMaker(parent, args, context, userId) {
  if (userId === undefined || userId === '' || args.data === undefined || args.data === '') {
    throw new Error('Empty code');
  }
  const data = JSON.parse(args.data);
  try {
    await prisma.createMaker(
      {
        title: data.title,
        description: data.description,
        co_workers: { set: data.co_workers },
        functionalities: data.functionalities,
        technologies: data.technologies,
        delivery: data.delivery,
        organisation: data.organisation,
        resources: data.resources,
        informations: data.informations,
        status: 0,
      }
    )
  } catch (e) {
    return false;
  }
  return true;
}

async function submitSharing(parent, args, context, userId) {
  if (userId === undefined || userId === '' || args.data === undefined || args.data === '') {
    throw new Error('Empty code');
  }
  const data = JSON.parse(args.data);
  const zeroDate = new Date(0);
  try {
    await prisma.createSharing(
      {
        title: data.title,
        description: data.description,
        co_workers: { set: data.co_workers },
        date: zeroDate.toISOString(),
        status: 0,
      }
    );
  } catch (e) {
    return false;
  }
  return true;
}

async function submitExperienceProject(parent, args, context, userId) {
  if (userId === undefined || userId === '' || args.data === undefined || args.data === '') {
    throw new Error('Empty code');
  }
  const data = JSON.parse(args.data);
  try {
    await prisma.createExperienceProject(
      {
        user: data.user,
        title: data.title,
        description: data.description,
        competencies: data.competencies,
        informations: data.informations,
        status: 0,
      }
    );
  } catch (e) {
    return false;
  }
  return true;
}

async function setYear(parent, args, context, userId) {
  if (userId === undefined || userId === '' || args.year === undefined) {
    throw new Error('Empty code');
  }
  try {
    await prisma.updateUser({
      where: {
        id: userId
      },
      data: {
        year: args.year
      }
    });
  } catch(e) {
    return false;
  }
  return true;
}

async function setPlan(parent, args, context, userId) {
  if (userId === undefined || userId === '' || args.plan === undefined) {
    throw new Error('Empty code');
  }
  try {
    await prisma.updateUser({
      where: {
        id: userId
      },
      data: {
        plan: args.plan
      }
    });
  } catch(e) {
    return false;
  }
  return true;
}

async function readUserNotification(parent, args, context, userId) {
  if (userId === undefined || userId === '' || args.id === undefined) {
    throw new Error('Empty code');
  }
  try {
    await prisma.updateUserMessages({
      where: {
        id: args.id
      },
      data: {
        seen: true
      }
    });
  } catch (e) {
    return false;
  }
  return true;
}

async function deleteUserNotification(parent, args, context, userId) {
  if (userId === undefined || userId === '' || args.id === undefined) {
    throw new Error('Empty code');
  }
  try {
    await prisma.deleteUserMessages({ id: args.id });
  } catch (e) {
    return false;
  }
  return true;
}


async function changeMakerStatus(parent, args, context, userId) {
  const admin = await prisma.user({id: userId});
  if ((admin === undefined || admin === null) || admin.privilege === 0) {
    throw new Error('Invalid User');
  }
  const data = JSON.parse(args.data);
  const now = new Date(Date.now());
  try {
    const mess = await prisma.createProjectMessages({
      date: now.toISOString(),
      author: data.author,
      message: data.message
    });
    const maker = await prisma.updateMaker({
      where: {
        id: data.id
      },
      data: {
        status: data.status,
        xp: data.xp,
        messages: {
          connect: {id: mess.id}
        }
      }
    });
    maker.co_workers.map(async (co_worker) => {
      try {
        const user_mess = await prisma.createUserMessages({
          seen: false,
          date: now.toISOString(),
          author: data.author,
          message: `Updated status on "${maker.title}"`
        });
        await prisma.updateUser({
          where: {
            email: co_worker
          },
          data: {
            notifications: {
              connect: {id: user_mess.id}
            }
          }
        })
      } catch (e) {}
    });
  } catch (e) {
    return false
  }
  return true;
}

async function changeSharingStatus(parent, args, context, userId) {
  const admin = await prisma.user({id: userId});
  if ((admin === undefined || admin === null) || admin.privilege === 0) {
    throw new Error('Invalid User');
  }
  try {
    const data = JSON.parse(args.data);
    const zeroDate = new Date(0);
    const now = new Date(Date.now());
    const mess = await prisma.createProjectMessages({
      date: now.toISOString(),
      author: data.author,
      message: data.message
    });
    const xp_present = [4, 10, 15];
    const xp_absent = [-6, -15, -20];
    let xp = (data.status !== STATUS.ABSENT) ? xp_present[data.type] : xp_absent[data.type];
    const sharing = await prisma.updateSharing({
      where: {
        id: data.id
      },
      data: {
        status: data.status,
        xp: xp,
        type: data.type,
        date: data.date !== '' ? data.date : zeroDate.toISOString(),
        messages: {
          connect: { id: mess.id }
        }
      }
    });
    sharing.co_workers.map(async (co_worker) => {
      try {
        const user_mess = await prisma.createUserMessages({
          seen: false,
          date: now.toISOString(),
          author: data.author,
          message: `Updated status on "${sharing.title}"`
        });
        await prisma.updateUser({
          where: {
            email: co_worker
          },
          data: {
            notifications: {
              connect: {id: user_mess.id}
            }
          }
        })
      } catch (e) {}
    });
  } catch (e) {
    return false
  }
  return true;
}

async function changeExperienceProjectStatus(parent, args, context, userId) {
  const admin = await prisma.user({id: userId});
  if ((admin === undefined || admin === null) || admin.privilege === 0) {
    throw new Error('Invalid User');
  }
  try {
    const data = JSON.parse(args.data);
    const now = new Date(Date.now());
    const mess = await prisma.createProjectMessages({
      date: now.toISOString(),
      author: data.author,
      message: data.message
    });
    const experienceProject = await prisma.updateExperienceProject({
      where: {
        id: data.id
      },
      data: {
        status: data.status,
        messages: {
          connect: { id: mess.id }
        }
      }
    });
    const user_mess = await prisma.createUserMessages({
      seen: false,
      date: now.toISOString(),
      author: data.author,
      message: `Updated status on "${experienceProject.title}"`
    });
    await prisma.updateUser({
      where: {
        email: experienceProject.user
      },
      data: {
        notifications: {
          connect: {id: user_mess.id}
        }
      }
    });
  } catch (e) {
    return false
  }
  return true;
}

async function deleteMaker(parent, args, context, userId) {
  const admin = await prisma.user({id: userId});
  if ((admin === undefined || admin === null) || admin.privilege === 0) {
    throw new Error('Invalid User');
  }
  try {
    const messagesIds = await prisma.$graphql(`
      mutation {
        deleteMaker(where: {id: "${args.id}"}) {
          messages {
            id
          }
        }
      }
    `);
    await prisma.deleteManyProjectMessageses({id_in: messagesIds.deleteMaker.messages.map((e) => e['id'])});
  } catch (e) {
    return false;
  }
  return true;
}

async function deleteSharing(parent, args, context, userId) {
  const admin = await prisma.user({id: userId});
  if ((admin === undefined || admin === null) || admin.privilege === 0) {
    throw new Error('Invalid User');
  }
  try {
    const messagesIds = await prisma.$graphql(`
      mutation {
        deleteSharing(where: {id: "${args.id}"}) {
          messages {
            id
          }
        }
      }
    `);
    await prisma.deleteManyProjectMessageses({id_in: messagesIds.deleteSharing.messages.map((e) => e['id'])});
  } catch (e) {
    return false;
  }
  return true;
}

async function deleteExperienceProject(parent, args, context, userId) {
  const admin = await prisma.user({id: userId});
  if ((admin === undefined || admin === null) || admin.privilege === 0) {
    throw new Error('Invalid User');
  }
  try {
    const messagesIds = await prisma.$graphql(`
      mutation {
        deleteExperienceProject(where: {id: "${args.id}"}) {
          messages {
            id
          }
        }
      }
    `);
    await prisma.deleteManyProjectMessageses({id_in: messagesIds.deleteExperienceProject.messages.map((e) => e['id'])});
  } catch (e) {
    return false;
  }
  return true;
}

export const Mutation = {
  refresh: handleErrors_login(refresh),

  submitMaker: handleErrors_login(submitMaker),
  submitSharing: handleErrors_login(submitSharing),
  submitExperienceProject: handleErrors_login(submitExperienceProject),
  setYear: handleErrors_login(setYear),
  setPlan: handleErrors_login(setPlan),

  readUserNotification: handleErrors_login(readUserNotification),
  deleteUserNotification: handleErrors_login(deleteUserNotification),

  changeMakerStatus: handleErrors_login(changeMakerStatus),
  changeSharingStatus: handleErrors_login(changeSharingStatus),
  changeExperienceProjectStatus: handleErrors_login(changeExperienceProjectStatus),

  deleteMaker: handleErrors_login(deleteMaker),
  deleteSharing: handleErrors_login(deleteSharing),
  deleteExperienceProject: handleErrors_login(deleteExperienceProject),
};