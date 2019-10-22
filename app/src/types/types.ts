export interface User {
  id: String,
  name: String,
  xp: Number,
  email: String,
  activities: Array<{title: String}>
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