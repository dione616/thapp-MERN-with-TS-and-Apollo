import merge from "lodash.merge"
import { viewerResolvers } from "./Viewer"
import { userResolvers } from "../User"
import { listingResolvers } from "./LIsting"
import { bookingResolvers } from "./Booking"
import { reportResolvers } from "./Report"
import { voucherResolvers } from "./Voucher"

export const resolvers = merge(
  voucherResolvers,
  reportResolvers,
  bookingResolvers,
  listingResolvers,
  userResolvers,
  viewerResolvers
)
