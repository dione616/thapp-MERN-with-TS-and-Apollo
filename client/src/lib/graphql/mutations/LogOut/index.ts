import { gql } from "apollo-boost"

export const LOG_OUT = gql`
  mutation LogOut {
    logIn {
      id
      token
      avatar
      hasWallet
      didRequest
    }
  }
`
