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
import { Viewer } from "../../lib/types"
import { ListingCreateBookingModal } from "./components/LIstingCreateBookingModal"

interface MatchParams {
  id: string
}
interface Props {
  viewer: Viewer
}

const { Content } = Layout

export const Listing = ({ viewer, match }: Props & RouteComponentProps<MatchParams>) => {
  const [bookingsPage, setBookingsPage] = useState(1)
  const [modalVisible, setModalVisible] = useState(false)
  const [checkInDate, setCheckInDate] = useState<Moment | null>(null)
  const [checkOutDate, setCheckOutDate] = useState<Moment | null>(null)
  const { loading, data, error, refetch } = useQuery<ListingData, ListingVariables>(LISTING, {
    variables: {
      id: match.params.id,
      bookingsPage,
      limit: 3,
    },
  })

  const handleListingRefetch = async () => {
    await refetch()
  }

  const clearBookingsData = () => {
    setModalVisible(false)
    setCheckInDate(null)
    setCheckOutDate(null)
  }
  if (loading) {
    return (
      <Content className="listings">
        <PageSkeleton />
      </Content>
    )
  }
  if (error) {
    console.log(error, data)

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
      viewer={viewer}
      host={listing.host}
      bookingsIndex={listing.bookingsIndex}
      price={listing.price}
      checkInDate={checkInDate}
      setCheckInDate={setCheckInDate}
      checkOutDate={checkOutDate}
      setCheckOutDate={setCheckOutDate}
      setModalVisible={setModalVisible}
    />
  ) : null

  const listingCBME =
    listing && checkInDate && checkOutDate ? (
      <ListingCreateBookingModal
        id={listing.id}
        price={listing.price}
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        modalVisible={modalVisible}
        setModalVisible={setModalVisible}
        clearBookingsData={clearBookingsData}
        handleListingRefetch={handleListingRefetch}
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
      {listingCBME}
    </Content>
  )
}
