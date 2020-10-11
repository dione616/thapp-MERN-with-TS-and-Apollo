import React from "react"
import { Card, Typography } from "antd"
import { UserOutlined } from "@ant-design/icons"
import { formatListingPrice } from "../../utils"
import { Link } from "react-router-dom"

interface Props {
  listing: {
    id: string
    title: string
    image: string
    address: string
    price: number
    numOfGuests: number
  }
}

const { Text, Title } = Typography

const ListingCard: React.FC<Props> = ({ listing }) => {
  const { id, title, image, address, price, numOfGuests } = listing
  return (
    <Link to={`/listing/${id}`}>
      <Card hoverable cover={<div className="listing-card__cover-img" style={{ backgroundImage: `url(${image})` }} />}>
        <div className="listing-card_details">
          <div className="listing-card__description">
            <Title level={4} className="listing-card__price">
              {formatListingPrice(price)}
              <span>/day</span>
            </Title>
            <Text strong ellipsis className="listing-card__title">
              {title}
            </Text>
            <Text ellipsis className="listing-card__address">
              {address}
            </Text>
          </div>
          <div className="listing-card__dimensions listing-card__dimensions--guests">
            <UserOutlined className="icon" />
            <Text strong style={{ color: "#05c5ff" }}>
              {numOfGuests} guests
            </Text>
          </div>
        </div>
      </Card>
    </Link>
  )
}

export default ListingCard
