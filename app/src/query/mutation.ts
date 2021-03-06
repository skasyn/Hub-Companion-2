import gql from 'graphql-tag';

export const REFRESH: any = gql`
  mutation REFRESH {
      refresh
  }
`;

export const SUBMIT_SHARING: any = gql`
  mutation SUBMIT_SHARING($jwt: String!, $data: String!) {
      submitSharing(code: $jwt, data: $data)
  }
`;

export const SUBMIT_MAKER: any = gql`
  mutation SUBMIT_MAKER($jwt: String!, $data: String!) {
      submitMaker(code: $jwt, data: $data)
  }
`;

export const SUBMIT_EXPERIENCE_PROJECT: any = gql`
    mutation SUBMIT_EXPERIENCE_PROJECT($jwt: String!, $data: String!) {
        submitExperienceProject(code: $jwt, data: $data)
    }
`;

export const CHANGE_YEAR: any = gql`
  mutation CHANGE_YEAR($jwt: String!, $year: Int!) {
      setYear(code: $jwt, year: $year)
  }
`;

export const CHANGE_PLAN: any = gql`    
  mutation CHANGE_PLAN($jwt: String!, $plan: Int!) {
      setPlan(code: $jwt, plan: $plan)
  }
`;

export const CHANGE_STATUS_MAKER: any = gql`
  mutation CHANGE_STATUS_MAKER($jwt: String!, $data: String!) {
      changeMakerStatus(code: $jwt, data: $data)
  }
`;

export const CHANGE_STATUS_SHARING: any = gql`
    mutation CHANGE_STATUS_SHARING($jwt: String!, $data: String!) {
        changeSharingStatus(code: $jwt, data: $data)
    }
`;

export const CHANGE_STATUS_EXPERIENCE_PROJECT: any = gql`
    mutation CHANGE_STATUS_EXPERIENCE_PROJECT($jwt: String!, $data: String!) {
        changeExperienceProjectStatus(code: $jwt, data: $data)
    }
`;

export const DELETE_MAKER: any = gql`
    mutation DELETE_MAKER($jwt: String!, $id: String!) {
        deleteMaker(code: $jwt, id: $id)
    }
`;

export const DELETE_SHARING: any = gql`
    mutation DELETE_SHARING($jwt: String!, $id: String!) {
        deleteSharing(code: $jwt, id: $id)
    }
`;

export const DELETE_EXPERIENCE_PROJECT: any = gql`
    mutation DELETE_EXPERIENCE_PROJECT($jwt: String!, $id: String!) {
        deleteExperienceProject(code: $jwt, id: $id)
    }
`;

export const READ_USER_NOTIFICATION: any = gql`
    mutation READ_USER_NOTIFICATION($jwt: String!, $id: String!) {
        readUserNotification(code: $jwt, id: $id)
    }
`;

export const DELETE_USER_NOTIFICATION: any = gql`
    mutation DELETE_USER_NOTIFICATION($jwt: String!, $id: String!) {
        deleteUserNotification(code: $jwt, id: $id)
    }
`;