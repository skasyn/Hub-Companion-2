import { prismaObjectType } from 'nexus-prisma';
import { stringArg } from 'nexus';
const axios = require("axios").default;
const querystring = require("querystring");
import datamodelInfo from '../generated/nexus-prisma'

require('dotenv').config();

async function login(parent, args, context) {
  let token = await axios.post("https://login.microsoftonline.com/common/oauth2/v2.0/token",
  querystring.stringify({
    "client_id": "9d7c5742-6f63-4f05-b10c-f5b0c1506582",
    "scope": "https://graph.microsoft.com/User.Read",
    "redirect_uri": "http://localhost:3000",
    "grant_type": "authorization_code",
    "client_secret": process.env.AZURESECRET,
    "code": args.code
  }), {'Content-Type': "application/x-www-form-urlencoded"});
  let user_data = await axios.get("https://graph.microsoft.com/v1.0/me", {headers: {Authorization: token.data.token_type + " " + token.data.access_token}});
  let user_found = await context.db.user({
    outlookid: user_data.data.id
  });
  if (user_found === null) {
    user_found = await context.db.createUser({
      outlookid: user_data.data.id,
      name: user_data.data.displayName,
      email: user_data.data.mail,
    })
  }
  return user_found
};

export const Query = prismaObjectType({
  name: 'Query',
  definition(t) {
    t.prismaFields(['user', 'users']);
    t.field('login', {
      type: 'User',
      args: { code: stringArg() },
      resolve: login,
    });
  },
});

// export const Query = {
//   userbyemail
// };

// module.exports = {
//   Query,
// }