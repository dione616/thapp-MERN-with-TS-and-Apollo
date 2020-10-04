import React from "react"
import { server } from "../../lib/api"
import { DeleteListingData, DeleteListingVariables, ListingsData } from "./types"

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
  const fetchListings = async () => {
    const { data } = await server.fetch<ListingsData>({ query: LISTINGS })
    console.log(data)
  }
  const deleteListing = async () => {
    const { data } = await server.fetch<DeleteListingData, DeleteListingVariables>({
      query: DELETE_LISTING,
      variables: { id: "5f78cb6be581621a7cecac56" },
    })
    console.log(data)
  }
  return (
    <div className="">
      <h2>{title}</h2>
      <button onClick={fetchListings}>Query Listings</button>
      <button onClick={deleteListing}>Delete Listings</button>
    </div>
  )
}
