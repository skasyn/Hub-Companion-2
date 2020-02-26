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