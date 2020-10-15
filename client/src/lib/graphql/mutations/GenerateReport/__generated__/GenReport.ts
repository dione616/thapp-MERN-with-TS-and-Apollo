/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { ListingType } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: GenReport
// ====================================================

export interface GenReport_genReport {
  __typename: "Listing";
  id: string;
  title: string;
  description: string;
  image: string;
  type: ListingType;
  address: string;
  city: string;
  country: string;
  bookingsIndex: string;
  price: number;
  numOfGuests: number;
}

export interface GenReport {
  genReport: (GenReport_genReport | null)[] | null;
}

export interface GenReportVariables {
  checkIn: string;
  checkOut: string;
}
