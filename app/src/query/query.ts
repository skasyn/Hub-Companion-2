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
  query GET_XP($jwt: String!) {
    getXp(code: $jwt)
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

export const GET_USER_SHARING: any = gql`
  query GET_USER_SHARING($jwt: String!){
      getUserSharing(code: $jwt) {
          title
          co_workers
          description
          date
          status
      }
  }
`

export const GET_USER_MAKER: any = gql`
  query GET_USER_MAKER($jwt: String!) {
      getUserMaker(code: $jwt) {
          title
          description
          co_workers
          functionalities
          technologies
          delivery
          organisation
          resources
          informations
          status
      }
  }
`