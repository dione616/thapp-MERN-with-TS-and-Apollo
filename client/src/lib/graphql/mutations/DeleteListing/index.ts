import { gql } from "apollo-boost"

export const DELETE_LISTING = gql`
  mutation DeleteListing($id: String!) {
    deleteListing(id: $id)
  }
`
