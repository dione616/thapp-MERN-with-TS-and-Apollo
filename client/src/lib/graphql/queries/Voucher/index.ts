import { gql } from "apollo-boost"

export const VOUCHER = gql`
  query Voucher($id: ID!) {
    voucher(id: $id) {
      id
      title
      description
      price
      quantity
      type
    }
  }
`
