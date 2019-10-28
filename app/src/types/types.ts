export interface User {
  id: String,
  name: String,
  xp: Number,
  email: String,
  activities: Array<{title: String}>
}

export interface Activity {
  presence: Boolean,
  activity: {
    title: String,
    description: String,
    date: String,
  }
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
  userPresences: Activity[]
}

export interface ActivityVars {
  email: String
}