import React from "react"
import { Button, Card, Divider, Typography, DatePicker } from "antd"
import { displayErrorMessage, formatListingPrice } from "../../../../lib/utils"
import moment, { Moment } from "moment"
import { Viewer } from "../../../../lib/types"
import { Listing as ListingData } from "../../../../lib/graphql/queries/Listing/__generated__/Listing"

const { Paragraph, Title, Text } = Typography

interface Props {
  host: ListingData["listing"]["host"]
  viewer: Viewer
  bookingsIndex: ListingData["listing"]["bookingsIndex"]
  price: number
  checkOutDate: Moment | null
  checkInDate: Moment | null
  setCheckOutDate: (checkOutDate: Moment | null) => void
  setCheckInDate: (checkIntDate: Moment | null) => void
  setModalVisible: (modalVisible: boolean) => void
}

export const ListingCreateBooking = ({
  setModalVisible,
  viewer,
  host,
  price,
  bookingsIndex,
  checkInDate,
  setCheckInDate,
  checkOutDate,
  setCheckOutDate,
}: Props) => {
  //check the booked dates
  const bookingsIndexJSON = JSON.parse(bookingsIndex)
  const dateIsBooked = (currentDate: Moment) => {
    const y = moment(currentDate).year()
    const m = moment(currentDate).month()
    const d = moment(currentDate).date()

    if (bookingsIndexJSON[y] && bookingsIndexJSON[y][m]) {
      return Boolean(bookingsIndexJSON[y][m][d])
    } else {
      return false
    }
  }
  const disabledDate = (currentDate: Moment) => {
    if (currentDate) {
      const dateBefore = currentDate.isBefore(moment().endOf("day"))

      return dateBefore || dateIsBooked(currentDate)
    } else {
      return false
    }
  }

  const verifySetCheckOutDate = (selectedCheckOutDate: Moment | null) => {
    if (checkInDate && selectedCheckOutDate) {
      //check for check out later thean check in
      if (moment(selectedCheckOutDate).isBefore(checkInDate, "days")) {
        return displayErrorMessage(`You cant book check out earlier than check in!`)
      }

      //check for overlaps dates
      let dateCursor = checkInDate
      while (moment(dateCursor).isBefore(selectedCheckOutDate, "days")) {
        dateCursor = moment(dateCursor).add(1, "days")

        const y = moment(dateCursor).year()
        const m = moment(dateCursor).month()
        const d = moment(dateCursor).date()

        if (bookingsIndexJSON[y] && bookingsIndexJSON[y][m] && bookingsIndexJSON[y][m][d]) {
          return displayErrorMessage("You cant book a period of time overlaps exidting bookings!")
        }
      }
    }

    setCheckOutDate(selectedCheckOutDate)
  }

  const viewerIsHost = viewer.id === host.id
  const checkInInputDisabled = !viewer.id || viewerIsHost
  const checkOutInputDisabled = checkInInputDisabled || !checkInDate
  const disabled = checkOutInputDisabled || !checkInDate || !checkOutDate

  let buttonMessage = "You will not be charged yet"
  if (!viewer.id) {
    buttonMessage = "You have to login to make a booking"
  } else if (viewerIsHost) {
    buttonMessage = "You cant book your own list!"
  }

  return (
    <div className="listing-booking">
      <Card className="listing-booking__card">
        <Paragraph>
          <Title level={2} className="listing-booking__card-title">
            {formatListingPrice(price)} <span>/day</span>
          </Title>
        </Paragraph>
        <Divider />
        <div className="listing-booking__card-date-picker">
          <Paragraph strong>Check In</Paragraph>
          <DatePicker
            value={checkInDate}
            disabledDate={disabledDate}
            format={"YYYY/MM/DD"}
            onChange={(date) => setCheckInDate(date)}
            disabled={checkInInputDisabled}
            showToday={false}
            onOpenChange={() => setCheckOutDate(null)}
          />
        </div>
        <div className="listing-booking__card-date-picker">
          <Paragraph strong>Check Out</Paragraph>
          <DatePicker
            value={checkOutDate}
            disabledDate={disabledDate}
            format={"YYYY/MM/DD"}
            disabled={checkOutInputDisabled}
            onChange={(date) => verifySetCheckOutDate(date)}
            showToday={false}
          />
        </div>
        <Divider />
        <Button
          disabled={disabled}
          size="large"
          type="primary"
          className="listing-booking__card-cta"
          onClick={() => setModalVisible(true)}
        >
          Request to book!
        </Button>
        <Text type="secondary" mark>
          {buttonMessage}
        </Text>
      </Card>
    </div>
  )
}
