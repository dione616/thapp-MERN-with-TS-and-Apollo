import React, { useState } from "react"
import { server } from "../../lib/api"
import { DeleteListingData, DeleteListingVariables, ListingsData, Listing } from "./types"

const LISTINGS = `
  query Listings{
    listings{
      id
      title
      description
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
}`

const DELETE_LISTING = `
  mutation DeleteListing($id:ID!){
    deleteListing(id:$id){
      id
    }
  }
`

interface Props {
  title: string
}

export const Listings: React.FC<Props> = ({ title }) => {
  const [listings, setListings] = useState<Listing[] | null>(null)
  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS })

    setListings(data.listings)
  }
  const deleteListing = async (id: string) => {
    await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: { id },
    })
    fetchListings()
  }

  const listingsList = listings
    ? listings.map((listing) => {
        return (
          <li key={listing.id}>
            {listing.title} <div>{listing.description}</div>
            <button onClick={() => deleteListing(listing.id)}>Delete</button>
            <img style={{ width: "400px" }} src={listing.image} alt="image" />
          </li>
        )
      })
    : null

  return (
    <div className="">
      <h2>{title}</h2>
      <ul>{listingsList}</ul>
      <button onClick={fetchListings}>Query Listings</button>
    </div>
  )
}
