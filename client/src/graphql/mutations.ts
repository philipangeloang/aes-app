import { gql } from "@apollo/client";

export const ADD_SECRET = gql`
  mutation addSecret($secret: AddSecretInput) {
    addSecret(secret: $secret) {
      secret
    }
  }
`;
