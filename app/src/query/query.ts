import gql from 'graphql-tag';

export const LOGIN: any = gql`
  query LOGIN($code: String!) {
    login(code: $code) {
      user {
        name
        email
        year
        plan
        privilege
      }
      jwt
      xp {
        pending
        got
      }
    }
  }
`;

export const LOGIN_COOKIE: any = gql`
  query LOGIN_COOKIE($code: String!) {
    loginCookie(code: $code) {
      user {
        name
        email
        year
        plan
        privilege
      }
      xp {
        pending
        got
      }
    }
  }
`;

export const GET_XP: any = gql`
  query GET_XP($jwt: String!) {
    getXp(code: $jwt) {
        got
        pending
    }
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
          xp
          status
          messages {
              author
              date
              message
          }
      }
  }
`;

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
          xp
          status
          messages {
              author
              date
              message
          }
      }
  }
`;

export const GET_USER_EXPERIENCE_PROJECT: any = gql`
    query GET_USER_EXPERIENCE_PROJECT($jwt: String!) {
        getUserExperienceProjects(code: $jwt) {
            title
            description
            competencies
            informations
            status
            messages {
                author
                date
                message
            }
        }
    }
`;

export const GET_ALL_USER_XP: any = gql`
    query GET_ALL_USER_XP($jwt: String!) {
        getAllUserXp(code: $jwt) {
            email
            xp {
                got
                pending
            }
        }
    }
`;

export const GET_ADMIN_USER_DATA: any = gql`
    query GET_ADMIN_USER_DATA($jwt: String!, $email: String!) {
        getAdminUserInfo(code: $jwt, email: $email) {
            user {
                name
                email
                year
                plan
                privilege
            }
            xp {
                got
                pending
            }
            activitiesXp {
                got
                pending
            }
            makerXp {
                got
                pending
            }
            sharingXp {
                got
                pending
            }
            experienceProjectXp {
                got
                pending
            }
            activities {
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
    }
`;

export const GET_ADMIN_MAKERS: any = gql`
    query GET_ADMIN_MAKER($jwt: String!) {
        getAdminMakers(code: $jwt) {
            id
            title
            description
            co_workers
            functionalities
            technologies
            delivery
            organisation
            resources
            informations
            xp
            status
            messages {
                author
                date
                message
            }
        }
    }
`;

export const GET_ADMIN_SHARINGS: any = gql`
    query GET_ADMIN_SHARINGS($jwt: String!){
        getAdminSharings(code: $jwt) {
            id
            title
            co_workers
            description
            date
            xp
            status
            messages {
                author
                date
                message
            }
        }
    }
`;

export const GET_ADMIN_EXPERIENCE_PROJECT: any = gql`
    query GET_ADMIN_EXPERIENCE_PROJECT($jwt: String!) {
        getAdminExperienceProjects(code: $jwt) {
            id
            title
            user
            description
            competencies
            informations
            status
            messages {
                author
                date
                message
            }
        }
    }
`;
