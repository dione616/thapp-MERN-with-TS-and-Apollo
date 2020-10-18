/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VoucherType } from "./../../../globalTypes";

// ====================================================
// GraphQL query operation: Voucher
// ====================================================

export interface Voucher_voucher {
  __typename: "Voucher";
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  type: VoucherType;
}

export interface Voucher {
  voucher: Voucher_voucher;
}

export interface VoucherVariables {
  id: string;
}
