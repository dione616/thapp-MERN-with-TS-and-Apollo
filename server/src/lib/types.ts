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
  Vaucher = "VAUCHER",
}

export interface Listing {
  _id: ObjectId
  description: string
  title: string
  image: string
  host: string
  type: ListingType
  address: string
  country: string
  province: string
  city: string
  bookings: ObjectId[]
  bookingsIndex: BookingsIndex
  price: number
  numOfGuests: number
  numOfBeds: number
  numOfBaths: number
  rating: number
}

export interface User {
  _id: string
  token: string
  name: string
  avatar: string
  contact: string
  admin: boolean
  walletId?: string
  income: number
  bookings: ObjectId[]
  listings: ObjectId[]
}

export interface Booking {
  _id: ObjectId
  listing: ObjectId
  tenant: string
  checkIn: string
  checkOut: string
}

export interface BookingsIndex {
  [key: string]: BookingsIndexYear
}

export interface BookingsIndexYear {
  [key: string]: BookingsIndexMonth
}
export interface BookingsIndexMonth {
  [key: string]: boolean
}

export interface Database {
  bookings: Collection<Booking>
  listings: Collection<Listing>
  users: Collection<User>
}
