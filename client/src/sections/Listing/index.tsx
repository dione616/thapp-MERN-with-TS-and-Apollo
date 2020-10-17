import React, { useState } from "react"
import { useMutation, useQuery } from "react-apollo"
import { LISTING } from "../../lib/graphql/queries"
import { Listing as ListingData, ListingVariables } from "../../lib/graphql/queries/Listing/__generated__/Listing"
import {
  EditListing as EditListingData,
  EditListingVariables,
} from "../../lib/graphql/mutations/EditListing/__generated__/EditListing"
import {
  DeleteListing as DeleteListingData,
  DeleteListingVariables,
} from "../../lib/graphql/mutations/DeleteListing/__generated__/DeleteListing"
import { EDIT_LISTING } from "../../lib/graphql/mutations/EditListing"
import { Redirect, RouteComponentProps } from "react-router-dom"
import { PageSkeleton, ErrorBanner } from "../../lib/components"
import {
  Button,
  Form,
  Input,
  Card,
  Divider,
  Typography,
  DatePicker,
  List,
  Layout,
  Row,
  Col,
  InputNumber,
  Radio,
} from "antd"
import { ListingDetails } from "./components/ListingDetails"
import { ListingBookings } from "./components/ListingBookings"
import { ListingCreateBooking } from "./components/ListingCreateBooking"
import { Moment } from "moment"
import { Viewer } from "../../lib/types"
import { ListingCreateBookingModal } from "./components/LIstingCreateBookingModal"
import { displayErrorMessage, displaySuccessNotification } from "../../lib/utils"
import { DELETE_LISTING } from "../../lib/graphql/mutations/DeleteListing"

interface MatchParams {
  id: string
}
interface Props {
  viewer: Viewer
}

const { Content } = Layout
const { Paragraph, Title, Text } = Typography
const { Item } = Form

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

  const [editListing, loadingData] = useMutation<EditListingData, EditListingVariables>(EDIT_LISTING, {
    onError: () => {
      displayErrorMessage("Sorry we cant edit listing! Try again later.")
    },
    onCompleted: () => {
      displaySuccessNotification("You've successfully edited your listing!")
    },
  })

  const [deleteListing, loadingDeleteData] = useMutation<DeleteListingData, DeleteListingVariables>(DELETE_LISTING, {
    onError: () => {
      displayErrorMessage("Sorry we cant delete listing!Refresh your page or try again later.")
    },
    onCompleted: () => {
      displaySuccessNotification("You've successfully deleted your listing!")
    },
  })

  const handleEditListing = (event: any) => {
    console.log(event)

    let values = event

    const id = data?.listing.id
    const input = {
      ...values,
      price: values.price * 100,
      id,
    }

    editListing({
      variables: {
        input,
      },
    })
  }

  const handleDelete = () => {
    if (data?.listing.id) {
      deleteListing({
        variables: {
          id: data?.listing.id,
        },
      })
    }
  }

  if (loadingData.data && loadingData.data.editListing) {
    return <Redirect to="/" />
  }

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
      {viewer.id ? (
        <Form layout="vertical" onFinish={handleEditListing}>
          <div className="host__form-header">
            <Title level={3} className="host__form-title">
              Edit listing
            </Title>
            <Text type="secondary">
              In this form, we'll collect some basic and additional information about your listing.
            </Text>
          </div>

          <Item
            label="Home Type"
            name="type"
            rules={[{ required: true, message: "Plesse enter max number of guests!" }]}
          >
            <Radio.Group>
              <Radio.Button value="APARTMENT">
                <span>Apartment</span>
              </Radio.Button>
              <Radio.Button value="HOUSE">
                <span>House</span>
              </Radio.Button>
            </Radio.Group>
          </Item>

          <Item
            label="Max num of Guests"
            name="numOfGuests"
            rules={[{ required: true, message: "Plesse enter max number of guests!" }]}
          >
            <InputNumber min={1} placeholder="4" />
          </Item>

          <Item
            label="Title"
            extra="Max character count of 45"
            name="title"
            rules={[{ required: true, message: "Plesse enter title!" }]}
          >
            <Input maxLength={45} placeholder="The iconic and luxurious Bel-Air mansion" />
          </Item>

          <Item
            label="Description of listing"
            extra="Max character count of 400"
            name="description"
            rules={[{ required: true, message: "Plesse enterDescription!" }]}
          >
            <Input.TextArea
              rows={3}
              maxLength={400}
              placeholder="Modern, clean, and iconic home of the Fresh Prince. Situated in the heart of Bel-Air, Los Angeles."
            />
          </Item>

          <Item label="Address" name="address" rules={[{ required: true, message: "Plesse enter address!" }]}>
            <Input placeholder="251 North Bristol Avenue" />
          </Item>

          <Item label="City/Town" name="city" rules={[{ required: true, message: "Plesse enter city" }]}>
            <Input placeholder="Los Angeles" />
          </Item>

          <Item label="Country" name="country" rules={[{ required: true, message: "Plesse enter country" }]}>
            <Input placeholder="USA" />
          </Item>

          <Item
            label="Image"
            extra="Images have to be under 1MB in size and of type JPG or PNG"
            name="image"
            rules={[{ required: true, message: "Plesse enter image url!" }]}
          >
            <div className="host__form-image-upload">
              <Input placeholder="Please enter a zip code for your listing!" />
            </div>
          </Item>

          <Item
            label="Price"
            extra="All prices in $USD/day"
            name="price"
            rules={[{ required: true, message: "Plesse enter price" }]}
          >
            <InputNumber min={0} placeholder="120" />
          </Item>

          <Item>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Item>
        </Form>
      ) : null}
      <Button type="primary" htmlType="submit" onClick={handleDelete}>
        Delete Listing
      </Button>
    </Content>
  )
}
