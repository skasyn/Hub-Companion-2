// Code generated by Prisma (prisma@1.34.8). DO NOT EDIT.
// Please don't change this file manually but run `prisma generate` to update it.
// For more information, please read the docs: https://www.prisma.io/docs/prisma-client/

import { DocumentNode } from "graphql";
import {
  makePrismaClientClass,
  BaseClientOptions,
  Model
} from "prisma-client-lib";
import { typeDefs } from "./prisma-schema";

export type AtLeastOne<T, U = { [K in keyof T]: Pick<T, K> }> = Partial<T> &
  U[keyof U];

export type Maybe<T> = T | undefined | null;

export interface Exists {
  activity: (where?: ActivityWhereInput) => Promise<boolean>;
  user: (where?: UserWhereInput) => Promise<boolean>;
}

export interface Node {}

export type FragmentableArray<T> = Promise<Array<T>> & Fragmentable;

export interface Fragmentable {
  $fragment<T>(fragment: string | DocumentNode): Promise<T>;
}

export interface Prisma {
  $exists: Exists;
  $graphql: <T = any>(
    query: string,
    variables?: { [key: string]: any }
  ) => Promise<T>;

  /**
   * Queries
   */

  activity: (where: ActivityWhereUniqueInput) => ActivityNullablePromise;
  activities: (args?: {
    where?: ActivityWhereInput;
    orderBy?: ActivityOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<Activity>;
  activitiesConnection: (args?: {
    where?: ActivityWhereInput;
    orderBy?: ActivityOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => ActivityConnectionPromise;
  user: (where: UserWhereUniqueInput) => UserNullablePromise;
  users: (args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => FragmentableArray<User>;
  usersConnection: (args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => UserConnectionPromise;
  node: (args: { id: ID_Output }) => Node;

  /**
   * Mutations
   */

  createActivity: (data: ActivityCreateInput) => ActivityPromise;
  updateActivity: (args: {
    data: ActivityUpdateInput;
    where: ActivityWhereUniqueInput;
  }) => ActivityPromise;
  updateManyActivities: (args: {
    data: ActivityUpdateManyMutationInput;
    where?: ActivityWhereInput;
  }) => BatchPayloadPromise;
  upsertActivity: (args: {
    where: ActivityWhereUniqueInput;
    create: ActivityCreateInput;
    update: ActivityUpdateInput;
  }) => ActivityPromise;
  deleteActivity: (where: ActivityWhereUniqueInput) => ActivityPromise;
  deleteManyActivities: (where?: ActivityWhereInput) => BatchPayloadPromise;
  createUser: (data: UserCreateInput) => UserPromise;
  updateUser: (args: {
    data: UserUpdateInput;
    where: UserWhereUniqueInput;
  }) => UserPromise;
  updateManyUsers: (args: {
    data: UserUpdateManyMutationInput;
    where?: UserWhereInput;
  }) => BatchPayloadPromise;
  upsertUser: (args: {
    where: UserWhereUniqueInput;
    create: UserCreateInput;
    update: UserUpdateInput;
  }) => UserPromise;
  deleteUser: (where: UserWhereUniqueInput) => UserPromise;
  deleteManyUsers: (where?: UserWhereInput) => BatchPayloadPromise;

  /**
   * Subscriptions
   */

  $subscribe: Subscription;
}

export interface Subscription {
  activity: (
    where?: ActivitySubscriptionWhereInput
  ) => ActivitySubscriptionPayloadSubscription;
  user: (
    where?: UserSubscriptionWhereInput
  ) => UserSubscriptionPayloadSubscription;
}

export interface ClientConstructor<T> {
  new (options?: BaseClientOptions): T;
}

/**
 * Types
 */

export type UserOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "name_ASC"
  | "name_DESC"
  | "email_ASC"
  | "email_DESC"
  | "token_ASC"
  | "token_DESC"
  | "year_ASC"
  | "year_DESC"
  | "plan_ASC"
  | "plan_DESC"
  | "xp_ASC"
  | "xp_DESC"
  | "privilege_ASC"
  | "privilege_DESC";

export type ActivityOrderByInput =
  | "id_ASC"
  | "id_DESC"
  | "code_ASC"
  | "code_DESC"
  | "type_ASC"
  | "type_DESC"
  | "xp_ASC"
  | "xp_DESC"
  | "title_ASC"
  | "title_DESC"
  | "description_ASC"
  | "description_DESC"
  | "date_ASC"
  | "date_DESC";

export type MutationType = "CREATED" | "UPDATED" | "DELETED";

export interface UserUpdateWithoutActivitiesDataInput {
  name?: Maybe<String>;
  email?: Maybe<String>;
  token?: Maybe<String>;
  year?: Maybe<Int>;
  plan?: Maybe<Int>;
  xp?: Maybe<Int>;
  privilege?: Maybe<Int>;
}

export type ActivityWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
  code?: Maybe<String>;
}>;

export interface UserCreateInput {
  id?: Maybe<ID_Input>;
  name: String;
  email: String;
  token: String;
  year?: Maybe<Int>;
  plan?: Maybe<Int>;
  xp?: Maybe<Int>;
  privilege?: Maybe<Int>;
  activities?: Maybe<ActivityCreateManyWithoutRegisteredInput>;
}

export interface UserScalarWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  name?: Maybe<String>;
  name_not?: Maybe<String>;
  name_in?: Maybe<String[] | String>;
  name_not_in?: Maybe<String[] | String>;
  name_lt?: Maybe<String>;
  name_lte?: Maybe<String>;
  name_gt?: Maybe<String>;
  name_gte?: Maybe<String>;
  name_contains?: Maybe<String>;
  name_not_contains?: Maybe<String>;
  name_starts_with?: Maybe<String>;
  name_not_starts_with?: Maybe<String>;
  name_ends_with?: Maybe<String>;
  name_not_ends_with?: Maybe<String>;
  email?: Maybe<String>;
  email_not?: Maybe<String>;
  email_in?: Maybe<String[] | String>;
  email_not_in?: Maybe<String[] | String>;
  email_lt?: Maybe<String>;
  email_lte?: Maybe<String>;
  email_gt?: Maybe<String>;
  email_gte?: Maybe<String>;
  email_contains?: Maybe<String>;
  email_not_contains?: Maybe<String>;
  email_starts_with?: Maybe<String>;
  email_not_starts_with?: Maybe<String>;
  email_ends_with?: Maybe<String>;
  email_not_ends_with?: Maybe<String>;
  token?: Maybe<String>;
  token_not?: Maybe<String>;
  token_in?: Maybe<String[] | String>;
  token_not_in?: Maybe<String[] | String>;
  token_lt?: Maybe<String>;
  token_lte?: Maybe<String>;
  token_gt?: Maybe<String>;
  token_gte?: Maybe<String>;
  token_contains?: Maybe<String>;
  token_not_contains?: Maybe<String>;
  token_starts_with?: Maybe<String>;
  token_not_starts_with?: Maybe<String>;
  token_ends_with?: Maybe<String>;
  token_not_ends_with?: Maybe<String>;
  year?: Maybe<Int>;
  year_not?: Maybe<Int>;
  year_in?: Maybe<Int[] | Int>;
  year_not_in?: Maybe<Int[] | Int>;
  year_lt?: Maybe<Int>;
  year_lte?: Maybe<Int>;
  year_gt?: Maybe<Int>;
  year_gte?: Maybe<Int>;
  plan?: Maybe<Int>;
  plan_not?: Maybe<Int>;
  plan_in?: Maybe<Int[] | Int>;
  plan_not_in?: Maybe<Int[] | Int>;
  plan_lt?: Maybe<Int>;
  plan_lte?: Maybe<Int>;
  plan_gt?: Maybe<Int>;
  plan_gte?: Maybe<Int>;
  xp?: Maybe<Int>;
  xp_not?: Maybe<Int>;
  xp_in?: Maybe<Int[] | Int>;
  xp_not_in?: Maybe<Int[] | Int>;
  xp_lt?: Maybe<Int>;
  xp_lte?: Maybe<Int>;
  xp_gt?: Maybe<Int>;
  xp_gte?: Maybe<Int>;
  privilege?: Maybe<Int>;
  privilege_not?: Maybe<Int>;
  privilege_in?: Maybe<Int[] | Int>;
  privilege_not_in?: Maybe<Int[] | Int>;
  privilege_lt?: Maybe<Int>;
  privilege_lte?: Maybe<Int>;
  privilege_gt?: Maybe<Int>;
  privilege_gte?: Maybe<Int>;
  AND?: Maybe<UserScalarWhereInput[] | UserScalarWhereInput>;
  OR?: Maybe<UserScalarWhereInput[] | UserScalarWhereInput>;
  NOT?: Maybe<UserScalarWhereInput[] | UserScalarWhereInput>;
}

export interface ActivityCreateInput {
  id?: Maybe<ID_Input>;
  code: String;
  type: String;
  xp?: Maybe<Int>;
  title: String;
  description?: Maybe<String>;
  date?: Maybe<DateTimeInput>;
  registered?: Maybe<UserCreateManyWithoutActivitiesInput>;
}

export interface UserSubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<UserWhereInput>;
  AND?: Maybe<UserSubscriptionWhereInput[] | UserSubscriptionWhereInput>;
}

export interface UserCreateManyWithoutActivitiesInput {
  create?: Maybe<
    UserCreateWithoutActivitiesInput[] | UserCreateWithoutActivitiesInput
  >;
  connect?: Maybe<UserWhereUniqueInput[] | UserWhereUniqueInput>;
}

export interface UserUpdateManyMutationInput {
  name?: Maybe<String>;
  email?: Maybe<String>;
  token?: Maybe<String>;
  year?: Maybe<Int>;
  plan?: Maybe<Int>;
  xp?: Maybe<Int>;
  privilege?: Maybe<Int>;
}

export interface UserCreateWithoutActivitiesInput {
  id?: Maybe<ID_Input>;
  name: String;
  email: String;
  token: String;
  year?: Maybe<Int>;
  plan?: Maybe<Int>;
  xp?: Maybe<Int>;
  privilege?: Maybe<Int>;
}

export interface ActivityUpdateManyWithWhereNestedInput {
  where: ActivityScalarWhereInput;
  data: ActivityUpdateManyDataInput;
}

export interface ActivityUpdateInput {
  code?: Maybe<String>;
  type?: Maybe<String>;
  xp?: Maybe<Int>;
  title?: Maybe<String>;
  description?: Maybe<String>;
  date?: Maybe<DateTimeInput>;
  registered?: Maybe<UserUpdateManyWithoutActivitiesInput>;
}

export interface ActivityUpsertWithWhereUniqueWithoutRegisteredInput {
  where: ActivityWhereUniqueInput;
  update: ActivityUpdateWithoutRegisteredDataInput;
  create: ActivityCreateWithoutRegisteredInput;
}

export interface UserUpdateManyWithoutActivitiesInput {
  create?: Maybe<
    UserCreateWithoutActivitiesInput[] | UserCreateWithoutActivitiesInput
  >;
  delete?: Maybe<UserWhereUniqueInput[] | UserWhereUniqueInput>;
  connect?: Maybe<UserWhereUniqueInput[] | UserWhereUniqueInput>;
  set?: Maybe<UserWhereUniqueInput[] | UserWhereUniqueInput>;
  disconnect?: Maybe<UserWhereUniqueInput[] | UserWhereUniqueInput>;
  update?: Maybe<
    | UserUpdateWithWhereUniqueWithoutActivitiesInput[]
    | UserUpdateWithWhereUniqueWithoutActivitiesInput
  >;
  upsert?: Maybe<
    | UserUpsertWithWhereUniqueWithoutActivitiesInput[]
    | UserUpsertWithWhereUniqueWithoutActivitiesInput
  >;
  deleteMany?: Maybe<UserScalarWhereInput[] | UserScalarWhereInput>;
  updateMany?: Maybe<
    UserUpdateManyWithWhereNestedInput[] | UserUpdateManyWithWhereNestedInput
  >;
}

export type UserWhereUniqueInput = AtLeastOne<{
  id: Maybe<ID_Input>;
  email?: Maybe<String>;
  token?: Maybe<String>;
}>;

export interface UserUpdateWithWhereUniqueWithoutActivitiesInput {
  where: UserWhereUniqueInput;
  data: UserUpdateWithoutActivitiesDataInput;
}

export interface ActivityUpdateManyWithoutRegisteredInput {
  create?: Maybe<
    | ActivityCreateWithoutRegisteredInput[]
    | ActivityCreateWithoutRegisteredInput
  >;
  delete?: Maybe<ActivityWhereUniqueInput[] | ActivityWhereUniqueInput>;
  connect?: Maybe<ActivityWhereUniqueInput[] | ActivityWhereUniqueInput>;
  set?: Maybe<ActivityWhereUniqueInput[] | ActivityWhereUniqueInput>;
  disconnect?: Maybe<ActivityWhereUniqueInput[] | ActivityWhereUniqueInput>;
  update?: Maybe<
    | ActivityUpdateWithWhereUniqueWithoutRegisteredInput[]
    | ActivityUpdateWithWhereUniqueWithoutRegisteredInput
  >;
  upsert?: Maybe<
    | ActivityUpsertWithWhereUniqueWithoutRegisteredInput[]
    | ActivityUpsertWithWhereUniqueWithoutRegisteredInput
  >;
  deleteMany?: Maybe<ActivityScalarWhereInput[] | ActivityScalarWhereInput>;
  updateMany?: Maybe<
    | ActivityUpdateManyWithWhereNestedInput[]
    | ActivityUpdateManyWithWhereNestedInput
  >;
}

export interface ActivityCreateWithoutRegisteredInput {
  id?: Maybe<ID_Input>;
  code: String;
  type: String;
  xp?: Maybe<Int>;
  title: String;
  description?: Maybe<String>;
  date?: Maybe<DateTimeInput>;
}

export interface ActivityWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  code?: Maybe<String>;
  code_not?: Maybe<String>;
  code_in?: Maybe<String[] | String>;
  code_not_in?: Maybe<String[] | String>;
  code_lt?: Maybe<String>;
  code_lte?: Maybe<String>;
  code_gt?: Maybe<String>;
  code_gte?: Maybe<String>;
  code_contains?: Maybe<String>;
  code_not_contains?: Maybe<String>;
  code_starts_with?: Maybe<String>;
  code_not_starts_with?: Maybe<String>;
  code_ends_with?: Maybe<String>;
  code_not_ends_with?: Maybe<String>;
  type?: Maybe<String>;
  type_not?: Maybe<String>;
  type_in?: Maybe<String[] | String>;
  type_not_in?: Maybe<String[] | String>;
  type_lt?: Maybe<String>;
  type_lte?: Maybe<String>;
  type_gt?: Maybe<String>;
  type_gte?: Maybe<String>;
  type_contains?: Maybe<String>;
  type_not_contains?: Maybe<String>;
  type_starts_with?: Maybe<String>;
  type_not_starts_with?: Maybe<String>;
  type_ends_with?: Maybe<String>;
  type_not_ends_with?: Maybe<String>;
  xp?: Maybe<Int>;
  xp_not?: Maybe<Int>;
  xp_in?: Maybe<Int[] | Int>;
  xp_not_in?: Maybe<Int[] | Int>;
  xp_lt?: Maybe<Int>;
  xp_lte?: Maybe<Int>;
  xp_gt?: Maybe<Int>;
  xp_gte?: Maybe<Int>;
  title?: Maybe<String>;
  title_not?: Maybe<String>;
  title_in?: Maybe<String[] | String>;
  title_not_in?: Maybe<String[] | String>;
  title_lt?: Maybe<String>;
  title_lte?: Maybe<String>;
  title_gt?: Maybe<String>;
  title_gte?: Maybe<String>;
  title_contains?: Maybe<String>;
  title_not_contains?: Maybe<String>;
  title_starts_with?: Maybe<String>;
  title_not_starts_with?: Maybe<String>;
  title_ends_with?: Maybe<String>;
  title_not_ends_with?: Maybe<String>;
  description?: Maybe<String>;
  description_not?: Maybe<String>;
  description_in?: Maybe<String[] | String>;
  description_not_in?: Maybe<String[] | String>;
  description_lt?: Maybe<String>;
  description_lte?: Maybe<String>;
  description_gt?: Maybe<String>;
  description_gte?: Maybe<String>;
  description_contains?: Maybe<String>;
  description_not_contains?: Maybe<String>;
  description_starts_with?: Maybe<String>;
  description_not_starts_with?: Maybe<String>;
  description_ends_with?: Maybe<String>;
  description_not_ends_with?: Maybe<String>;
  date?: Maybe<DateTimeInput>;
  date_not?: Maybe<DateTimeInput>;
  date_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  date_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  date_lt?: Maybe<DateTimeInput>;
  date_lte?: Maybe<DateTimeInput>;
  date_gt?: Maybe<DateTimeInput>;
  date_gte?: Maybe<DateTimeInput>;
  registered_some?: Maybe<UserWhereInput>;
  AND?: Maybe<ActivityWhereInput[] | ActivityWhereInput>;
}

export interface UserUpsertWithWhereUniqueWithoutActivitiesInput {
  where: UserWhereUniqueInput;
  update: UserUpdateWithoutActivitiesDataInput;
  create: UserCreateWithoutActivitiesInput;
}

export interface ActivityUpdateManyDataInput {
  code?: Maybe<String>;
  type?: Maybe<String>;
  xp?: Maybe<Int>;
  title?: Maybe<String>;
  description?: Maybe<String>;
  date?: Maybe<DateTimeInput>;
}

export interface UserWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  name?: Maybe<String>;
  name_not?: Maybe<String>;
  name_in?: Maybe<String[] | String>;
  name_not_in?: Maybe<String[] | String>;
  name_lt?: Maybe<String>;
  name_lte?: Maybe<String>;
  name_gt?: Maybe<String>;
  name_gte?: Maybe<String>;
  name_contains?: Maybe<String>;
  name_not_contains?: Maybe<String>;
  name_starts_with?: Maybe<String>;
  name_not_starts_with?: Maybe<String>;
  name_ends_with?: Maybe<String>;
  name_not_ends_with?: Maybe<String>;
  email?: Maybe<String>;
  email_not?: Maybe<String>;
  email_in?: Maybe<String[] | String>;
  email_not_in?: Maybe<String[] | String>;
  email_lt?: Maybe<String>;
  email_lte?: Maybe<String>;
  email_gt?: Maybe<String>;
  email_gte?: Maybe<String>;
  email_contains?: Maybe<String>;
  email_not_contains?: Maybe<String>;
  email_starts_with?: Maybe<String>;
  email_not_starts_with?: Maybe<String>;
  email_ends_with?: Maybe<String>;
  email_not_ends_with?: Maybe<String>;
  token?: Maybe<String>;
  token_not?: Maybe<String>;
  token_in?: Maybe<String[] | String>;
  token_not_in?: Maybe<String[] | String>;
  token_lt?: Maybe<String>;
  token_lte?: Maybe<String>;
  token_gt?: Maybe<String>;
  token_gte?: Maybe<String>;
  token_contains?: Maybe<String>;
  token_not_contains?: Maybe<String>;
  token_starts_with?: Maybe<String>;
  token_not_starts_with?: Maybe<String>;
  token_ends_with?: Maybe<String>;
  token_not_ends_with?: Maybe<String>;
  year?: Maybe<Int>;
  year_not?: Maybe<Int>;
  year_in?: Maybe<Int[] | Int>;
  year_not_in?: Maybe<Int[] | Int>;
  year_lt?: Maybe<Int>;
  year_lte?: Maybe<Int>;
  year_gt?: Maybe<Int>;
  year_gte?: Maybe<Int>;
  plan?: Maybe<Int>;
  plan_not?: Maybe<Int>;
  plan_in?: Maybe<Int[] | Int>;
  plan_not_in?: Maybe<Int[] | Int>;
  plan_lt?: Maybe<Int>;
  plan_lte?: Maybe<Int>;
  plan_gt?: Maybe<Int>;
  plan_gte?: Maybe<Int>;
  xp?: Maybe<Int>;
  xp_not?: Maybe<Int>;
  xp_in?: Maybe<Int[] | Int>;
  xp_not_in?: Maybe<Int[] | Int>;
  xp_lt?: Maybe<Int>;
  xp_lte?: Maybe<Int>;
  xp_gt?: Maybe<Int>;
  xp_gte?: Maybe<Int>;
  privilege?: Maybe<Int>;
  privilege_not?: Maybe<Int>;
  privilege_in?: Maybe<Int[] | Int>;
  privilege_not_in?: Maybe<Int[] | Int>;
  privilege_lt?: Maybe<Int>;
  privilege_lte?: Maybe<Int>;
  privilege_gt?: Maybe<Int>;
  privilege_gte?: Maybe<Int>;
  activities_some?: Maybe<ActivityWhereInput>;
  AND?: Maybe<UserWhereInput[] | UserWhereInput>;
}

export interface ActivityUpdateWithoutRegisteredDataInput {
  code?: Maybe<String>;
  type?: Maybe<String>;
  xp?: Maybe<Int>;
  title?: Maybe<String>;
  description?: Maybe<String>;
  date?: Maybe<DateTimeInput>;
}

export interface ActivityCreateManyWithoutRegisteredInput {
  create?: Maybe<
    | ActivityCreateWithoutRegisteredInput[]
    | ActivityCreateWithoutRegisteredInput
  >;
  connect?: Maybe<ActivityWhereUniqueInput[] | ActivityWhereUniqueInput>;
}

export interface ActivityUpdateManyMutationInput {
  code?: Maybe<String>;
  type?: Maybe<String>;
  xp?: Maybe<Int>;
  title?: Maybe<String>;
  description?: Maybe<String>;
  date?: Maybe<DateTimeInput>;
}

export interface UserUpdateManyDataInput {
  name?: Maybe<String>;
  email?: Maybe<String>;
  token?: Maybe<String>;
  year?: Maybe<Int>;
  plan?: Maybe<Int>;
  xp?: Maybe<Int>;
  privilege?: Maybe<Int>;
}

export interface UserUpdateManyWithWhereNestedInput {
  where: UserScalarWhereInput;
  data: UserUpdateManyDataInput;
}

export interface ActivityUpdateWithWhereUniqueWithoutRegisteredInput {
  where: ActivityWhereUniqueInput;
  data: ActivityUpdateWithoutRegisteredDataInput;
}

export interface ActivityScalarWhereInput {
  id?: Maybe<ID_Input>;
  id_not?: Maybe<ID_Input>;
  id_in?: Maybe<ID_Input[] | ID_Input>;
  id_not_in?: Maybe<ID_Input[] | ID_Input>;
  id_lt?: Maybe<ID_Input>;
  id_lte?: Maybe<ID_Input>;
  id_gt?: Maybe<ID_Input>;
  id_gte?: Maybe<ID_Input>;
  id_contains?: Maybe<ID_Input>;
  id_not_contains?: Maybe<ID_Input>;
  id_starts_with?: Maybe<ID_Input>;
  id_not_starts_with?: Maybe<ID_Input>;
  id_ends_with?: Maybe<ID_Input>;
  id_not_ends_with?: Maybe<ID_Input>;
  code?: Maybe<String>;
  code_not?: Maybe<String>;
  code_in?: Maybe<String[] | String>;
  code_not_in?: Maybe<String[] | String>;
  code_lt?: Maybe<String>;
  code_lte?: Maybe<String>;
  code_gt?: Maybe<String>;
  code_gte?: Maybe<String>;
  code_contains?: Maybe<String>;
  code_not_contains?: Maybe<String>;
  code_starts_with?: Maybe<String>;
  code_not_starts_with?: Maybe<String>;
  code_ends_with?: Maybe<String>;
  code_not_ends_with?: Maybe<String>;
  type?: Maybe<String>;
  type_not?: Maybe<String>;
  type_in?: Maybe<String[] | String>;
  type_not_in?: Maybe<String[] | String>;
  type_lt?: Maybe<String>;
  type_lte?: Maybe<String>;
  type_gt?: Maybe<String>;
  type_gte?: Maybe<String>;
  type_contains?: Maybe<String>;
  type_not_contains?: Maybe<String>;
  type_starts_with?: Maybe<String>;
  type_not_starts_with?: Maybe<String>;
  type_ends_with?: Maybe<String>;
  type_not_ends_with?: Maybe<String>;
  xp?: Maybe<Int>;
  xp_not?: Maybe<Int>;
  xp_in?: Maybe<Int[] | Int>;
  xp_not_in?: Maybe<Int[] | Int>;
  xp_lt?: Maybe<Int>;
  xp_lte?: Maybe<Int>;
  xp_gt?: Maybe<Int>;
  xp_gte?: Maybe<Int>;
  title?: Maybe<String>;
  title_not?: Maybe<String>;
  title_in?: Maybe<String[] | String>;
  title_not_in?: Maybe<String[] | String>;
  title_lt?: Maybe<String>;
  title_lte?: Maybe<String>;
  title_gt?: Maybe<String>;
  title_gte?: Maybe<String>;
  title_contains?: Maybe<String>;
  title_not_contains?: Maybe<String>;
  title_starts_with?: Maybe<String>;
  title_not_starts_with?: Maybe<String>;
  title_ends_with?: Maybe<String>;
  title_not_ends_with?: Maybe<String>;
  description?: Maybe<String>;
  description_not?: Maybe<String>;
  description_in?: Maybe<String[] | String>;
  description_not_in?: Maybe<String[] | String>;
  description_lt?: Maybe<String>;
  description_lte?: Maybe<String>;
  description_gt?: Maybe<String>;
  description_gte?: Maybe<String>;
  description_contains?: Maybe<String>;
  description_not_contains?: Maybe<String>;
  description_starts_with?: Maybe<String>;
  description_not_starts_with?: Maybe<String>;
  description_ends_with?: Maybe<String>;
  description_not_ends_with?: Maybe<String>;
  date?: Maybe<DateTimeInput>;
  date_not?: Maybe<DateTimeInput>;
  date_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  date_not_in?: Maybe<DateTimeInput[] | DateTimeInput>;
  date_lt?: Maybe<DateTimeInput>;
  date_lte?: Maybe<DateTimeInput>;
  date_gt?: Maybe<DateTimeInput>;
  date_gte?: Maybe<DateTimeInput>;
  AND?: Maybe<ActivityScalarWhereInput[] | ActivityScalarWhereInput>;
  OR?: Maybe<ActivityScalarWhereInput[] | ActivityScalarWhereInput>;
  NOT?: Maybe<ActivityScalarWhereInput[] | ActivityScalarWhereInput>;
}

export interface ActivitySubscriptionWhereInput {
  mutation_in?: Maybe<MutationType[] | MutationType>;
  updatedFields_contains?: Maybe<String>;
  updatedFields_contains_every?: Maybe<String[] | String>;
  updatedFields_contains_some?: Maybe<String[] | String>;
  node?: Maybe<ActivityWhereInput>;
  AND?: Maybe<
    ActivitySubscriptionWhereInput[] | ActivitySubscriptionWhereInput
  >;
}

export interface UserUpdateInput {
  name?: Maybe<String>;
  email?: Maybe<String>;
  token?: Maybe<String>;
  year?: Maybe<Int>;
  plan?: Maybe<Int>;
  xp?: Maybe<Int>;
  privilege?: Maybe<Int>;
  activities?: Maybe<ActivityUpdateManyWithoutRegisteredInput>;
}

export interface NodeNode {
  id: ID_Output;
}

export interface UserPreviousValues {
  id: ID_Output;
  name: String;
  email: String;
  token: String;
  year?: Int;
  plan?: Int;
  xp?: Int;
  privilege?: Int;
}

export interface UserPreviousValuesPromise
  extends Promise<UserPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  email: () => Promise<String>;
  token: () => Promise<String>;
  year: () => Promise<Int>;
  plan: () => Promise<Int>;
  xp: () => Promise<Int>;
  privilege: () => Promise<Int>;
}

export interface UserPreviousValuesSubscription
  extends Promise<AsyncIterator<UserPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  email: () => Promise<AsyncIterator<String>>;
  token: () => Promise<AsyncIterator<String>>;
  year: () => Promise<AsyncIterator<Int>>;
  plan: () => Promise<AsyncIterator<Int>>;
  xp: () => Promise<AsyncIterator<Int>>;
  privilege: () => Promise<AsyncIterator<Int>>;
}

export interface ActivityEdge {
  node: Activity;
  cursor: String;
}

export interface ActivityEdgePromise
  extends Promise<ActivityEdge>,
    Fragmentable {
  node: <T = ActivityPromise>() => T;
  cursor: () => Promise<String>;
}

export interface ActivityEdgeSubscription
  extends Promise<AsyncIterator<ActivityEdge>>,
    Fragmentable {
  node: <T = ActivitySubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface ActivitySubscriptionPayload {
  mutation: MutationType;
  node: Activity;
  updatedFields: String[];
  previousValues: ActivityPreviousValues;
}

export interface ActivitySubscriptionPayloadPromise
  extends Promise<ActivitySubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = ActivityPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = ActivityPreviousValuesPromise>() => T;
}

export interface ActivitySubscriptionPayloadSubscription
  extends Promise<AsyncIterator<ActivitySubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = ActivitySubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = ActivityPreviousValuesSubscription>() => T;
}

export interface ActivityPreviousValues {
  id: ID_Output;
  code: String;
  type: String;
  xp?: Int;
  title: String;
  description?: String;
  date?: DateTimeOutput;
}

export interface ActivityPreviousValuesPromise
  extends Promise<ActivityPreviousValues>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  code: () => Promise<String>;
  type: () => Promise<String>;
  xp: () => Promise<Int>;
  title: () => Promise<String>;
  description: () => Promise<String>;
  date: () => Promise<DateTimeOutput>;
}

export interface ActivityPreviousValuesSubscription
  extends Promise<AsyncIterator<ActivityPreviousValues>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  code: () => Promise<AsyncIterator<String>>;
  type: () => Promise<AsyncIterator<String>>;
  xp: () => Promise<AsyncIterator<Int>>;
  title: () => Promise<AsyncIterator<String>>;
  description: () => Promise<AsyncIterator<String>>;
  date: () => Promise<AsyncIterator<DateTimeOutput>>;
}

export interface PageInfo {
  hasNextPage: Boolean;
  hasPreviousPage: Boolean;
  startCursor?: String;
  endCursor?: String;
}

export interface PageInfoPromise extends Promise<PageInfo>, Fragmentable {
  hasNextPage: () => Promise<Boolean>;
  hasPreviousPage: () => Promise<Boolean>;
  startCursor: () => Promise<String>;
  endCursor: () => Promise<String>;
}

export interface PageInfoSubscription
  extends Promise<AsyncIterator<PageInfo>>,
    Fragmentable {
  hasNextPage: () => Promise<AsyncIterator<Boolean>>;
  hasPreviousPage: () => Promise<AsyncIterator<Boolean>>;
  startCursor: () => Promise<AsyncIterator<String>>;
  endCursor: () => Promise<AsyncIterator<String>>;
}

export interface AggregateUser {
  count: Int;
}

export interface AggregateUserPromise
  extends Promise<AggregateUser>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateUserSubscription
  extends Promise<AsyncIterator<AggregateUser>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface User {
  id: ID_Output;
  name: String;
  email: String;
  token: String;
  year?: Int;
  plan?: Int;
  xp?: Int;
  privilege?: Int;
}

export interface UserPromise extends Promise<User>, Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  email: () => Promise<String>;
  token: () => Promise<String>;
  year: () => Promise<Int>;
  plan: () => Promise<Int>;
  xp: () => Promise<Int>;
  privilege: () => Promise<Int>;
  activities: <T = FragmentableArray<Activity>>(args?: {
    where?: ActivityWhereInput;
    orderBy?: ActivityOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
}

export interface UserSubscription
  extends Promise<AsyncIterator<User>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  name: () => Promise<AsyncIterator<String>>;
  email: () => Promise<AsyncIterator<String>>;
  token: () => Promise<AsyncIterator<String>>;
  year: () => Promise<AsyncIterator<Int>>;
  plan: () => Promise<AsyncIterator<Int>>;
  xp: () => Promise<AsyncIterator<Int>>;
  privilege: () => Promise<AsyncIterator<Int>>;
  activities: <T = Promise<AsyncIterator<ActivitySubscription>>>(args?: {
    where?: ActivityWhereInput;
    orderBy?: ActivityOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
}

export interface UserNullablePromise
  extends Promise<User | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  name: () => Promise<String>;
  email: () => Promise<String>;
  token: () => Promise<String>;
  year: () => Promise<Int>;
  plan: () => Promise<Int>;
  xp: () => Promise<Int>;
  privilege: () => Promise<Int>;
  activities: <T = FragmentableArray<Activity>>(args?: {
    where?: ActivityWhereInput;
    orderBy?: ActivityOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
}

export interface Activity {
  id: ID_Output;
  code: String;
  type: String;
  xp?: Int;
  title: String;
  description?: String;
  date?: DateTimeOutput;
}

export interface ActivityPromise extends Promise<Activity>, Fragmentable {
  id: () => Promise<ID_Output>;
  code: () => Promise<String>;
  type: () => Promise<String>;
  xp: () => Promise<Int>;
  title: () => Promise<String>;
  description: () => Promise<String>;
  date: () => Promise<DateTimeOutput>;
  registered: <T = FragmentableArray<User>>(args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
}

export interface ActivitySubscription
  extends Promise<AsyncIterator<Activity>>,
    Fragmentable {
  id: () => Promise<AsyncIterator<ID_Output>>;
  code: () => Promise<AsyncIterator<String>>;
  type: () => Promise<AsyncIterator<String>>;
  xp: () => Promise<AsyncIterator<Int>>;
  title: () => Promise<AsyncIterator<String>>;
  description: () => Promise<AsyncIterator<String>>;
  date: () => Promise<AsyncIterator<DateTimeOutput>>;
  registered: <T = Promise<AsyncIterator<UserSubscription>>>(args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
}

export interface ActivityNullablePromise
  extends Promise<Activity | null>,
    Fragmentable {
  id: () => Promise<ID_Output>;
  code: () => Promise<String>;
  type: () => Promise<String>;
  xp: () => Promise<Int>;
  title: () => Promise<String>;
  description: () => Promise<String>;
  date: () => Promise<DateTimeOutput>;
  registered: <T = FragmentableArray<User>>(args?: {
    where?: UserWhereInput;
    orderBy?: UserOrderByInput;
    skip?: Int;
    after?: String;
    before?: String;
    first?: Int;
    last?: Int;
  }) => T;
}

export interface ActivityConnection {
  pageInfo: PageInfo;
  edges: ActivityEdge[];
}

export interface ActivityConnectionPromise
  extends Promise<ActivityConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<ActivityEdge>>() => T;
  aggregate: <T = AggregateActivityPromise>() => T;
}

export interface ActivityConnectionSubscription
  extends Promise<AsyncIterator<ActivityConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<ActivityEdgeSubscription>>>() => T;
  aggregate: <T = AggregateActivitySubscription>() => T;
}

export interface BatchPayload {
  count: Long;
}

export interface BatchPayloadPromise
  extends Promise<BatchPayload>,
    Fragmentable {
  count: () => Promise<Long>;
}

export interface BatchPayloadSubscription
  extends Promise<AsyncIterator<BatchPayload>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Long>>;
}

export interface UserEdge {
  node: User;
  cursor: String;
}

export interface UserEdgePromise extends Promise<UserEdge>, Fragmentable {
  node: <T = UserPromise>() => T;
  cursor: () => Promise<String>;
}

export interface UserEdgeSubscription
  extends Promise<AsyncIterator<UserEdge>>,
    Fragmentable {
  node: <T = UserSubscription>() => T;
  cursor: () => Promise<AsyncIterator<String>>;
}

export interface UserSubscriptionPayload {
  mutation: MutationType;
  node: User;
  updatedFields: String[];
  previousValues: UserPreviousValues;
}

export interface UserSubscriptionPayloadPromise
  extends Promise<UserSubscriptionPayload>,
    Fragmentable {
  mutation: () => Promise<MutationType>;
  node: <T = UserPromise>() => T;
  updatedFields: () => Promise<String[]>;
  previousValues: <T = UserPreviousValuesPromise>() => T;
}

export interface UserSubscriptionPayloadSubscription
  extends Promise<AsyncIterator<UserSubscriptionPayload>>,
    Fragmentable {
  mutation: () => Promise<AsyncIterator<MutationType>>;
  node: <T = UserSubscription>() => T;
  updatedFields: () => Promise<AsyncIterator<String[]>>;
  previousValues: <T = UserPreviousValuesSubscription>() => T;
}

export interface AggregateActivity {
  count: Int;
}

export interface AggregateActivityPromise
  extends Promise<AggregateActivity>,
    Fragmentable {
  count: () => Promise<Int>;
}

export interface AggregateActivitySubscription
  extends Promise<AsyncIterator<AggregateActivity>>,
    Fragmentable {
  count: () => Promise<AsyncIterator<Int>>;
}

export interface UserConnection {
  pageInfo: PageInfo;
  edges: UserEdge[];
}

export interface UserConnectionPromise
  extends Promise<UserConnection>,
    Fragmentable {
  pageInfo: <T = PageInfoPromise>() => T;
  edges: <T = FragmentableArray<UserEdge>>() => T;
  aggregate: <T = AggregateUserPromise>() => T;
}

export interface UserConnectionSubscription
  extends Promise<AsyncIterator<UserConnection>>,
    Fragmentable {
  pageInfo: <T = PageInfoSubscription>() => T;
  edges: <T = Promise<AsyncIterator<UserEdgeSubscription>>>() => T;
  aggregate: <T = AggregateUserSubscription>() => T;
}

/*
DateTime scalar input type, allowing Date
*/
export type DateTimeInput = Date | string;

/*
DateTime scalar output type, which is always a string
*/
export type DateTimeOutput = string;

export type Long = string;

/*
The `ID` scalar type represents a unique identifier, often used to refetch an object or as key for a cache. The ID type appears in a JSON response as a String; however, it is not intended to be human-readable. When expected as an input type, any string (such as `"4"`) or integer (such as `4`) input value will be accepted as an ID.
*/
export type ID_Input = string | number;
export type ID_Output = string;

/*
The `Int` scalar type represents non-fractional signed whole numeric values. Int can represent values between -(2^31) and 2^31 - 1.
*/
export type Int = number;

/*
The `Boolean` scalar type represents `true` or `false`.
*/
export type Boolean = boolean;

/*
The `String` scalar type represents textual data, represented as UTF-8 character sequences. The String type is most often used by GraphQL to represent free-form human-readable text.
*/
export type String = string;

/**
 * Model Metadata
 */

export const models: Model[] = [
  {
    name: "User",
    embedded: false
  },
  {
    name: "Activity",
    embedded: false
  }
];

/**
 * Type Defs
 */

export const Prisma = makePrismaClientClass<ClientConstructor<Prisma>>({
  typeDefs,
  models,
  endpoint: `http://localhost:4466`
});
export const prisma = new Prisma();