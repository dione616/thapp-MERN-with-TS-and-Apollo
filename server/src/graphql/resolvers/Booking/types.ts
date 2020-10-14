export interface CreateBookingInput {
  id: string
  checkIn: string
  checkOut: string
}
export interface CreateBookingArgs {
  input: CreateBookingInput
}
