import { gql } from "apollo-boost"

export const DELETE_VOUCHER = gql`
  mutation DeleteVoucher($id: String!) {
    deleteVoucher(id: $id)
  }
`
