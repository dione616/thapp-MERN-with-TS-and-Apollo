/* tslint:disable */
/* eslint-disable */
// @generated
// This file was automatically generated and should not be edited.

import { EditVoucherInput, VoucherType } from "./../../../globalTypes";

// ====================================================
// GraphQL mutation operation: EditVoucher
// ====================================================

export interface EditVoucher_editVoucher {
  __typename: "Voucher";
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  type: VoucherType;
}

export interface EditVoucher {
  editVoucher: EditVoucher_editVoucher | null;
}

export interface EditVoucherVariables {
  input: EditVoucherInput;
}
