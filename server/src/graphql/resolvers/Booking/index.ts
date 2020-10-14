import { IResolvers } from "apollo-server-express"
import { Request } from "express"
import { ObjectId } from "mongodb"
import { Booking, Database, Listing, BookingsIndex } from "../../../lib/types"
import { authorize } from "../../../lib/utils"
import { CreateBookingArgs } from "./types"

const resolveBookingsIndex = (
  bookingsIndex: BookingsIndex,
  checkInDate: string,
  checkOutDate: string
): BookingsIndex => {
  let dateCursor = new Date(checkInDate)
  let checkOut = new Date(checkOutDate)

  const newBookingsIndex: BookingsIndex = { ...bookingsIndex }

  while (dateCursor <= checkOut) {
    const y = dateCursor.getUTCFullYear()
    const m = dateCursor.getUTCMonth()
    const d = dateCursor.getUTCDate()

    if (!newBookingsIndex[y]) {
      newBookingsIndex[y] = {}
    }

    if (!newBookingsIndex[y][m]) {
      newBookingsIndex[y][m] = {}
    }
    if (!newBookingsIndex[y][m][d]) {
      newBookingsIndex[y][m][d] = true
    } else {
      throw new Error("Selected dates cant be booked because they have had already been booked")
    }

    dateCursor = new Date(dateCursor.getTime() + 86400000)
  }

  return newBookingsIndex
}

export const bookingResolvers: IResolvers = {
  Mutation: {
    createBooking: async (
      _root: undefined,
      { input }: CreateBookingArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<Booking> => {
      try {
        //desctr fileds from input obj
        const { id, checkIn, checkOut } = input

        //verify a logged user is making req
        let viewer = await authorize(db, req)

        if (!viewer) {
          throw new Error("User cant be found!")
        }

        //find listing document that is being booked
        const listing = await db.listings.findOne({ _id: new ObjectId(id) })
        if (!listing) {
          throw new Error("listing cant be found!")
        }
        //check that viewer is not booking their own listing
        if (listing.host === viewer._id) {
          throw new Error("Viewer cant book own listing!")
        }

        //check dates
        const checkInDate = new Date(checkIn)
        const checkOutDate = new Date(checkOut)
        if (checkOutDate < checkInDate) {
          throw new Error("check out earlier than checkIn")
        }

        //create a new bookingsIndex for listing being booked
        const bookingsIndex = resolveBookingsIndex(listing.bookingsIndex, checkIn, checkOut)

        //get price
        const totalPrice = listing.price * ((checkOutDate.getTime() - checkInDate.getTime()) / 86400000 + 1)

        //get user document of host of listing
        const host = await db.users.findOne({
          _id: listing.host,
        })

        if (!host) {
          throw new Error("host not found!")
        }

        //insert new booking to bookings
        const insertRes = await db.bookings.insertOne({
          _id: new ObjectId(),
          listing: listing._id,
          tenant: viewer._id,
          checkIn,
          checkOut,
        })

        //get newly inserted document
        const insertedBooking: Booking = insertRes.ops[0]

        //update user document of host to increament income
        await db.users.updateOne(
          {
            _id: host._id,
          },
          { $inc: { income: totalPrice } }
        )

        //update bookings fields of tenant
        await db.users.updateOne(
          {
            _id: viewer._id,
          },
          { $push: { bookings: insertedBooking._id } }
        )

        //update bookings field of listing document
        await db.listings.updateOne(
          {
            _id: listing._id,
          },
          { $set: { bookingsIndex }, $push: { bookings: insertedBooking._id } }
        )

        //return newly inserted booking
        return insertedBooking
      } catch (error) {
        throw new Error(`Failed to create new booking: ${error}`)
      }
    },
  },
  Booking: {
    id: (booking: Booking): string => {
      return booking._id.toString()
    },
    listing: (booking: Booking, _args: {}, { db }: { db: Database }): Promise<Listing | null> => {
      return db.listings.findOne({ _id: booking.listing })
    },
    tenant: (booking: Booking, _args: {}, { db }: { db: Database }) => {
      return db.users.findOne({ _id: booking.tenant })
    },
  },
}
