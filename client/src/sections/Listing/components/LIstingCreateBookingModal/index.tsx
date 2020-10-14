import React from "react"
import { Button, Divider, Modal, Typography } from "antd"
import moment, { Moment } from "moment"
import { formatListingPrice } from "../../../../lib/utils"

interface Props {
  price: number
  modalVisible: boolean
  checkInDate: Moment
  checkOutDate: Moment
  setModalVisible: (modalVisible: boolean) => void
}

const { Paragraph, Text, Title } = Typography

export const ListingCreateBookingModal = ({
  price,
  modalVisible,
  checkInDate,
  checkOutDate,
  setModalVisible,
}: Props) => {
  //calc duration and price
  const daysBooked = checkOutDate.diff(checkInDate, "days") + 1
  const totalPrice = price * daysBooked
  /* const handleCreateBooking = async () => {
    if (!stripe) {
      return;
    }

    let { token: stripeToken } = await stripe.createToken();
    console.log(stripeToken);
  }; */

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
          <Button size="large" type="primary" className="listing-booking-modal__cta">
            Book
          </Button>
        </div>
      </div>
    </Modal>
  )
}
