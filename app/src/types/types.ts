export interface User {
  name: String,
  xp: Number,
  email: String,
  year: Number,
  plan: Number,
  privilege: Number,
  activities: Array<{title: String}>
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
  activity: Activity
}

export interface Sharing {
  title: String,
  co_workers: String[],
  description: String,
  date: String,
  xp: Number,
  status: Number
}

export interface Maker {
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
  status: Number
}


export interface LoginData {
  login: {
    user: User
    jwt: String
  }
}
export interface LoginVars {
  code: String
}

export interface LoginCookieData {
  loginCookie: User
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
