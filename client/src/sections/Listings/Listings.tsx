import React from "react"
import { server } from "../../lib/api"

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

interface Props {
  title: string
}

export const Listings: React.FC<Props> = ({ title }) => {
  const fetchListings = async () => {
    const { data } = await server.fetch({ query: LISTINGS })
    console.log(data)
  }
  return (
    <div className="">
      <h2>{title}</h2>
      <button onClick={fetchListings}>Query Listings</button>
    </div>
  )
}
