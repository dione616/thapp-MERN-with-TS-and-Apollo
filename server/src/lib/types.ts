import { Collection, ObjectId } from "mongodb"

export interface Viewer {
  _id?: string
  token?: string
  avatar?: string
  walletId?: string
  didRequest: boolean
}

export enum ListingType {
  Apartment = "APARTMENT",
  House = "HOUSE",
}

export interface BookingsIndexMonth {
  [key: string]: boolean
}

export interface BookingsIndexYear {
  [key: string]: BookingsIndexMonth
}

export interface Booking {
  _id: ObjectId
  listing: ObjectId
  tenant: string
  checkIn: string
  checkOut: string
}

export interface Listing {
  _id: ObjectId
  title: string
  description: string
  image: string
  host: string
  type: ListingType
  address: string
  country: string
  city: string
  bookings: ObjectId[]
  bookingsIndex: BookingsIndexYear
  price: number
  numOfGuests: number
  authorized?: boolean
}

export interface User {
  _id: string
  token: string
  name: string
  avatar: string
  contact: string
  seller: boolean
  walletId?: string
  income: number
  bookings: ObjectId[]
  listings: ObjectId[]
  authorized?: boolean
}
//add seller prop to specify User

export interface Database {
  bookings: Collection<Booking>
  listings: Collection<Listing>
  users: Collection<User>
}
