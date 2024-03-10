export const typeDefs = `#graphql
    type Secret {
        id: ID!
        secret: String!
        password: String! 
    }
    
    type Query {
        secrets: [Secret]
        secret(id: ID!, password: String!): Secret
        
    }
    type Mutation {
        addSecret(secret: AddSecretInput!): Secret
        deleteSecret(id: ID!): Secret
        updateSecret(id: ID!, edits: EditSecretInput!): Secret
    }

    # Input Types
    input AddSecretInput {
        secret: String!
        password: String!
    }

    input EditSecretInput {
        secret: String
        password: String
    }

`;
