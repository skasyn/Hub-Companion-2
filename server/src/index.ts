import { prisma } from './generated/prisma-client'
import datamodelInfo from './generated/nexus-prisma'
import * as path from 'path'
import { stringArg, idArg } from 'nexus'
import { prismaObjectType, makePrismaSchema } from 'nexus-prisma'
import { GraphQLServer } from 'graphql-yoga'

const Query = prismaObjectType({
  name: 'Query',
  definition(t) {
    t.prismaFields(['user']);
    // t.list.field('feed', {
    //   type: 'User',
    //   resolve: (_, args, ctx) =>
    //     ctx.prisma.users({ where: { name: "eude" } }),
    // })
    t.list.field('UserbyEmail', {
      type: 'User',
      args: { email: stringArg() },
      resolve: (_, { email }, ctx) =>
        ctx.prisma.users({ where: { email: email } }),
    });
  },
});

const Mutation = prismaObjectType({
  name: 'Mutation',
  definition(t) {
    t.prismaFields(['createUser', 'deleteActivity'])
    t.field('createDraft', {
      type: 'User',
      args: {
        name: stringArg(),
        id: idArg({ nullable: true }),
      },
      resolve: (_, { name, id }, ctx) =>
        ctx.prisma.createUser({
            data: {
                name: name,
                email: name + "@example.com",
                token: "abon",
                activities: { connect: { id: id }}
            }
        })
        // ctx.prisma.createUser({
        //     name
        //   name: name,
        //   author: { connect: { id: authorId } },
        // }),
    })
    // t.field('publish', {
    //   type: 'Post',
    //   nullable: true,
    //   args: { id: idArg() },
    //   resolve: (_, { id }, ctx) =>
    //     ctx.prisma.updatePost({
    //       where: { id },
    //       data: { published: true },
    //     }),
    // })
  },
})

const schema = makePrismaSchema({
  types: [Query, Mutation],

  prisma: {
    datamodelInfo,
    client: prisma,
  },

  outputs: {
    schema: path.join(__dirname, './generated/schema.graphql'),
    typegen: path.join(__dirname, './generated/nexus.ts'),
  },
})

const server = new GraphQLServer({
  schema,
  context: { prisma },
})
server.start(() => console.log('Server is running on http://localhost:4000'))