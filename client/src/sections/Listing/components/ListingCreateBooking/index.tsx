import React from "react"
import { Button, Card, Divider, Typography, DatePicker } from "antd"
import { displayErrorMessage, formatListingPrice } from "../../../../lib/utils"
import moment, { Moment } from "moment"
import { isNullOrUndefined } from "util"

const { Paragraph, Text, Title } = Typography

interface Props {
  price: number
  checkOutDate: Moment | null
  checkInDate: Moment | null
  setCheckOutDate: (checkOutDate: Moment | null) => void
  setCheckInDate: (checkIntDate: Moment | null) => void
}

export const ListingCreateBooking = ({ price, checkInDate, setCheckInDate, checkOutDate, setCheckOutDate }: Props) => {
  const disabledDate = (currentDate: Moment) => {
    if (currentDate) {
      const dateBefore = currentDate.isBefore(moment().endOf("day"))

      return dateBefore
    } else {
      return false
    }
  }

  const verifySetCheckOutDate = (selectedCheckOutDate: Moment | null) => {
    if (checkInDate && selectedCheckOutDate) {
      if (moment(selectedCheckOutDate).isBefore(checkInDate, "days")) {
        return displayErrorMessage(`You cant book check out earlier than check in!`)
      }
    }

    setCheckOutDate(selectedCheckOutDate)
  }

  const disabled = !checkInDate || !checkOutDate

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
            onChange={(date) => verifySetCheckOutDate(date)}
            showToday={false}
          />
        </div>
        <Divider />
        <Button disabled={disabled} size="large" type="primary" className="listing-booking__card-cta">
          Request to book!ss
        </Button>
      </Card>
    </div>
  )
}
