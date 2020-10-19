import React from "react"
import { Avatar, Divider, Tag, Typography, Layout } from "antd"
import Icon from "@ant-design/icons"
import { Listing as ListingData } from "../../../../lib/graphql/queries/Listing/__generated__/Listing"
import { Link } from "react-router-dom"
import { HomeOutlined } from "@ant-design/icons"
import { useQuery } from "@apollo/react-hooks"
import { Voucher as VoucherData, VoucherVariables } from "../../../../lib/graphql/queries/Voucher/__generated__/Voucher"
import { VOUCHER } from "../../../../lib/graphql/queries/Voucher"
import { ErrorBanner } from "../../../../lib/components"

interface Props {
  listing: ListingData["listing"]
}
const { Content } = Layout

const { Paragraph, Title, Text } = Typography

export const ListingDetails = ({ listing }: Props) => {
  const { title, description, image, type, address, city, numOfGuests, host, voucher } = listing

  const vouch = listing.voucher ? listing.voucher : "null"
  console.log(vouch)

  const { loading, data, error } = useQuery<VoucherData, VoucherVariables>(VOUCHER, {
    variables: {
      id: voucher?.id ? voucher?.id : "undefined",
    },
  })

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

  /* if (error) {
    return (
      <Content className="listings">
        <ErrorBanner description="Error happend loading vouchers" />
      </Content>
    )
  } */

  return (
    <div className="listing-details">
      <div style={{ backgroundImage: `url(${image})` }} className="listing-details__image"></div>
      <div className="listing-details__information">
        <Paragraph type="secondary" ellipsis className="listing-details__city-address">
          <Icon type="environment" />
          <HomeOutlined />
          {city ? city : "Sumy"}
          <Divider type="vertical" />
          {address}
        </Paragraph>

        <Title level={3} className="listing-details__title">
          {title}
        </Title>
      </div>

      <div className="listing-details__section">
        <Link to={`/user/${host.id}`}>
          <Avatar src={host.avatar} size={60} />
          <Title level={2} className="listing-details__host-name">
            {host.name}
          </Title>
        </Link>
      </div>

      <Divider />

      <div className="listing-details__section">
        <Title level={4}>About this space</Title>
        <div className="listing-details__about-items">
          <Tag color="magenta">{type}</Tag>
          <Tag color="magenta">{numOfGuests} Guests</Tag>
        </div>
        <Paragraph ellipsis={{ rows: 3, expandable: true }}>{description}</Paragraph>
      </div>

      <Divider />

      <div className="listing-details__section">
        <Title level={4}>It includes a vouchers</Title>
        <div className="listing-details__about-items">
          <Tag color="magenta">{data?.voucher.type}</Tag>
          <Tag color="magenta">{data?.voucher.quantity} pieces</Tag>
        </div>
        <Paragraph ellipsis={{ rows: 3, expandable: true }}>{description}</Paragraph>
      </div>
    </div>
  )
}
