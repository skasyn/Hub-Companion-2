// Code generated by Prisma (prisma@1.34.10). DO NOT EDIT.
  // Please don't change this file manually but run `prisma generate` to update it.
  // For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

export const typeDefs = /* GraphQL */ `type Activity {
  id: ID!
  code: String!
  type: String!
  xp: Int
  title: String!
  description: String!
  begin: DateTime!
  end: DateTime!
  registered(where: UserPresenceWhereInput, orderBy: UserPresenceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UserPresence!]
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
  description: String!
  begin: DateTime!
  end: DateTime!
  registered: UserPresenceCreateManyWithoutActivityInput
}

input ActivityCreateOneWithoutRegisteredInput {
  create: ActivityCreateWithoutRegisteredInput
  connect: ActivityWhereUniqueInput
}

input ActivityCreateWithoutRegisteredInput {
  id: ID
  code: String!
  type: String!
  xp: Int
  title: String!
  description: String!
  begin: DateTime!
  end: DateTime!
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
  begin_ASC
  begin_DESC
  end_ASC
  end_DESC
}

type ActivityPreviousValues {
  id: ID!
  code: String!
  type: String!
  xp: Int
  title: String!
  description: String!
  begin: DateTime!
  end: DateTime!
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
  begin: DateTime
  end: DateTime
  registered: UserPresenceUpdateManyWithoutActivityInput
}

input ActivityUpdateManyMutationInput {
  code: String
  type: String
  xp: Int
  title: String
  description: String
  begin: DateTime
  end: DateTime
}

input ActivityUpdateOneRequiredWithoutRegisteredInput {
  create: ActivityCreateWithoutRegisteredInput
  update: ActivityUpdateWithoutRegisteredDataInput
  upsert: ActivityUpsertWithoutRegisteredInput
  connect: ActivityWhereUniqueInput
}

input ActivityUpdateWithoutRegisteredDataInput {
  code: String
  type: String
  xp: Int
  title: String
  description: String
  begin: DateTime
  end: DateTime
}

input ActivityUpsertWithoutRegisteredInput {
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
  begin: DateTime
  begin_not: DateTime
  begin_in: [DateTime!]
  begin_not_in: [DateTime!]
  begin_lt: DateTime
  begin_lte: DateTime
  begin_gt: DateTime
  begin_gte: DateTime
  end: DateTime
  end_not: DateTime
  end_in: [DateTime!]
  end_not_in: [DateTime!]
  end_lt: DateTime
  end_lte: DateTime
  end_gt: DateTime
  end_gte: DateTime
  registered_some: UserPresenceWhereInput
  AND: [ActivityWhereInput!]
}

input ActivityWhereUniqueInput {
  id: ID
  code: String
}

type AggregateActivity {
  count: Int!
}

type AggregateDatabaseRefresh {
  count: Int!
}

type AggregateMaker {
  count: Int!
}

type AggregateSharing {
  count: Int!
}

type AggregateUser {
  count: Int!
}

type AggregateUserPresence {
  count: Int!
}

type BatchPayload {
  count: Long!
}

type DatabaseRefresh {
  id: ID!
  date: DateTime!
}

type DatabaseRefreshConnection {
  pageInfo: PageInfo!
  edges: [DatabaseRefreshEdge]!
  aggregate: AggregateDatabaseRefresh!
}

input DatabaseRefreshCreateInput {
  id: ID
  date: DateTime!
}

type DatabaseRefreshEdge {
  node: DatabaseRefresh!
  cursor: String!
}

enum DatabaseRefreshOrderByInput {
  id_ASC
  id_DESC
  date_ASC
  date_DESC
}

type DatabaseRefreshPreviousValues {
  id: ID!
  date: DateTime!
}

type DatabaseRefreshSubscriptionPayload {
  mutation: MutationType!
  node: DatabaseRefresh
  updatedFields: [String!]
  previousValues: DatabaseRefreshPreviousValues
}

input DatabaseRefreshSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: DatabaseRefreshWhereInput
  AND: [DatabaseRefreshSubscriptionWhereInput!]
}

input DatabaseRefreshUpdateInput {
  date: DateTime
}

input DatabaseRefreshUpdateManyMutationInput {
  date: DateTime
}

input DatabaseRefreshWhereInput {
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
  date: DateTime
  date_not: DateTime
  date_in: [DateTime!]
  date_not_in: [DateTime!]
  date_lt: DateTime
  date_lte: DateTime
  date_gt: DateTime
  date_gte: DateTime
  AND: [DatabaseRefreshWhereInput!]
}

input DatabaseRefreshWhereUniqueInput {
  id: ID
}

scalar DateTime

scalar Long

type Maker {
  id: ID!
  title: String!
  co_workers: [String!]!
  description: String!
  functionalities: String!
  technologies: String!
  delivery: String!
  organisation: String!
  resources: String!
  informations: String!
  status: Int!
}

type MakerConnection {
  pageInfo: PageInfo!
  edges: [MakerEdge]!
  aggregate: AggregateMaker!
}

input MakerCreateco_workersInput {
  set: [String!]
}

input MakerCreateInput {
  id: ID
  title: String!
  co_workers: MakerCreateco_workersInput
  description: String!
  functionalities: String!
  technologies: String!
  delivery: String!
  organisation: String!
  resources: String!
  informations: String!
  status: Int!
}

type MakerEdge {
  node: Maker!
  cursor: String!
}

enum MakerOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  description_ASC
  description_DESC
  functionalities_ASC
  functionalities_DESC
  technologies_ASC
  technologies_DESC
  delivery_ASC
  delivery_DESC
  organisation_ASC
  organisation_DESC
  resources_ASC
  resources_DESC
  informations_ASC
  informations_DESC
  status_ASC
  status_DESC
}

type MakerPreviousValues {
  id: ID!
  title: String!
  co_workers: [String!]!
  description: String!
  functionalities: String!
  technologies: String!
  delivery: String!
  organisation: String!
  resources: String!
  informations: String!
  status: Int!
}

type MakerSubscriptionPayload {
  mutation: MutationType!
  node: Maker
  updatedFields: [String!]
  previousValues: MakerPreviousValues
}

input MakerSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: MakerWhereInput
  AND: [MakerSubscriptionWhereInput!]
}

input MakerUpdateco_workersInput {
  set: [String!]
}

input MakerUpdateInput {
  title: String
  co_workers: MakerUpdateco_workersInput
  description: String
  functionalities: String
  technologies: String
  delivery: String
  organisation: String
  resources: String
  informations: String
  status: Int
}

input MakerUpdateManyMutationInput {
  title: String
  co_workers: MakerUpdateco_workersInput
  description: String
  functionalities: String
  technologies: String
  delivery: String
  organisation: String
  resources: String
  informations: String
  status: Int
}

input MakerWhereInput {
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
  functionalities: String
  functionalities_not: String
  functionalities_in: [String!]
  functionalities_not_in: [String!]
  functionalities_lt: String
  functionalities_lte: String
  functionalities_gt: String
  functionalities_gte: String
  functionalities_contains: String
  functionalities_not_contains: String
  functionalities_starts_with: String
  functionalities_not_starts_with: String
  functionalities_ends_with: String
  functionalities_not_ends_with: String
  technologies: String
  technologies_not: String
  technologies_in: [String!]
  technologies_not_in: [String!]
  technologies_lt: String
  technologies_lte: String
  technologies_gt: String
  technologies_gte: String
  technologies_contains: String
  technologies_not_contains: String
  technologies_starts_with: String
  technologies_not_starts_with: String
  technologies_ends_with: String
  technologies_not_ends_with: String
  delivery: String
  delivery_not: String
  delivery_in: [String!]
  delivery_not_in: [String!]
  delivery_lt: String
  delivery_lte: String
  delivery_gt: String
  delivery_gte: String
  delivery_contains: String
  delivery_not_contains: String
  delivery_starts_with: String
  delivery_not_starts_with: String
  delivery_ends_with: String
  delivery_not_ends_with: String
  organisation: String
  organisation_not: String
  organisation_in: [String!]
  organisation_not_in: [String!]
  organisation_lt: String
  organisation_lte: String
  organisation_gt: String
  organisation_gte: String
  organisation_contains: String
  organisation_not_contains: String
  organisation_starts_with: String
  organisation_not_starts_with: String
  organisation_ends_with: String
  organisation_not_ends_with: String
  resources: String
  resources_not: String
  resources_in: [String!]
  resources_not_in: [String!]
  resources_lt: String
  resources_lte: String
  resources_gt: String
  resources_gte: String
  resources_contains: String
  resources_not_contains: String
  resources_starts_with: String
  resources_not_starts_with: String
  resources_ends_with: String
  resources_not_ends_with: String
  informations: String
  informations_not: String
  informations_in: [String!]
  informations_not_in: [String!]
  informations_lt: String
  informations_lte: String
  informations_gt: String
  informations_gte: String
  informations_contains: String
  informations_not_contains: String
  informations_starts_with: String
  informations_not_starts_with: String
  informations_ends_with: String
  informations_not_ends_with: String
  status: Int
  status_not: Int
  status_in: [Int!]
  status_not_in: [Int!]
  status_lt: Int
  status_lte: Int
  status_gt: Int
  status_gte: Int
  AND: [MakerWhereInput!]
}

input MakerWhereUniqueInput {
  id: ID
}

type Mutation {
  createActivity(data: ActivityCreateInput!): Activity!
  updateActivity(data: ActivityUpdateInput!, where: ActivityWhereUniqueInput!): Activity
  updateManyActivities(data: ActivityUpdateManyMutationInput!, where: ActivityWhereInput): BatchPayload!
  upsertActivity(where: ActivityWhereUniqueInput!, create: ActivityCreateInput!, update: ActivityUpdateInput!): Activity!
  deleteActivity(where: ActivityWhereUniqueInput!): Activity
  deleteManyActivities(where: ActivityWhereInput): BatchPayload!
  createDatabaseRefresh(data: DatabaseRefreshCreateInput!): DatabaseRefresh!
  updateDatabaseRefresh(data: DatabaseRefreshUpdateInput!, where: DatabaseRefreshWhereUniqueInput!): DatabaseRefresh
  updateManyDatabaseRefreshes(data: DatabaseRefreshUpdateManyMutationInput!, where: DatabaseRefreshWhereInput): BatchPayload!
  upsertDatabaseRefresh(where: DatabaseRefreshWhereUniqueInput!, create: DatabaseRefreshCreateInput!, update: DatabaseRefreshUpdateInput!): DatabaseRefresh!
  deleteDatabaseRefresh(where: DatabaseRefreshWhereUniqueInput!): DatabaseRefresh
  deleteManyDatabaseRefreshes(where: DatabaseRefreshWhereInput): BatchPayload!
  createMaker(data: MakerCreateInput!): Maker!
  updateMaker(data: MakerUpdateInput!, where: MakerWhereUniqueInput!): Maker
  updateManyMakers(data: MakerUpdateManyMutationInput!, where: MakerWhereInput): BatchPayload!
  upsertMaker(where: MakerWhereUniqueInput!, create: MakerCreateInput!, update: MakerUpdateInput!): Maker!
  deleteMaker(where: MakerWhereUniqueInput!): Maker
  deleteManyMakers(where: MakerWhereInput): BatchPayload!
  createSharing(data: SharingCreateInput!): Sharing!
  updateSharing(data: SharingUpdateInput!, where: SharingWhereUniqueInput!): Sharing
  updateManySharings(data: SharingUpdateManyMutationInput!, where: SharingWhereInput): BatchPayload!
  upsertSharing(where: SharingWhereUniqueInput!, create: SharingCreateInput!, update: SharingUpdateInput!): Sharing!
  deleteSharing(where: SharingWhereUniqueInput!): Sharing
  deleteManySharings(where: SharingWhereInput): BatchPayload!
  createUser(data: UserCreateInput!): User!
  updateUser(data: UserUpdateInput!, where: UserWhereUniqueInput!): User
  updateManyUsers(data: UserUpdateManyMutationInput!, where: UserWhereInput): BatchPayload!
  upsertUser(where: UserWhereUniqueInput!, create: UserCreateInput!, update: UserUpdateInput!): User!
  deleteUser(where: UserWhereUniqueInput!): User
  deleteManyUsers(where: UserWhereInput): BatchPayload!
  createUserPresence(data: UserPresenceCreateInput!): UserPresence!
  updateUserPresence(data: UserPresenceUpdateInput!, where: UserPresenceWhereUniqueInput!): UserPresence
  updateManyUserPresences(data: UserPresenceUpdateManyMutationInput!, where: UserPresenceWhereInput): BatchPayload!
  upsertUserPresence(where: UserPresenceWhereUniqueInput!, create: UserPresenceCreateInput!, update: UserPresenceUpdateInput!): UserPresence!
  deleteUserPresence(where: UserPresenceWhereUniqueInput!): UserPresence
  deleteManyUserPresences(where: UserPresenceWhereInput): BatchPayload!
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
  databaseRefresh(where: DatabaseRefreshWhereUniqueInput!): DatabaseRefresh
  databaseRefreshes(where: DatabaseRefreshWhereInput, orderBy: DatabaseRefreshOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [DatabaseRefresh]!
  databaseRefreshesConnection(where: DatabaseRefreshWhereInput, orderBy: DatabaseRefreshOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): DatabaseRefreshConnection!
  maker(where: MakerWhereUniqueInput!): Maker
  makers(where: MakerWhereInput, orderBy: MakerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Maker]!
  makersConnection(where: MakerWhereInput, orderBy: MakerOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): MakerConnection!
  sharing(where: SharingWhereUniqueInput!): Sharing
  sharings(where: SharingWhereInput, orderBy: SharingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [Sharing]!
  sharingsConnection(where: SharingWhereInput, orderBy: SharingOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): SharingConnection!
  user(where: UserWhereUniqueInput!): User
  users(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [User]!
  usersConnection(where: UserWhereInput, orderBy: UserOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserConnection!
  userPresence(where: UserPresenceWhereUniqueInput!): UserPresence
  userPresences(where: UserPresenceWhereInput, orderBy: UserPresenceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UserPresence]!
  userPresencesConnection(where: UserPresenceWhereInput, orderBy: UserPresenceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): UserPresenceConnection!
  node(id: ID!): Node
}

type Sharing {
  id: ID!
  title: String!
  co_workers: [String!]!
  description: String!
  date: DateTime!
  status: Int!
}

type SharingConnection {
  pageInfo: PageInfo!
  edges: [SharingEdge]!
  aggregate: AggregateSharing!
}

input SharingCreateco_workersInput {
  set: [String!]
}

input SharingCreateInput {
  id: ID
  title: String!
  co_workers: SharingCreateco_workersInput
  description: String!
  date: DateTime!
  status: Int!
}

type SharingEdge {
  node: Sharing!
  cursor: String!
}

enum SharingOrderByInput {
  id_ASC
  id_DESC
  title_ASC
  title_DESC
  description_ASC
  description_DESC
  date_ASC
  date_DESC
  status_ASC
  status_DESC
}

type SharingPreviousValues {
  id: ID!
  title: String!
  co_workers: [String!]!
  description: String!
  date: DateTime!
  status: Int!
}

type SharingSubscriptionPayload {
  mutation: MutationType!
  node: Sharing
  updatedFields: [String!]
  previousValues: SharingPreviousValues
}

input SharingSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: SharingWhereInput
  AND: [SharingSubscriptionWhereInput!]
}

input SharingUpdateco_workersInput {
  set: [String!]
}

input SharingUpdateInput {
  title: String
  co_workers: SharingUpdateco_workersInput
  description: String
  date: DateTime
  status: Int
}

input SharingUpdateManyMutationInput {
  title: String
  co_workers: SharingUpdateco_workersInput
  description: String
  date: DateTime
  status: Int
}

input SharingWhereInput {
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
  status: Int
  status_not: Int
  status_in: [Int!]
  status_not_in: [Int!]
  status_lt: Int
  status_lte: Int
  status_gt: Int
  status_gte: Int
  AND: [SharingWhereInput!]
}

input SharingWhereUniqueInput {
  id: ID
  title: String
}

type Subscription {
  activity(where: ActivitySubscriptionWhereInput): ActivitySubscriptionPayload
  databaseRefresh(where: DatabaseRefreshSubscriptionWhereInput): DatabaseRefreshSubscriptionPayload
  maker(where: MakerSubscriptionWhereInput): MakerSubscriptionPayload
  sharing(where: SharingSubscriptionWhereInput): SharingSubscriptionPayload
  user(where: UserSubscriptionWhereInput): UserSubscriptionPayload
  userPresence(where: UserPresenceSubscriptionWhereInput): UserPresenceSubscriptionPayload
}

type User {
  id: ID!
  outlookId: String!
  name: String!
  email: String!
  year: Int
  plan: Int
  privilege: Int
  activities(where: UserPresenceWhereInput, orderBy: UserPresenceOrderByInput, skip: Int, after: String, before: String, first: Int, last: Int): [UserPresence!]
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
  privilege: Int
  activities: UserPresenceCreateManyWithoutUserInput
}

input UserCreateOneWithoutActivitiesInput {
  create: UserCreateWithoutActivitiesInput
  connect: UserWhereUniqueInput
}

input UserCreateWithoutActivitiesInput {
  id: ID
  outlookId: String!
  name: String!
  email: String!
  year: Int
  plan: Int
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
  privilege_ASC
  privilege_DESC
}

type UserPresence {
  id: ID!
  code: String!
  user: User!
  activity: Activity!
  presence: Boolean!
  xp: Int!
}

type UserPresenceConnection {
  pageInfo: PageInfo!
  edges: [UserPresenceEdge]!
  aggregate: AggregateUserPresence!
}

input UserPresenceCreateInput {
  id: ID
  code: String!
  user: UserCreateOneWithoutActivitiesInput!
  activity: ActivityCreateOneWithoutRegisteredInput!
  presence: Boolean!
  xp: Int!
}

input UserPresenceCreateManyWithoutActivityInput {
  create: [UserPresenceCreateWithoutActivityInput!]
  connect: [UserPresenceWhereUniqueInput!]
}

input UserPresenceCreateManyWithoutUserInput {
  create: [UserPresenceCreateWithoutUserInput!]
  connect: [UserPresenceWhereUniqueInput!]
}

input UserPresenceCreateWithoutActivityInput {
  id: ID
  code: String!
  user: UserCreateOneWithoutActivitiesInput!
  presence: Boolean!
  xp: Int!
}

input UserPresenceCreateWithoutUserInput {
  id: ID
  code: String!
  activity: ActivityCreateOneWithoutRegisteredInput!
  presence: Boolean!
  xp: Int!
}

type UserPresenceEdge {
  node: UserPresence!
  cursor: String!
}

enum UserPresenceOrderByInput {
  id_ASC
  id_DESC
  code_ASC
  code_DESC
  presence_ASC
  presence_DESC
  xp_ASC
  xp_DESC
}

type UserPresencePreviousValues {
  id: ID!
  code: String!
  presence: Boolean!
  xp: Int!
}

input UserPresenceScalarWhereInput {
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
  presence: Boolean
  presence_not: Boolean
  xp: Int
  xp_not: Int
  xp_in: [Int!]
  xp_not_in: [Int!]
  xp_lt: Int
  xp_lte: Int
  xp_gt: Int
  xp_gte: Int
  AND: [UserPresenceScalarWhereInput!]
  OR: [UserPresenceScalarWhereInput!]
  NOT: [UserPresenceScalarWhereInput!]
}

type UserPresenceSubscriptionPayload {
  mutation: MutationType!
  node: UserPresence
  updatedFields: [String!]
  previousValues: UserPresencePreviousValues
}

input UserPresenceSubscriptionWhereInput {
  mutation_in: [MutationType!]
  updatedFields_contains: String
  updatedFields_contains_every: [String!]
  updatedFields_contains_some: [String!]
  node: UserPresenceWhereInput
  AND: [UserPresenceSubscriptionWhereInput!]
}

input UserPresenceUpdateInput {
  code: String
  user: UserUpdateOneRequiredWithoutActivitiesInput
  activity: ActivityUpdateOneRequiredWithoutRegisteredInput
  presence: Boolean
  xp: Int
}

input UserPresenceUpdateManyDataInput {
  code: String
  presence: Boolean
  xp: Int
}

input UserPresenceUpdateManyMutationInput {
  code: String
  presence: Boolean
  xp: Int
}

input UserPresenceUpdateManyWithoutActivityInput {
  create: [UserPresenceCreateWithoutActivityInput!]
  delete: [UserPresenceWhereUniqueInput!]
  connect: [UserPresenceWhereUniqueInput!]
  set: [UserPresenceWhereUniqueInput!]
  disconnect: [UserPresenceWhereUniqueInput!]
  update: [UserPresenceUpdateWithWhereUniqueWithoutActivityInput!]
  upsert: [UserPresenceUpsertWithWhereUniqueWithoutActivityInput!]
  deleteMany: [UserPresenceScalarWhereInput!]
  updateMany: [UserPresenceUpdateManyWithWhereNestedInput!]
}

input UserPresenceUpdateManyWithoutUserInput {
  create: [UserPresenceCreateWithoutUserInput!]
  delete: [UserPresenceWhereUniqueInput!]
  connect: [UserPresenceWhereUniqueInput!]
  set: [UserPresenceWhereUniqueInput!]
  disconnect: [UserPresenceWhereUniqueInput!]
  update: [UserPresenceUpdateWithWhereUniqueWithoutUserInput!]
  upsert: [UserPresenceUpsertWithWhereUniqueWithoutUserInput!]
  deleteMany: [UserPresenceScalarWhereInput!]
  updateMany: [UserPresenceUpdateManyWithWhereNestedInput!]
}

input UserPresenceUpdateManyWithWhereNestedInput {
  where: UserPresenceScalarWhereInput!
  data: UserPresenceUpdateManyDataInput!
}

input UserPresenceUpdateWithoutActivityDataInput {
  code: String
  user: UserUpdateOneRequiredWithoutActivitiesInput
  presence: Boolean
  xp: Int
}

input UserPresenceUpdateWithoutUserDataInput {
  code: String
  activity: ActivityUpdateOneRequiredWithoutRegisteredInput
  presence: Boolean
  xp: Int
}

input UserPresenceUpdateWithWhereUniqueWithoutActivityInput {
  where: UserPresenceWhereUniqueInput!
  data: UserPresenceUpdateWithoutActivityDataInput!
}

input UserPresenceUpdateWithWhereUniqueWithoutUserInput {
  where: UserPresenceWhereUniqueInput!
  data: UserPresenceUpdateWithoutUserDataInput!
}

input UserPresenceUpsertWithWhereUniqueWithoutActivityInput {
  where: UserPresenceWhereUniqueInput!
  update: UserPresenceUpdateWithoutActivityDataInput!
  create: UserPresenceCreateWithoutActivityInput!
}

input UserPresenceUpsertWithWhereUniqueWithoutUserInput {
  where: UserPresenceWhereUniqueInput!
  update: UserPresenceUpdateWithoutUserDataInput!
  create: UserPresenceCreateWithoutUserInput!
}

input UserPresenceWhereInput {
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
  user: UserWhereInput
  activity: ActivityWhereInput
  presence: Boolean
  presence_not: Boolean
  xp: Int
  xp_not: Int
  xp_in: [Int!]
  xp_not_in: [Int!]
  xp_lt: Int
  xp_lte: Int
  xp_gt: Int
  xp_gte: Int
  AND: [UserPresenceWhereInput!]
}

input UserPresenceWhereUniqueInput {
  id: ID
  code: String
}

type UserPreviousValues {
  id: ID!
  outlookId: String!
  name: String!
  email: String!
  year: Int
  plan: Int
  privilege: Int
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
  privilege: Int
  activities: UserPresenceUpdateManyWithoutUserInput
}

input UserUpdateManyMutationInput {
  outlookId: String
  name: String
  email: String
  year: Int
  plan: Int
  privilege: Int
}

input UserUpdateOneRequiredWithoutActivitiesInput {
  create: UserCreateWithoutActivitiesInput
  update: UserUpdateWithoutActivitiesDataInput
  upsert: UserUpsertWithoutActivitiesInput
  connect: UserWhereUniqueInput
}

input UserUpdateWithoutActivitiesDataInput {
  outlookId: String
  name: String
  email: String
  year: Int
  plan: Int
  privilege: Int
}

input UserUpsertWithoutActivitiesInput {
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
  privilege: Int
  privilege_not: Int
  privilege_in: [Int!]
  privilege_not_in: [Int!]
  privilege_lt: Int
  privilege_lte: Int
  privilege_gt: Int
  privilege_gte: Int
  activities_some: UserPresenceWhereInput
  AND: [UserWhereInput!]
}

input UserWhereUniqueInput {
  id: ID
  outlookId: String
  email: String
}
`