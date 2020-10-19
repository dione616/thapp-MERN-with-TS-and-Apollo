import { IResolvers } from "apollo-server-express"
import { Request } from "express"
import { ObjectId } from "mongodb"
import { Database, Listing, Voucher } from "../../../lib/types"
import { authorize } from "../../../lib/utils"
import { VoucherArgs, CreateVoucherArgs, EditVoucherArgs } from "./types"
/* import { CreateBookingArgs } from "./types" */

export const voucherResolvers: IResolvers = {
  Query: {
    voucher: async (
      _root: undefined,
      { id }: VoucherArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<Voucher | null> => {
      try {
        const voucher = db.vouchers.findOne({ _id: new ObjectId(id) })

        if (!voucher) {
          throw new Error("Voucher not found in db")
        }

        return voucher
      } catch (error) {
        throw new Error(`Failed to query voucher: ${error}`)
      }
    },
    vouchers: async (
      _root: undefined,
      { limit, page }: { limit: number; page: number },
      { db, req }: { db: Database; req: Request }
    ): Promise<Voucher[] | null> => {
      try {
        let cursor = await db.vouchers.find({})

        if (!cursor) {
          throw new Error("Vouchers not found in db")
        }

        cursor.skip(page > 0 ? (page - 1) * limit : 0)
        cursor = cursor.limit(limit)

        const vouchers = await cursor.toArray()

        return vouchers
      } catch (error) {
        throw new Error(`Failed to query vouchers: ${error}`)
      }
    },
  },
  Mutation: {
    createVoucher: async (
      _root: undefined,
      { input }: CreateVoucherArgs,
      { db, req }: { db: Database; req: Request }
    ): Promise<boolean | null> => {
      try {
        const viewer = await authorize(db, req)

        if (!viewer) {
          throw new Error("Viewer not found!")
        }

        const insertResult = await db.vouchers.insertOne({
          _id: new ObjectId(),
          ...input,
        })

        return true
      } catch (error) {
        throw new Error(`Failed to create voucher: ${error}`)
      }
    },
    deleteVoucher: async (
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
        const deletedVoucher = await db.vouchers.findOneAndDelete({ _id: new ObjectId(id) })
        if (!deletedVoucher.value) {
          throw new Error("You'r not allowed to do that!")
        }
        //TODO need to update

        return true
      } catch (error) {
        throw new Error(`Error during deleting voucher: ${error}`)
      }
    },
    editVoucher: async (
      _root,
      { input }: { input: EditVoucherArgs },
      { db, req }: { db: Database; req: Request }
    ): Promise<Voucher | undefined> => {
      const { id } = input
      try {
        const viewer = await authorize(db, req)

        if (!viewer) {
          throw new Error("You'r not allowed to do that!")
        }

        const updatedVoucher = await db.vouchers.findOneAndUpdate(
          { _id: new ObjectId(id) },
          {
            $set: {
              _id: new ObjectId(id),
              ...input,
            },
          },
          { returnOriginal: false }
        )
        if (!updatedVoucher.value) {
          throw new Error("You'r not  allowed to do that!")
        }
        //still need to update in user listings and bookings

        return updatedVoucher.value
      } catch (error) {
        throw new Error(`Error during editing voucher: ${error}`)
      }
    },
  },
  Voucher: {
    id: (voucher: Voucher): string => {
      return voucher._id.toString()
    },
  },
}
