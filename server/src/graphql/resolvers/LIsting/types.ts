import { Listing, ListingType } from "./../../../lib/types"
import { Booking } from "../../../lib/types"
export interface ListingArgs {
  id: string
}
export interface ListingBookingsArgs {
  limit: number
  page: number
}
export interface ListingBookingsData {
  total: number
  result: Booking[]
}
export enum ListingsFilters {
  PRICE_LOWEST = "PRICE_LOWEST",
  PRICE_HIGHEST = "PRICE_HIGHEST",
}
export interface ListingsArgs {
  filter: ListingsFilters
  limit: number
  page: number
}
export interface ListingsData {
  total: number
  result: Listing[]
}
export interface HostListingInput {
  title: string
  description: string
  image: string
  type: ListingType
  address: string
  price: number
  city: string
  country: string
  numOfGuests: number
}
export interface HostListingArgs {
  input: HostListingInput
}
export interface CreateBookingInput {
  listing: Listing
}

export interface EditListingArgs {
  id: string
  title: string
  description: string
  image: string
  type: ListingType
  address: string
  price: number
  city: string
  country: string
  numOfGuests: number
}
