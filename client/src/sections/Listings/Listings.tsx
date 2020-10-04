import React from "react"
import { useQuery, useMutation } from "../../lib/api"
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
  const { data, loading, error, refetch } = useQuery<ListingsData>(LISTINGS)

  const [deleteListing, { loading: deleteListingLoading, error: deleteListingError }] = useMutation<
    DeleteListingData,
    DeleteListingVariables
  >(DELETE_LISTING)

  const handledeleteListing = async (id: string) => {
    await deleteListing({ id })

    refetch()
  }

  const listings = data ? data.listings : null

  const listingsList = listings
    ? listings.map((listing) => {
        return (
          <li key={listing.id}>
            {listing.title} <div>{listing.description}</div>
            <button onClick={() => handledeleteListing(listing.id)}>Delete</button>
            <img style={{ width: "400px" }} src={listing.image} alt="image" />
          </li>
        )
      })
    : null

  if (loading) {
    return <h2>Loading...</h2>
  }
  if (error) {
    return <h2>Uh oh! Simething went wrong - try again later!</h2>
  }

  const deleteListingLoadingMessage = deleteListingLoading ? <h4>Deleting in progress</h4> : null
  const deleteListingLoadingError = deleteListingError ? <h4>Something went wrong during deleting :(</h4> : null

  return (
    <div className="">
      <h2>{title}</h2>
      <ul>{listingsList}</ul>
      {deleteListingLoadingMessage}
      {deleteListingLoadingError}
    </div>
  )
}
