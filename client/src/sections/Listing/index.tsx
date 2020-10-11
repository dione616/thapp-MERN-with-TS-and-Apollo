import React, { useState } from "react"
import { useQuery } from "react-apollo"
import { LISTING } from "../../lib/graphql/queries"
import { Listing as ListingData, ListingVariables } from "../../lib/graphql/queries/Listing/__generated__/Listing"
import { RouteComponentProps } from "react-router-dom"
import { PageSkeleton, ErrorBanner } from "../../lib/components"
import { Layout } from "antd"

interface MatchParams {
  id: string
}

const { Content } = Layout

export const Listing = ({ match }: RouteComponentProps<MatchParams>) => {
  const [bookingsPage, setBookingsPage] = useState(1)
  const { loading, data, error } = useQuery<ListingData, ListingVariables>(LISTING, {
    variables: {
      id: match.params.id,
      bookingsPage,
      limit: 4,
    },
  })
  if (loading) {
    return (
      <Content className="listings">
        <PageSkeleton />
      </Content>
    )
  }
  if (error) {
    return (
      <Content className="listings">
        <ErrorBanner description="This list may not exits or has errro" />
        <PageSkeleton />
      </Content>
    )
  }
  const listing = data ? data.listing : null
  const listingBookings = listing ? listing.bookings : null
  return <div>Listing id {listing ? listing.id : null}</div>
}
