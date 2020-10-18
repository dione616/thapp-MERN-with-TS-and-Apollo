import { gql } from "apollo-boost"

export const EDIT_VOUCHER = gql`
  mutation EditVoucher($input: EditVoucherInput!) {
    editVoucher(input: $input) {
      id
      title
      description
      price
      quantity
      type
    }
  }
`
