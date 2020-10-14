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

export interface CreateBookingInput {
  id: string;
  checkIn: string;
  checkOut: string;
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
}

export interface LogInInput {
  code: string;
}

//==============================================================
// END Enums and Input Objects
//==============================================================
