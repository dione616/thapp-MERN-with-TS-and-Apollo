/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

//==============================================================
// START Enums and Input Objects
//==============================================================

export enum ListingType {
  APARTMENT = "APARTMENT",
  VAUCHER = "VAUCHER",
}

export enum ListingsFilters {
  PRICE_HIGHEST = "PRICE_HIGHEST",
  PRICE_LOWEST = "PRICE_LOWEST",
}

export enum VoucherType {
  CINEMA = "CINEMA",
  CLUB = "CLUB",
  MUSEUM = "MUSEUM",
  RESTAURANT = "RESTAURANT",
}

export interface CreateBookingInput {
  id: string;
  checkIn: string;
  checkOut: string;
}

export interface CreateVoucherInput {
  title: string;
  description: string;
  image: string;
  price: number;
  type: VoucherType;
  quantity: number;
}

export interface EditListingInput {
  id: string;
  title: string;
  description: string;
  image: string;
  type: ListingType;
  address: string;
  city: string;
  country: string;
  price: number;
  numOfGuests: number;
  voucher?: string | null;
}

export interface EditVoucherInput {
  id: string;
  title: string;
  description: string;
  image: string;
  price: number;
  type: VoucherType;
  quantity: number;
}

export interface HostListingInput {
  title: string;
  description: string;
  image: string;
  type: ListingType;
  address: string;
  city: string;
  country: string;
  price: number;
  numOfGuests: number;
  voucher: string;
}

export interface LogInInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
