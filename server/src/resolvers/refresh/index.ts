import {prisma} from "../../generated/prisma-client";
const axios = require("axios").default;

function isEmpty(obj) {
  return !obj || Object.keys(obj).length === 0;
}

function getDescription(event, activity): String {
  if (event.description !== null && event.description !== "")
    return event.description;
  else if (activity.description !== null && activity.description !== "")
    return activity.description;
  else
    return activity.title;
}

async function activityUpsert(event, activity, studentList, hubModule) {
  let title = activity.title || event.title;
  let description = getDescription(event, activity).toString();
  let beginString = event.begin || event.end;
  let endString = event.end || event.begin;
  const now = new Date(Date.now());
  let begin = new Date(beginString);
  let end = new Date(endString);
  let type = activity.type_title;
  let xp = (() => {
    switch (type) {
      case "Hackathon": return 6;
      case "Workshop": return 3;
      case "Talk": return 1;
    }
  })();

  beginString = begin.toISOString();
  endString = end.toISOString();
  let createdActivity = await prisma.upsertActivity({
    where: {
      code: event.code
    },
    create: {
      code: event.code,
      type: activity.type_title,
      xp: xp,
      title: title,
      description: description,
      begin: beginString,
      end: endString
    },
    update: {
      code: event.code,
      type: activity.type_title,
      xp: xp,
      title: title,
      description: description,
      begin: beginString,
      end: endString
    }
  });
  await prisma.deleteManyUserPresences({
    code_ends_with: event.code
  });
  for (let student of studentList) {
    let user_found = await prisma.user({
      email: student.email
    });
    let isPresent = (student.present === 'present' || student.present == 'N/A');
    if (!isPresent && end > now)
      xp = 0;
    if (user_found === null) {
      user_found = await prisma.createUser({
        name: student.name,
        email: student.email,
      });
    }
    if (user_found !== null) {
      await prisma.upsertUserPresence({
        where: {
          code: user_found.email + '-' + event.code
        },
        create: {
          code: user_found.email + '-' + event.code,
          user: {
            connect: { email: user_found.email }
          },
          activity: {
            connect: { code: createdActivity.code }
          },
          presence: isPresent,
          xp: isPresent ? xp : -xp,
        },
        update: {
          presence: isPresent,
          xp: isPresent ? xp : -xp,
        }
      })
    }
  }
}

async function getEvents(year, hubModule, city, event, activity) {
  try {
    const responseEvent = await axios.get(`${process.env.URLAUTO}module/${year}/${hubModule}/${city}-0-1/${activity.codeacti}/${event.code}/registered?format=json`).catch((e) => {console.error(e);});
    if (responseEvent.data !== undefined && responseEvent.data !== null && !isEmpty(responseEvent.data)) {
      let studentList = [];
      for (let student of responseEvent.data) {
        studentList.push({name: student.title, email: student.login, present: student.present});
      }
      await activityUpsert(event, activity, studentList, hubModule);
    }
  } catch (error) {
    console.error(error);
  }
}

export async function getActivities(year, hubModule, city) {
  try {
    console.log(new Date().toISOString() + ': Refresh started');
    const responseActivities = await axios.get(`${process.env.URLAUTO}module/${year}/${hubModule}/${city}-0-1?format=json`);
    if (responseActivities === undefined)
      return;
    await Promise.all(responseActivities.data.activites.map(async (activity) => {
      if (activity.events !== undefined && activity.events.length !== 0) {
        for (let event of activity.events) {
          await getEvents(year, hubModule, city, event, activity);
        }
      }
    }));
    console.log(new Date().toISOString() + ': Refresh finished');
  } catch(error) {
    console.error(error);
  }
}