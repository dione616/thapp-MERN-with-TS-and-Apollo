import merge from "lodash.merge"
import { viewerResolvers } from "./Viewer"
import { userResolvers } from "../User"
import { listingResolvers } from "./LIsting"
import { bookingResolvers } from "./Booking"
import { reportResolvers } from "./Report"

export const resolvers = merge(reportResolvers, bookingResolvers, listingResolvers, userResolvers, viewerResolvers)
