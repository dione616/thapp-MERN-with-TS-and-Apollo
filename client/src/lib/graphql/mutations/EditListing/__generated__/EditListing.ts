/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditListingInput } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: EditListing
// ====================================================

export interface EditListing_editListing {
  __typename: "Listing";
  id: string;
}

export interface EditListing {
  editListing: EditListing_editListing | null;
}

export interface EditListingVariables {
  input: EditListingInput;
}
