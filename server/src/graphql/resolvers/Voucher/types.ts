import { VoucherType } from "../../../lib/types"

export interface VoucherArgs {
  id: string
}

export interface CreateVoucherInput {
  title: string
  description: string
  image: string
  price: number
  type: VoucherType
  quantity: number
}
export interface CreateVoucherArgs {
  input: CreateVoucherInput
}

export interface EditVoucherArgs {
  id: string
  title: string
  description: string
  image: string
  price: number
  type: VoucherType
  quantity: number
}
