// Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

export const typeDefs = /* GraphQL */ `type Activity {
  id: ID!
  code: String!
  type: String!
  xp: Int
  title: String!
  description: String
  date: DateTime
  registered(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User!]
}

type ActivityConnection {
  pageInfo: PageInfo!
  edges: [ActivityEdge]!
  aggregate: AggregateActivity!
}

input ActivityCreateInput {
  id: ID
  code: String!
  type: String!
  xp: Int
  title: String!
  description: String
  date: DateTime
  registered: UserCreateManyWithoutActivitiesInput
}

input ActivityCreateManyWithoutRegisteredInput {
  create: [ActivityCreateWithoutRegisteredInput!]
  connect: [ActivityWhereUniqueInput!]
}

input ActivityCreateWithoutRegisteredInput {
  id: ID
  code: String!
  type: String!
  xp: Int
  title: String!
  description: String
  date: DateTime
}

type ActivityEdge {
  node: Activity!
  cursor: String!
}

enum ActivityOrderByInput {
  id_ASC
  id_DESC
  code_ASC
  code_DESC
  type_ASC
  type_DESC
  xp_ASC
  xp_DESC
  title_ASC
  title_DESC
  description_ASC
  description_DESC
  date_ASC
  date_DESC
}

type ActivityPreviousValues {
  id: ID!
  code: String!
  type: String!
  xp: Int
  title: String!
  description: String
  date: DateTime
}

input ActivityScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  code: String
  code_not: String
  code_in: [String!]
  code_not_in: [String!]
  code_lt: String
  code_lte: String
  code_gt: String
  code_gte: String
  code_contains: String
  code_not_contains: String
  code_starts_with: String
  code_not_starts_with: String
  code_ends_with: String
  code_not_ends_with: String
  type: String
  type_not: String
  type_in: [String!]
  type_not_in: [String!]
  type_lt: String
  type_lte: String
  type_gt: String
  type_gte: String
  type_contains: String
  type_not_contains: String
  type_starts_with: String
  type_not_starts_with: String
  type_ends_with: String
  type_not_ends_with: String
  xp: Int
  xp_not: Int
  xp_in: [Int!]
  xp_not_in: [Int!]
  xp_lt: Int
  xp_lte: Int
  xp_gt: Int
  xp_gte: Int
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  date: DateTime
  date_not: DateTime
  date_in: [DateTime!]
  date_not_in: [DateTime!]
  date_lt: DateTime
  date_lte: DateTime
  date_gt: DateTime
  date_gte: DateTime
  AND: [ActivityScalarWhereInput!]
  OR: [ActivityScalarWhereInput!]
  NOT: [ActivityScalarWhereInput!]
}

type ActivitySubscriptionPayload {
  mutation: MutationType!
  node: Activity
  updatedFields: [String!]
  previousValues: ActivityPreviousValues
}

input ActivitySubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: ActivityWhereInput
  AND: [ActivitySubscriptionWhereInput!]
}

input ActivityUpdateInput {
  code: String
  type: String
  xp: Int
  title: String
  description: String
  date: DateTime
  registered: UserUpdateManyWithoutActivitiesInput
}

input ActivityUpdateManyDataInput {
  code: String
  type: String
  xp: Int
  title: String
  description: String
  date: DateTime
}

input ActivityUpdateManyMutationInput {
  code: String
  type: String
  xp: Int
  title: String
  description: String
  date: DateTime
}

input ActivityUpdateManyWithoutRegisteredInput {
  create: [ActivityCreateWithoutRegisteredInput!]
  delete: [ActivityWhereUniqueInput!]
  connect: [ActivityWhereUniqueInput!]
  set: [ActivityWhereUniqueInput!]
  disconnect: [ActivityWhereUniqueInput!]
  update: [ActivityUpdateWithWhereUniqueWithoutRegisteredInput!]
  upsert: [ActivityUpsertWithWhereUniqueWithoutRegisteredInput!]
  deleteMany: [ActivityScalarWhereInput!]
  updateMany: [ActivityUpdateManyWithWhereNestedInput!]
}

input ActivityUpdateManyWithWhereNestedInput {
  where: ActivityScalarWhereInput!
  data: ActivityUpdateManyDataInput!
}

input ActivityUpdateWithoutRegisteredDataInput {
  code: String
  type: String
  xp: Int
  title: String
  description: String
  date: DateTime
}

input ActivityUpdateWithWhereUniqueWithoutRegisteredInput {
  where: ActivityWhereUniqueInput!
  data: ActivityUpdateWithoutRegisteredDataInput!
}

input ActivityUpsertWithWhereUniqueWithoutRegisteredInput {
  where: ActivityWhereUniqueInput!
  update: ActivityUpdateWithoutRegisteredDataInput!
  create: ActivityCreateWithoutRegisteredInput!
}

input ActivityWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  code: String
  code_not: String
  code_in: [String!]
  code_not_in: [String!]
  code_lt: String
  code_lte: String
  code_gt: String
  code_gte: String
  code_contains: String
  code_not_contains: String
  code_starts_with: String
  code_not_starts_with: String
  code_ends_with: String
  code_not_ends_with: String
  type: String
  type_not: String
  type_in: [String!]
  type_not_in: [String!]
  type_lt: String
  type_lte: String
  type_gt: String
  type_gte: String
  type_contains: String
  type_not_contains: String
  type_starts_with: String
  type_not_starts_with: String
  type_ends_with: String
  type_not_ends_with: String
  xp: Int
  xp_not: Int
  xp_in: [Int!]
  xp_not_in: [Int!]
  xp_lt: Int
  xp_lte: Int
  xp_gt: Int
  xp_gte: Int
  title: String
  title_not: String
  title_in: [String!]
  title_not_in: [String!]
  title_lt: String
  title_lte: String
  title_gt: String
  title_gte: String
  title_contains: String
  title_not_contains: String
  title_starts_with: String
  title_not_starts_with: String
  title_ends_with: String
  title_not_ends_with: String
  description: String
  description_not: String
  description_in: [String!]
  description_not_in: [String!]
  description_lt: String
  description_lte: String
  description_gt: String
  description_gte: String
  description_contains: String
  description_not_contains: String
  description_starts_with: String
  description_not_starts_with: String
  description_ends_with: String
  description_not_ends_with: String
  date: DateTime
  date_not: DateTime
  date_in: [DateTime!]
  date_not_in: [DateTime!]
  date_lt: DateTime
  date_lte: DateTime
  date_gt: DateTime
  date_gte: DateTime
  registered_some: UserWhereInput
  AND: [ActivityWhereInput!]
}

input ActivityWhereUniqueInput {
  id: ID
  code: String
}

type AggregateActivity {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type BatchPayload {
  count: Long!
}

scalar DateTime

scalar Long

type Mutation {
  createActivity(data: ActivityCreateInput!): Activity!
  updateActivity(data: ActivityUpdateInput!, where: ActivityWhereUniqueInput!): Activity
  updateManyActivities(data: ActivityUpdateManyMutationInput!, where: ActivityWhereInput): BatchPayload!
  upsertActivity(where: ActivityWhereUniqueInput!, create: ActivityCreateInput!, update: ActivityUpdateInput!): Activity!
  deleteActivity(where: ActivityWhereUniqueInput!): Activity
  deleteManyActivities(where: ActivityWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
}

enum MutationType {
  CREATED
  UPDATED
  DELETED
}

interface Node {
  id: ID!
}

type PageInfo {
  hasNextPage: Boolean!
  hasPreviousPage: Boolean!
  startCursor: String
  endCursor: String
}

type Query {
  activity(where: ActivityWhereUniqueInput!): Activity
  activities(where: ActivityWhereInput, orderBy: ActivityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Activity]!
  activitiesConnection(where: ActivityWhereInput, orderBy: ActivityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): ActivityConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  node(id: ID!): Node
}

type Subscription {
  activity(where: ActivitySubscriptionWhereInput): ActivitySubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
}

type User {
  id: ID!
  outlookId: String!
  name: String!
  email: String!
  year: Int
  plan: Int
  xp: Int
  privilege: Int
  activities(where: ActivityWhereInput, orderBy: ActivityOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Activity!]
}

type UserConnection {
  pageInfo: PageInfo!
  edges: [UserEdge]!
  aggregate: AggregateUser!
}

input UserCreateInput {
  id: ID
  outlookId: String!
  name: String!
  email: String!
  year: Int
  plan: Int
  xp: Int
  privilege: Int
  activities: ActivityCreateManyWithoutRegisteredInput
}

input UserCreateManyWithoutActivitiesInput {
  create: [UserCreateWithoutActivitiesInput!]
  connect: [UserWhereUniqueInput!]
}

input UserCreateWithoutActivitiesInput {
  id: ID
  outlookId: String!
  name: String!
  email: String!
  year: Int
  plan: Int
  xp: Int
  privilege: Int
}

type UserEdge {
  node: User!
  cursor: String!
}

enum UserOrderByInput {
  id_ASC
  id_DESC
  outlookId_ASC
  outlookId_DESC
  name_ASC
  name_DESC
  email_ASC
  email_DESC
  year_ASC
  year_DESC
  plan_ASC
  plan_DESC
  xp_ASC
  xp_DESC
  privilege_ASC
  privilege_DESC
}

type UserPreviousValues {
  id: ID!
  outlookId: String!
  name: String!
  email: String!
  year: Int
  plan: Int
  xp: Int
  privilege: Int
}

input UserScalarWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  outlookId: String
  outlookId_not: String
  outlookId_in: [String!]
  outlookId_not_in: [String!]
  outlookId_lt: String
  outlookId_lte: String
  outlookId_gt: String
  outlookId_gte: String
  outlookId_contains: String
  outlookId_not_contains: String
  outlookId_starts_with: String
  outlookId_not_starts_with: String
  outlookId_ends_with: String
  outlookId_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  year: Int
  year_not: Int
  year_in: [Int!]
  year_not_in: [Int!]
  year_lt: Int
  year_lte: Int
  year_gt: Int
  year_gte: Int
  plan: Int
  plan_not: Int
  plan_in: [Int!]
  plan_not_in: [Int!]
  plan_lt: Int
  plan_lte: Int
  plan_gt: Int
  plan_gte: Int
  xp: Int
  xp_not: Int
  xp_in: [Int!]
  xp_not_in: [Int!]
  xp_lt: Int
  xp_lte: Int
  xp_gt: Int
  xp_gte: Int
  privilege: Int
  privilege_not: Int
  privilege_in: [Int!]
  privilege_not_in: [Int!]
  privilege_lt: Int
  privilege_lte: Int
  privilege_gt: Int
  privilege_gte: Int
  AND: [UserScalarWhereInput!]
  OR: [UserScalarWhereInput!]
  NOT: [UserScalarWhereInput!]
}

type UserSubscriptionPayload {
  mutation: MutationType!
  node: User
  updatedFields: [String!]
  previousValues: UserPreviousValues
}

input UserSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserWhereInput
  AND: [UserSubscriptionWhereInput!]
}

input UserUpdateInput {
  outlookId: String
  name: String
  email: String
  year: Int
  plan: Int
  xp: Int
  privilege: Int
  activities: ActivityUpdateManyWithoutRegisteredInput
}

input UserUpdateManyDataInput {
  outlookId: String
  name: String
  email: String
  year: Int
  plan: Int
  xp: Int
  privilege: Int
}

input UserUpdateManyMutationInput {
  outlookId: String
  name: String
  email: String
  year: Int
  plan: Int
  xp: Int
  privilege: Int
}

input UserUpdateManyWithoutActivitiesInput {
  create: [UserCreateWithoutActivitiesInput!]
  delete: [UserWhereUniqueInput!]
  connect: [UserWhereUniqueInput!]
  set: [UserWhereUniqueInput!]
  disconnect: [UserWhereUniqueInput!]
  update: [UserUpdateWithWhereUniqueWithoutActivitiesInput!]
  upsert: [UserUpsertWithWhereUniqueWithoutActivitiesInput!]
  deleteMany: [UserScalarWhereInput!]
  updateMany: [UserUpdateManyWithWhereNestedInput!]
}

input UserUpdateManyWithWhereNestedInput {
  where: UserScalarWhereInput!
  data: UserUpdateManyDataInput!
}

input UserUpdateWithoutActivitiesDataInput {
  outlookId: String
  name: String
  email: String
  year: Int
  plan: Int
  xp: Int
  privilege: Int
}

input UserUpdateWithWhereUniqueWithoutActivitiesInput {
  where: UserWhereUniqueInput!
  data: UserUpdateWithoutActivitiesDataInput!
}

input UserUpsertWithWhereUniqueWithoutActivitiesInput {
  where: UserWhereUniqueInput!
  update: UserUpdateWithoutActivitiesDataInput!
  create: UserCreateWithoutActivitiesInput!
}

input UserWhereInput {
  id: ID
  id_not: ID
  id_in: [ID!]
  id_not_in: [ID!]
  id_lt: ID
  id_lte: ID
  id_gt: ID
  id_gte: ID
  id_contains: ID
  id_not_contains: ID
  id_starts_with: ID
  id_not_starts_with: ID
  id_ends_with: ID
  id_not_ends_with: ID
  outlookId: String
  outlookId_not: String
  outlookId_in: [String!]
  outlookId_not_in: [String!]
  outlookId_lt: String
  outlookId_lte: String
  outlookId_gt: String
  outlookId_gte: String
  outlookId_contains: String
  outlookId_not_contains: String
  outlookId_starts_with: String
  outlookId_not_starts_with: String
  outlookId_ends_with: String
  outlookId_not_ends_with: String
  name: String
  name_not: String
  name_in: [String!]
  name_not_in: [String!]
  name_lt: String
  name_lte: String
  name_gt: String
  name_gte: String
  name_contains: String
  name_not_contains: String
  name_starts_with: String
  name_not_starts_with: String
  name_ends_with: String
  name_not_ends_with: String
  email: String
  email_not: String
  email_in: [String!]
  email_not_in: [String!]
  email_lt: String
  email_lte: String
  email_gt: String
  email_gte: String
  email_contains: String
  email_not_contains: String
  email_starts_with: String
  email_not_starts_with: String
  email_ends_with: String
  email_not_ends_with: String
  year: Int
  year_not: Int
  year_in: [Int!]
  year_not_in: [Int!]
  year_lt: Int
  year_lte: Int
  year_gt: Int
  year_gte: Int
  plan: Int
  plan_not: Int
  plan_in: [Int!]
  plan_not_in: [Int!]
  plan_lt: Int
  plan_lte: Int
  plan_gt: Int
  plan_gte: Int
  xp: Int
  xp_not: Int
  xp_in: [Int!]
  xp_not_in: [Int!]
  xp_lt: Int
  xp_lte: Int
  xp_gt: Int
  xp_gte: Int
  privilege: Int
  privilege_not: Int
  privilege_in: [Int!]
  privilege_not_in: [Int!]
  privilege_lt: Int
  privilege_lte: Int
  privilege_gt: Int
  privilege_gte: Int
  activities_some: ActivityWhereInput
  AND: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  outlookId: String
  email: String
}
`