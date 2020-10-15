import { IResolvers } from "apollo-server-express"
import { Database, Listing, Booking } from "../../../lib/types"
import { GenReportInput } from "./types"

export const reportResolvers: IResolvers = {
  Query: {
    genReport: async (_root: undefined, { checkIn, checkOut }, { db }: { db: Database }): Promise<Listing[]> => {
      try {
        //{ $or: [{ checkIn }, { checkOut }] }
        //{$where:()=>{return ($or: [{ checkIn }, { checkOut }])}}

        const excludedBookings = await db.bookings
          .find({
            $or: [
              { $and: [{ checkIn: { $gte: checkIn } }, { checkIn: { $lte: checkOut } }] },
              { $and: [{ checkOut: { $lte: checkOut } }, { checkOut: { $gte: checkIn } }] },
            ],
          })
          .toArray()

        const bIds = excludedBookings.map((booking) => {
          return booking._id
        })

        const availableListings = await db.listings
          .find({
            bookings: { $nin: bIds },
          })
          .toArray()

        return availableListings
      } catch (error) {
        throw new Error("Cant gen report")
      }
    },
  },
}
