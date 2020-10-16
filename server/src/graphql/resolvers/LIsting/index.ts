import { IResolvers } from "apollo-server-express"
import { Database, Listing, ListingType, User } from "../../../lib/types"
import {
  EditListingArgs,
  HostListingArgs,
  HostListingInput,
  ListingArgs,
  ListingBookingsArgs,
  ListingBookingsData,
  ListingsArgs,
  ListingsData,
  ListingsFilters,
} from "./types"
import { ObjectId } from "mongodb"
import { authorize } from "../../../lib/utils"
import { Request } from "express"

const verifyHostListingInput = ({ title, description, type, price }: HostListingInput) => {
  if (title.length > 50) {
    throw new Error("Title must be under 50 chars!")
  }
  if (description.length > 500) {
    throw new Error("Description must be under 500 chars!")
  }
  if (type !== ListingType.Apartment && type !== ListingType.House) {
    throw new Error("ListingType wrong!")
  }
  if (price < 0) {
    throw new Error("Price must be > 0")
  }
}

export const listingResolvers: IResolvers = {
  Query: {
    listing: async (
      _root: undefined,
      { id }: ListingArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<Listing> => {
      try {
        const listing = await db.listings.findOne({ _id: new ObjectId(id) })

        if (!listing) {
          throw new Error("Listing not found in db")
        }

        const viewer = await authorize(db, req)
        if (viewer && viewer._id === listing.host) {
          listing.authorized = true
        }

        return listing
      } catch (error) {
        throw new Error(`Failed to query listing: ${error}`)
      }
    },
    listings: async (
      _root: undefined,
      { filter, limit, page }: ListingsArgs,
      { db }: { db: Database }
    ): Promise<ListingsData> => {
      try {
        const data: ListingsData = {
          total: 0,
          result: [],
        }

        let cursor = await db.listings.find({})

        if (filter && filter === ListingsFilters.PRICE_LOWEST) {
          cursor = cursor.sort({ price: 1 })
        }

        if (filter && filter === ListingsFilters.PRICE_HIGHEST) {
          cursor = cursor.sort({ price: -1 })
        }

        cursor.skip(page > 0 ? (page - 1) * limit : 0)
        cursor = cursor.limit(limit)

        data.total = await cursor.count()
        data.result = await cursor.toArray()

        return data
      } catch (error) {
        throw new Error(`failed query listings ${error}`)
      }
    },
  },
  Mutation: {
    hostListing: async (
      _root: undefined,
      { input }: HostListingArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<Listing> => {
      verifyHostListingInput(input)

      let viewer = await authorize(db, req)

      if (!viewer) {
        throw new Error("Viewer not found!")
      }

      const insertResult = await db.listings.insertOne({
        _id: new ObjectId(),
        ...input,
        bookings: [],
        bookingsIndex: {},
        host: viewer._id,
      })

      const insertedListing: Listing = insertResult.ops[0]

      await db.users.updateOne({ _id: viewer._id }, { $push: { listings: insertedListing._id } })

      return insertedListing
    },
    deleteListing: async (
      _root,
      { id }: { id: string },
      { db, req }: { db: Database; req: Request }
    ): Promise<boolean> => {
      try {
        const viewer = await authorize(db, req)

        if (!viewer) {
          throw new Error("You'r not allowed to do that!")
        }

        //delete listing by id where viewer is host!
        const deletedListing = await db.listings.findOneAndDelete({ _id: new ObjectId(id), host: viewer._id })
        if (!deletedListing.value) {
          throw new Error("You'r not allowed to do that!")
        }
        //still need to remove from user listings and bookings

        return true
      } catch (error) {
        throw new Error(`Error during deleting: ${error}`)
      }
    },
    editListing: async (
      _root,
      { input }: { input: EditListingArgs },
      { db, req }: { db: Database; req: Request }
    ): Promise<Listing | undefined> => {
      const { id } = input
      try {
        const viewer = await authorize(db, req)

        if (!viewer) {
          throw new Error("You'r not allowed to do that!")
        }

        const updatedListing = await db.listings.findOneAndUpdate(
          { _id: new ObjectId(id), host: viewer._id },
          {
            $set: {
              _id: new ObjectId(id),
              ...input,
            },
          },
          { returnOriginal: false }
        )
        if (!updatedListing.value) {
          throw new Error("You'r not  allowed to do that!")
        }
        //still need to update in user listings and bookings

        return updatedListing.value
      } catch (error) {
        throw new Error(`Error during editing: ${error}`)
      }
    },
  },
  Listing: {
    id: (listing: Listing): string => {
      return listing._id.toString()
    },
    host: async (listing: Listing, _args: {}, { db }: { db: Database }): Promise<User> => {
      const host = await db.users.findOne({ _id: listing.host })
      if (!host) {
        throw new Error(`host cant be found`)
      }

      return host
    },
    bookingsIndex: (listing: Listing): string => {
      return JSON.stringify(listing.bookingsIndex)
    },
    bookings: async (
      listing: Listing,
      { limit, page }: ListingBookingsArgs,
      { db }: { db: Database }
    ): Promise<ListingBookingsData | null> => {
      try {
        if (!listing.authorized) {
          return null
        }

        const data: ListingBookingsData = { total: 0, result: [] }

        let cursor = await db.bookings.find({
          _id: { $in: listing.bookings },
        })

        cursor.skip(page > 0 ? (page - 1) * limit : 0)
        cursor = cursor.limit(limit)

        data.total = await cursor.count()
        data.result = await cursor.toArray()

        return data
      } catch (error) {
        throw new Error(`failed query listing bookings ${error}`)
      }
    },
  },
}
