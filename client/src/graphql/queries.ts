import { gql } from "@apollo/client";

export const GET_SECRETS = gql`
  query getSecrets {
    secrets {
      id
      secret
      password
    }
  }
`;
