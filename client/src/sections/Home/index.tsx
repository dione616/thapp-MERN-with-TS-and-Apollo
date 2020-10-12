import React from "react"
import { Link, RouteComponentProps } from "react-router-dom"
import { Col, Row, Layout, Typography } from "antd"
import { displayErrorMessage } from "../../lib/utils"
import { HomeHero } from "./components/HomeHero"

import sanFransiscoImage from "./components/assets/san-fransisco.jpg"
import cancunImage from "./components/assets/cancun.jpg"
import { Listings as ListingsData, ListingsVariables } from "../../lib/graphql/queries/Listings/__generated__/Listings"
import { ListingsFilters } from "../../lib/graphql/globalTypes"
import { useQuery } from "react-apollo"
import { LISTINGS } from "../../lib/graphql/queries"
import { HomeListings } from "./components/HomeListings"

const { Content } = Layout
const { Paragraph, Title } = Typography

export const Home = ({ history }: RouteComponentProps) => {
  const { loading, data } = useQuery<ListingsData, ListingsVariables>(LISTINGS, {
    variables: {
      filter: ListingsFilters.PRICE_HIGHEST,
      limit: 4,
      page: 1,
    },
  })

  const renderListingsSection = () => {
    if (loading) {
      return "Loading..."
    }
    if (data) {
      return <HomeListings title="Premium Listings" listings={data.listings.result} />
    }
    return null
  }

  const onSearch = (value: string) => {
    const trimmedValue = value.trim()
    if (trimmedValue) {
      history.push(`/listings/${trimmedValue}`)
    } else {
      displayErrorMessage("Please enter valid values")
    }
  }
  return (
    <Content className="home">
      <HomeHero onSearch={onSearch} />

      {renderListingsSection()}

      <div className="home__listings">
        <Title level={4} className="home__listings-title">
          Listings of any kind
        </Title>
        <Row gutter={12}>
          <Col xs={24} sm={12}>
            <Link to="/listings/san%20fransisco">
              <div className="home__listings-img-cover">
                <img src={sanFransiscoImage} alt="San Fransisco" className="home__listings-img" />
              </div>
            </Link>
          </Col>
          <Col xs={24} sm={12}>
            <Link to="/listings/cancún">
              <div className="home__listings-img-cover">
                <img src={cancunImage} alt="Cancún" className="home__listings-img" />
              </div>
            </Link>
          </Col>
        </Row>
      </div>
    </Content>
  )
}
