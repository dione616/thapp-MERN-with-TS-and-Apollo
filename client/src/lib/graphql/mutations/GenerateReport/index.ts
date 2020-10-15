import { gql } from "apollo-boost"

export const REPORT = gql`
  mutation GenReport($checkIn: String!, $checkOut: String!) {
    genReport(checkIn: $checkIn, checkOut: $checkOut) {
      id
      title
      description
      image
      type
      address
      city
      country
      bookingsIndex
      price
      numOfGuests
    }
  }
`
