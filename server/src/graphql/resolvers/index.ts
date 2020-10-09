import merge from "lodash.merge"
import { viewerResolvers } from "./Viewer"
import { userResolvers } from "../User"
import { listingResolvers } from "./LIsting"
import { bookingResolvers } from "./Booking"

export const resolvers = merge(bookingResolvers, listingResolvers, userResolvers, viewerResolvers)
