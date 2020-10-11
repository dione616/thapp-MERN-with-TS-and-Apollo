import React, { useState } from "react"
import { useQuery } from "react-apollo"
import { LISTING } from "../../lib/graphql/queries"
import { Listing as ListingData, ListingVariables } from "../../lib/graphql/queries/Listing/__generated__/Listing"
import { RouteComponentProps } from "react-router-dom"
import { PageSkeleton, ErrorBanner } from "../../lib/components"
import { Layout, Row, Col } from "antd"
import { ListingDetails } from "./components/ListingDetails"
import { ListingBookings } from "./components/ListingBookings"
import { ListingCreateBooking } from "./components/ListingCreateBooking"
import { Moment } from "moment"

interface MatchParams {
  id: string
}

const { Content } = Layout

export const Listing = ({ match }: RouteComponentProps<MatchParams>) => {
  const [bookingsPage, setBookingsPage] = useState(1)
  const [checkInDate, setCheckInDate] = useState<Moment | null>(null)
  const [checkOutDate, setCheckOutDate] = useState<Moment | null>(null)
  const { loading, data, error } = useQuery<ListingData, ListingVariables>(LISTING, {
    variables: {
      id: match.params.id,
      bookingsPage,
      limit: 3,
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
    console.log(error)

    return (
      <Content className="listings">
        <ErrorBanner description="This list may not exits or has errro" />
        <PageSkeleton />
      </Content>
    )
  }
  const listing = data ? data.listing : null
  const listingBookings = listing ? listing.bookings : null

  const listingDetailsElement = listing ? <ListingDetails listing={listing} /> : null

  const listingBookingsElement = listingBookings ? (
    <ListingBookings
      listingBookings={listingBookings}
      bookingsPage={bookingsPage}
      limit={4}
      setBookingsPage={setBookingsPage}
    />
  ) : null

  const listingCreateBookingElement = listing ? (
    <ListingCreateBooking
      price={listing.price}
      checkInDate={checkInDate}
      setCheckInDate={setCheckInDate}
      checkOutDate={checkOutDate}
      setCheckOutDate={setCheckOutDate}
    />
  ) : null

  return (
    <Content className="listings">
      <Row gutter={24} style={{ display: "flex", justifyContent: "space-between" }}>
        <Col xs={24} lg={14}>
          {/* for xsmal 24cols for large 14cols */}
          {listingDetailsElement}
          {listingBookingsElement}
        </Col>
        <Col xs={24} lg={10}>
          {listingCreateBookingElement}
        </Col>
      </Row>
    </Content>
  )
}
