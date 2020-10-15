import React, { useState } from "react"
import { Button, Card, Divider, Typography, DatePicker, Layout, List } from "antd"
import { displayErrorMessage, displaySuccessNotification } from "../../lib/utils"
import {
  GenReport as GenReportData,
  GenReportVariables,
} from "../../lib/graphql/mutations/GenerateReport/__generated__/GenReport"
import { REPORT } from "../../lib/graphql/mutations/GenerateReport"
import moment, { Moment } from "moment"
import { Viewer } from "../../lib/types"
import { useMutation } from "react-apollo"
/* import { Link } from "react-router-dom"
import { ListingsPagination } from "../Listings/ListingsPagination"
import { ListingsFilter } from "../Listings/ListingsFilter" */
import ListingCard from "../../lib/components/ListingsCard"
import { ListingsFilters } from "../../lib/graphql/globalTypes"

interface Props {
  viewer: Viewer
}

const { Content } = Layout
const { Paragraph, Title, Text } = Typography

const PAGE_LIMIT = 12

export const Report = ({ viewer }: Props) => {
  const [checkInDate, setCheckInDate] = useState<Moment | null>(null)
  const [checkOutDate, setCheckOutDate] = useState<Moment | null>(null)

  const [filter, setFilter] = useState(ListingsFilters.PRICE_HIGHEST)
  const [page, setPage] = useState(1)

  const checkIn = moment(checkInDate).format("YYYY-MM-DD")
  const checkOut = moment(checkOutDate).format("YYYY-MM-DD")

  const [generateReport, { loading, data }] = useMutation<GenReportData, GenReportVariables>(REPORT, {
    onError: () => {
      displayErrorMessage("Sorry we cant create your listing! Try again later.")
    },
    onCompleted: () => {
      displaySuccessNotification("You've successfully created your listing!")
    },
  })

  const generateReportClick = () => {
    generateReport({
      variables: {
        checkIn,
        checkOut,
      },
    })
  }

  if (loading) {
    return (
      <Content className="host-content">
        <div className="host__form-header">
          <Title level={3}>Please wait!</Title>
          <Text type="secondary">We're creating report now.</Text>
        </div>
      </Content>
    )
  }

  if (data) {
    console.log(data)
  }

  if (!viewer.id) {
    return (
      <Content className="host-content">
        <div className="host__form-header">
          <Title level={3}>You must sign in and sign up to generate report</Title>
          <Text type="secondary">
            {/* Only signed in users can host new listings<Link to="/login">/login</Link> */}
          </Text>
        </div>
      </Content>
    )
  }

  const listingsArray = data ? data.genReport : null
  const listings = listingsArray?.map((listing: any) => (
    <List.Item key={listing.id} style={{ width: "400px" }}>
      <ListingCard listing={listing} />
    </List.Item>
  ))

  const listingsSectionElements = listingsArray ? <div className="listings grid">{listings}</div> : null

  return (
    <div>
      <Card className="listing-booking__card">
        <Paragraph>
          <Title level={2} className="listing-booking__card-title">
            Genereate report about available listings for checked dates
          </Title>
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
        <Button size="large" type="primary" className="listing-booking__card-cta" onClick={generateReportClick}>
          Request to book!
        </Button>
        <Text type="secondary" mark>
          Generate Report
        </Text>
      </Card>
      {listingsSectionElements}
    </div>
  )
}
