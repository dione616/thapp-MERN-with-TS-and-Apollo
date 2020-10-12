import { Listing } from './../../../lib/types'
import { Booking } from '../../../lib/types'
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
  PRICE_LOWEST = 'PRICE_LOWEST',
  PRICE_HIGHEST = 'PRICE_HIGHEST',
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
