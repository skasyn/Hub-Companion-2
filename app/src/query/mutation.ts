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