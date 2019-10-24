import { Prisma } from './generated/prisma-client'
import datamodelInfo from './generated/nexus-prisma'
import * as path from 'path'
import { makePrismaSchema } from 'nexus-prisma'
import { GraphQLServer } from 'graphql-yoga'
import { Query } from './resolvers/Query';
import {Mutation} from "./resolvers/Mutation";

const schema = makePrismaSchema({
  types: [Query, Mutation],
  prisma: {
    datamodelInfo,
    client: new Prisma({
      endpoint: 'http://prisma:4466',
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
      endpoint: 'http://prisma:4466',
    }),
  }),
} as any);

server.start(() => console.log('Server is running on http://localhost:4000'));
