import {prisma} from "../generated/prisma-client";

const jwt = require('jsonwebtoken');
require('dotenv').config();

export function handleErrors(fn) {
  return async function(parent, args, context) {
    try {
      return await fn(parent, args, context);
    } catch (e) {
      console.error(e.message);
    }
  }
}

export function handleErrors_login(fn) {
  return async function(parent, args, context) {
    try {
      const payload = await jwt.verify(
        args.code,
        process.env.JWT_SECRET
      );
      const userId = payload.id;
      if (userId === undefined || userId === '') {
        throw new Error('Empty code');
      }
      return await fn(parent, args, context, userId);
    } catch (e) {
      console.error(e.message);
    }
  }
}

export function generateJwt(user) {
  const token = jwt.sign(user, process.env.JWT_SECRET, {
    expiresIn: 2 * 60 * 60 * 1000,
    subject: user.id.toString(),
  });
  jwt.verify(token, process.env.JWT_SECRET, (err, data) => {
    if (err !== null)
      console.error(err);
  });
  return token;
}

export async function getUser(userId) {
  const user = await prisma.user({id: userId});
  if (user === undefined || user === null) {
    throw new Error('Invalid user');
  }
  return user;
}