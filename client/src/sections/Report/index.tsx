import React, { useState } from "react"
import { Button, Card, Divider, Typography, DatePicker } from "antd"
import { displayErrorMessage } from "../../lib/utils"
import moment, { Moment } from "moment"
import { Viewer } from "../../lib/types"

interface Props {
  viewer: Viewer
}

const { Paragraph, Title, Text } = Typography

export const Report = ({ viewer }: Props) => {
  const [checkInDate, setCheckInDate] = useState<Moment | null>(null)
  const [checkOutDate, setCheckOutDate] = useState<Moment | null>(null)
  const generateReport = () => {
    const checkIn = moment(checkInDate).format("YYYY-MM-DD")
    const checkOut = moment(checkOutDate).format("YYYY-MM-DD")

    console.log("All available listings for specific dates:", checkIn, checkOut)
  }
  return (
    <div>
      <Card className="listing-booking__card">
        <Paragraph>
          <Title level={2} className="listing-booking__card-title"></Title>
        </Paragraph>
        <Divider />
        <div className="listing-booking__card-date-picker">
          <Paragraph strong>Check In</Paragraph>
          <DatePicker
            value={checkInDate}
            format={"YYYY/MM/DD"}
            onChange={(date) => setCheckInDate(date)}
            showToday={false}
          />
        </div>
        <div className="listing-booking__card-date-picker">
          <Paragraph strong>Check Out</Paragraph>
          <DatePicker
            value={checkOutDate}
            format={"YYYY/MM/DD"}
            showToday={false}
            onChange={(date) => setCheckOutDate(date)}
          />
        </div>
        <Divider />
        <Button size="large" type="primary" className="listing-booking__card-cta" onClick={generateReport}>
          Request to book!
        </Button>
        <Text type="secondary" mark>
          Generate Report
        </Text>
      </Card>
      <Text type="secondary" mark>
        let ExcludeBookings=db.bookings.find{"({$or:[{checkIn},{checkOut}]})"}
        result=db.listings.find {"({bookings:{$ne:ExcludeBookings}})"}
      </Text>
    </div>
  )
}
