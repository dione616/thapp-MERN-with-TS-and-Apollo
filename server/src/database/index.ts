require('dotenv').config()
import { MongoClient } from 'mongodb'
import { Database, User, Listing, Booking } from '../lib/types'

const url = ` mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.n5ags.mongodb.net/<dbname>?retryWrites=true&w=majority`

export const connectDatabase = async (): Promise<Database> => {
  const client = await MongoClient.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })

  const db = client.db('main')

  return {
    bookings: db.collection<Booking>('bookings'),
    listings: db.collection<Listing>('listings'),
    users: db.collection<User>('users'),
  }
}
