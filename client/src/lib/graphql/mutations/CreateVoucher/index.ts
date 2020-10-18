import { gql } from "apollo-boost"

export const CREATE_VOUCHER = gql`
  mutation CreateVoucher($input: CreateVoucherInput!) {
    createVoucher(input: $input)
  }
`
