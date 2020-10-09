import React from "react"
import { Card, Typography } from "antd"
import Icon from "@ant-design/icons"

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
  const { title, image, address, price, numOfGuests } = listing
  return (
    <Card className="listing-card__cover-img" hoverable cover={<div style={{ backgroundImage: `url(${image})` }} />}>
      <div className="listing-card_details">
        <div className="listing-card__description">
          <Title level={4} className="listing-card__price">
            {price}
            <span>/day</span>
          </Title>
          <Text strong ellipsis className="listing-card__title">
            {title}
          </Text>
          <Text strong ellipsis className="listing-card__address">
            {address}
          </Text>
        </div>
        <div className="listing-card__dimensions listing-card__dimensions--guests">
          <Icon type="user" />
          <Text>{numOfGuests} guests</Text>
        </div>
      </div>
    </Card>
  )
}

export default ListingCard
