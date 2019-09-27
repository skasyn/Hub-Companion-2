// import { GraphQLServer } from 'graphql-yoga';
// import { prisma } from './generated/prisma-client';
// import { resolvers } from './resolvers';

import { prisma, Prisma } from './generated/prisma-client'
import datamodelInfo from './generated/nexus-prisma'
import * as path from 'path'
import { makePrismaSchema } from 'nexus-prisma'
import { GraphQLServer } from 'graphql-yoga'
import { Query } from './resolvers/Query';

const schema = makePrismaSchema({
  types: [Query],
  prisma: {
    datamodelInfo,
    client: new Prisma({
      endpoint: 'http://localhost:4466',
      // To change to http://prisma:4466 when dockerized
    }),
  },

  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
});

const server = new GraphQLServer({
  typeDefs: './src/schema.graphql',
  schema,
  context: req => ({
    ...req,
    db: new Prisma({
      endpoint: 'http://localhost:4466',
    }),
  }),
} as any);

server.start(() => console.log('Server is running on http://localhost:4000'));
