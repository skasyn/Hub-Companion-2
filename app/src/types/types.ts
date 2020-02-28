export interface User {
  name: String,
  xp: XpVars,
  email: String,
  year: Number,
  plan: Number,
  privilege: Number,
  activities: Array<{title: String}>
  notifications: UserMessages[]
}

export interface UserMessages {
  id: String,
  seen: Boolean,
  author: String,
  date: String,
  message: String
}

export interface XpVars {
  got: Number,
  pending: Number
}

export interface Activity {
  title: String,
  description: String,
  begin: String,
  end: String,
  code: String
}

export interface UserPresence {
  presence: Boolean,
  xp: Number,
  activity: Activity
}

export interface Sharing {
  id: String,
  title: String,
  co_workers: String[],
  description: String,
  date: String,
  xp: Number,
  type: Number,
  status: Number,
  messages: ProjectMessages[]
}

export interface Maker {
  id: String,
  title: String,
  description: String,
  co_workers: String[],
  functionalities: String,
  technologies: String,
  delivery: String,
  organisation: String,
  resources: String,
  informations: String,
  xp: Number,
  status: Number,
  messages: ProjectMessages[]
}

export interface ExperienceProject {
  id: String,
  user: String,
  title: String,
  description: String,
  competencies: String,
  informations: String,
  status: Number,
  messages: ProjectMessages[]
}

export interface ProjectMessages {
  author: String,
  date: String,
  message: String
}


export interface LoginData {
  login: {
    user: User
    jwt: String
    xp: XpVars
  }
}
export interface LoginVars {
  code: String
}

export interface LoginCookieData {
  loginCookie: {
    user: User
    xp: XpVars
  }
}

export interface XpData {
  getXp: Number
}
export interface XpVars {
  code: String
}

export interface ActivityData {
  getUserActivities: UserPresence[]
}

export interface ActivityVars {
  jwt: String
}

export interface AllActivitiesData {
  getAllActivities: Activity[]
}

export interface SubmitSharingVars {
  jwt: String,
  data: String
}

export interface SubmitSharingData {
  submitSharing: Boolean
}

export interface SubmitMakerVars {
  jwt: String,
  data: String
}

export interface SubmitMakerData {
  submitMaker: Boolean
}

export interface SubmitExperienceProjectVars {
  jwt: String,
  data: String
}

export interface SubmitExperienceProjectData {
  submitExperienceProject: Boolean
}

export interface UserSharingData {
  getUserSharing: Sharing[]
}

export interface UserSharingVars {
  jwt: String
}

export interface UserSharingData {
  getUserSharing: Sharing[]
}

export interface UserSharingVars {
  jwt: String
}

export interface UserMakerData {
  getUserMaker: Maker[]
}

export interface UserMakerVars {
  jwt: String
}

export interface UserExperienceProjectData {
  getUserExperienceProjects: ExperienceProject[]
}

export interface UserExperienceProjectVars {
  jwt: String
}

export interface ChangeYearVars {
  jwt: String,
  year: Number,
}

export interface ChangeYearData {
  setYear: Boolean
}

export interface ChangePlanVars {
  jwt: String,
  plan: Number,
}

export interface ChangePlanData {
  setPlan: Boolean
}

export interface GetAllUserXpVars {
  jwt: String,
}

export interface GetAllUserXpData {
  getAllUserXp: [{
    email: String,
    xp: XpVars
  }]
}

export interface AdminGetUserVars {
  jwt: String,
  email: String
}

export interface AdminGetUserData {
  getAdminUserInfo: {
    user: User,
    xp: XpVars,
    activitiesXp: XpVars,
    makerXp: XpVars,
    sharingXp: XpVars,
    experienceProjectXp: XpVars,
    activities: UserPresence[]
  }
}

export interface AdminGetMakersVars {
  jwt: String
}

export interface AdminGetMakersData {
  getAdminMakers: Maker[]
}

export interface AdminGetSharingsVars {
  jwt: String
}

export interface AdminGetSharingsData {
  getAdminSharings: Sharing[]
}

export interface AdminGetExperienceProjectsVars {
  jwt: String
}

export interface AdminGetExperienceProjectsData {
  getAdminExperienceProjects: ExperienceProject[]
}

export interface ChangeStatusMakerVars {
  jwt: String,
  data: String
}

export interface ChangeStatusMakerData {
  changeMakerStatus: Boolean
}

export interface ChangeStatusSharingVars {
  jwt: String,
  data: String
}

export interface ChangeStatusSharingData {
  changeSharingStatus: Boolean
}

export interface ChangeStatusExperienceProjectVars {
  jwt: String,
  data: String
}

export interface ChangeStatusExperienceProjectData {
  changeExperienceProjectStatus: Boolean
}

export interface DeleteMakerVars {
  jwt: String,
  id: String
}

export interface DeleteMakerData {
  deleteMaker: Boolean
}

export interface DeleteSharingVars {
  jwt: String,
  id: String
}

export interface DeleteSharingData {
  deleteSharing: Boolean
}

export interface DeleteExperienceProjectVars {
  jwt: String,
  id: String
}

export interface DeleteExperienceProjectData {
  deleteExperienceProject: Boolean
}

export interface ReadUserNotificationVars {
  jwt: String,
  id: String
}

export interface ReadUserNotificationData {
  readUserNotification: Boolean
}

export interface DeleteUserNotificationVars {
  jwt: String,
  id: String
}

export interface DeleteUserNotificationData {
  deleteUserNotification: Boolean
}
