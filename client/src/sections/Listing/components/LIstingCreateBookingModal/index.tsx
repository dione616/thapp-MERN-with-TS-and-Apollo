import React from "react"
import { Button, Divider, Modal, Typography } from "antd"
import moment, { Moment } from "moment"
import { displayErrorMessage, displaySuccessNotification, formatListingPrice } from "../../../../lib/utils"
import { CREATE_BOOKING } from "../../../../lib/graphql/mutations"
import { useMutation } from "react-apollo"
import {
  CreateBooking as CreateBookingData,
  CreateBookingVariables,
} from "../../../../lib/graphql/mutations/CreateBooking/__generated__/CreateBooking"

interface Props {
  id: string
  price: number
  modalVisible: boolean
  checkInDate: Moment
  checkOutDate: Moment
  setModalVisible: (modalVisible: boolean) => void
  clearBookingsData: () => void
  handleListingRefetch: () => Promise<void>
}

const { Paragraph, Text, Title } = Typography

export const ListingCreateBookingModal = ({
  id,
  price,
  modalVisible,
  checkInDate,
  checkOutDate,
  clearBookingsData,
  handleListingRefetch,
  setModalVisible,
}: Props) => {
  const [createBooking, { loading }] = useMutation<CreateBookingData, CreateBookingVariables>(CREATE_BOOKING, {
    onCompleted: () => {
      clearBookingsData()
      displaySuccessNotification(
        "You've successfully booked the listing!",
        "Booking history can always be found in your User page."
      )
      handleListingRefetch()
    },
    onError: () => {
      displayErrorMessage("Sorry! We weren't able to successfully book the listing. Please try again later!")
    },
  })
  //calc duration and price
  const daysBooked = checkOutDate.diff(checkInDate, "days") + 1
  const totalPrice = price * daysBooked

  const handleCreateBooking = async () => {
    createBooking({
      variables: {
        input: {
          id,
          checkIn: moment(checkInDate).format("YYYY-MM-DD"),
          checkOut: moment(checkOutDate).format("YYYY-MM-DD"),
        },
      },
    })
  }

  return (
    <Modal visible={modalVisible} centered footer={null} onCancel={() => setModalVisible(false)}>
      <div className="listing-booking-modal">
        <div className="listing-booking-modal__intro">
          <Title className="listing-boooking-modal__intro-title"></Title>
          <Title level={3} className="listing-boooking-modal__intro-title">
            Book your trip
          </Title>
          <Paragraph>
            Enter your payment information to book the listing from the dates between{" "}
            <Text mark strong>
              {moment(checkInDate).format("MMMM Do YYYY")}
            </Text>{" "}
            and{" "}
            <Text mark strong>
              {moment(checkOutDate).format("MMMM Do YYYY")}
            </Text>
            , inclusive.
          </Paragraph>
        </div>

        <Divider />

        <div className="listing-booking-modal__charge-summary">
          <Paragraph>
            {formatListingPrice(price, false)} * {daysBooked} days ={" "}
            <Text strong>{formatListingPrice(totalPrice, false)}</Text>
          </Paragraph>
          <Paragraph className="listing-booking-modal__charge-summary-total">
            Total = <Text mark>{formatListingPrice(totalPrice, false)}</Text>
          </Paragraph>
        </div>

        <Divider />

        <div className="listing-booking-modal__stripe-card-section">
          <Button size="large" type="primary" className="listing-booking-modal__cta" onClick={handleCreateBooking}>
            Book
          </Button>
        </div>
      </div>
    </Modal>
  )
}
