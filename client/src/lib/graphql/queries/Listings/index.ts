import { gql } from "apollo-boost"

export const LISTINGS = gql`
  query Listings($filter: ListingsFilters!, $limit: Int!, $page: Int!) {
    listings(filter: $filter, limit: $limit, page: $page) {
      total
      result {
        id
        title
        image
        address
        price
        numOfGuests
      }
    }
  }
`
