import { gql } from "apollo-boost"

export const VOUCHERS = gql`
  query Vouchers($limit: Int!, $page: Int!) {
    vouchers(limit: $limit, page: $page) {
      id
      title
      description
      price
      quantity
      type
    }
  }
`
