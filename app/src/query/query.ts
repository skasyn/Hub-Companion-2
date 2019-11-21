import gql from 'graphql-tag';

export const LOGIN: any = gql`
  query LOGIN($code: String!) {
    login(code: $code) {
      user {
        name
        email
      }
      jwt
    }
  }
`;

export const LOGIN_COOKIE: any = gql`
  query LOGIN_COOKIE($code: String!) {
    loginCookie(code: $code) {
      id
      name
      email
    }
  }
`;

export const GET_XP: any = gql`
  query GET_XP($code: String!) {
    getXp(code: $code)
  }
`;

export const GET_ACTIVITIES: any = gql`
    query GET_ACTIVITIES($jwt: String!) {
        getUserActivities(code: $jwt)
        {
            presence
            activity {
                code
                title
                description
                begin
                end
                type
            }
        }
    }
`;

export const GET_ALL_ACTIVITIES: any = gql`
    query {
        getAllActivities {
            code
            title
            description
            begin
            end
        }
    }
`;