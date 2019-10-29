export interface User {
  id: String,
  name: String,
  xp: Number,
  email: String,
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

export interface LoginData {
  login: User
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
  userPresences: UserPresence[]
}

export interface ActivityVars {
  email: String
}

export interface AllActivitiesData {
  activities: Activity[]
}