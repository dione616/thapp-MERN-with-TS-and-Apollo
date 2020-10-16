import { gql } from "apollo-boost"

export const EDIT_LISTING = gql`
  mutation EditListing($input: EditListingInput!) {
    editListing(input: $input) {
      id
    }
  }
`
