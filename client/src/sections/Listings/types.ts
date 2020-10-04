interface Listing {
  _id: ObjectId
  description: string
  title: string
  image: string
  address: string
  price: number
  numOfGuests: number
  numOfBeds: number
  numOfBaths: number
  rating: number
}

export interface ListingsData {
  listings: Listing[]
}
