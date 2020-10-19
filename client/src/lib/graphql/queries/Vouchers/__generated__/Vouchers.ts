/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { VoucherType } from "./../../../globalTypes";

// ====================================================
// GraphQL query operation: Vouchers
// ====================================================

export interface Vouchers_vouchers {
  __typename: "Voucher";
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  type: VoucherType;
}

export interface Vouchers {
  vouchers: (Vouchers_vouchers | null)[];
}

export interface VouchersVariables {
  limit: number;
  page: number;
}
