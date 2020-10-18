import { gql } from "apollo-server-express"

export const typeDefs = gql`
  type Booking {
    id: ID!
    listing: Listing!
    tenant: User!
    checkIn: String!
    checkOut: String!
  }

  type Bookings {
    total: Int!
    result: [Booking!]!
  }

  enum ListingType {
    APARTMENT
    VAUCHER
  }

  enum ListingsFilters {
    PRICE_LOWEST
    PRICE_HIGHEST
  }

  enum VoucherType {
    CLUB
    RESTAURANT
    CINEMA
    MUSEUM
  }

  type Listing {
    id: ID!
    title: String!
    description: String!
    image: String!
    host: User!
    type: ListingType!
    address: String!
    city: String!
    country: String!
    bookings(limit: Int!, page: Int!): Bookings
    bookingsIndex: String!
    price: Int!
    numOfGuests: Int!
    voucher: Voucher
  }

  type Voucher {
    id: ID!
    title: String!
    description: String!
    image: String!
    price: Int!
    type: VoucherType!
    quantity: Int!
  }

  type Listings {
    total: Int!
    result: [Listing!]!
  }

  type User {
    id: ID!
    name: String!
    avatar: String!
    contact: String!
    seller: Boolean!
    hasWallet: Boolean!
    income: Int
    bookings(limit: Int!, page: Int!): Bookings
    listings(limit: Int!, page: Int!): Listings!
  }
  type Viewer {
    id: ID
    token: String
    avatar: String
    hasWallet: Boolean
    didRequest: Boolean!
    seller: Boolean
  }

  input LogInInput {
    code: String!
  }

  input HostListingInput {
    title: String!
    description: String!
    image: String!
    type: ListingType!
    address: String!
    city: String!
    country: String!
    price: Int!
    numOfGuests: Int!
    voucher: String!
  }

  input CreateBookingInput {
    id: ID!
    checkIn: String!
    checkOut: String!
  }
  input GenReportInput {
    checkIn: String!
    checkOut: String!
  }

  type Query {
    authUrl: String!
    user(id: ID!): User!
    listing(id: ID!): Listing!
    listings(filter: ListingsFilters!, limit: Int!, page: Int!): Listings!
    voucher(id: ID!): Voucher!
  }
  input EditListingInput {
    id: String!
    title: String!
    description: String!
    image: String!
    type: ListingType!
    address: String!
    city: String!
    country: String!
    price: Int!
    numOfGuests: Int!
    voucher: String
  }
  input EditVoucherInput {
    id: String!
    title: String!
    description: String!
    image: String!
    price: Int!
    type: VoucherType!
    quantity: Int!
  }
  input CreateVoucherInput {
    title: String!
    description: String!
    image: String!
    price: Int!
    type: VoucherType!
    quantity: Int!
  }

  type Mutation {
    logIn(input: LogInInput): Viewer!
    logOut: Viewer!
    hostListing(input: HostListingInput!): Listing!
    deleteListing(id: String!): Boolean!
    editListing(input: EditListingInput): Listing
    createBooking(input: CreateBookingInput!): Booking!
    genReport(checkIn: String, checkOut: String): [Listing]
    createVoucher(input: CreateVoucherInput!): Boolean
    deleteVoucher(id: String!): Boolean!
    editVaucher(input: EditVoucherInput): Voucher
  }
`
