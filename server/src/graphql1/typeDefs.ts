import { gql } from "apollo-server-express"
export const typeDefs = gql`
  type Query {
    authUrl: String!
  }

  type Viewer {
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
  }

  input LogInInput {
    code: String!
  }

  type Mutation {
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
  }
`
