export interface Listing {
  id: string
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

export interface DeleteListingData {
  deleteListing: Listing
}
export interface DeleteListingVariables {
  id: string
}