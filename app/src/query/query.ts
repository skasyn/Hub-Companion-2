import gql from 'graphql-tag';

export const LOGIN: any = gql`
  query LOGIN($code: String) {
    login(code: $code) {
      id
      name
      xp
      email
    }
  }
`;

export const LOGIN_COOKIE: any = gql`
  query LOGIN_COOKIE($code: String) {
    loginCookie(code: $code) {
      id
      name
      xp
      email
    }
  }
`;