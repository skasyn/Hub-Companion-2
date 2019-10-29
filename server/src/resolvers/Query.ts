import { prismaObjectType } from 'nexus-prisma';
import {idArg, stringArg} from 'nexus';
const axios = require("axios").default;
const querystring = require("querystring");

require('dotenv').config();

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
  ).catch((error) => {console.log(error); });
  let user_data = await axios.get(
    "https://graph.microsoft.com/v1.0/me",
    {headers: {Authorization: token.data.token_type + " " + token.data.access_token}}
  ).catch((error) => {console.log(error); });
  let user_found = await context.db.user({
    outlookId: user_data.data.id
  });
  if (user_found === null) {
    user_found = await context.db.createUser({
      outlookId: user_data.data.id,
      name: user_data.data.displayName,
      email: user_data.data.mail,
    });
    //TODO Refresh database on new user??
  }
  return user_found;
}

async function loginCookie(parent, args, context) {
  if (args.code === undefined || args.code === '') {
    throw new Error('Empty code');
  }
  return context.db.user({
    id: args.code
  });
}

async function getXp(parent, args, context) {
  if (args.code === undefined || args.code === '') {
    throw new Error('Empty code');
  }
  let activities = await context.db.user({
    id: args.code
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

export const Query = prismaObjectType({
  name: 'Query',
  definition(t) {
    t.prismaFields(['user', 'users', 'userPresences', 'activities']);
    t.field('login', {
      type: 'User',
      args: { code: stringArg() },
      resolve: login,
    });
    t.field('loginCookie', {
      type: 'User',
      args: { code: stringArg() },
      resolve: loginCookie,
    });
    t.field('getXp', {
      type: 'Int',
      args: { code: stringArg() },
      resolve: getXp,
    });
  },
});