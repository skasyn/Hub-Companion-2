import {handleErrors_login} from "./utils";
import {getActivities} from "./refresh";
import {prisma} from "../generated/prisma-client";

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
        status: 0
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
        status: 0
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
        description: data.description,
        competencies: data.competencies,
        informations: data.informations,
        status: 0
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

export const Mutation = {
  refresh: handleErrors_login(refresh),
  submitMaker: handleErrors_login(submitMaker),
  submitSharing: handleErrors_login(submitSharing),
  submitExperienceProject: handleErrors_login(submitExperienceProject),
  setYear: handleErrors_login(setYear),
  setPlan: handleErrors_login(setPlan),
};