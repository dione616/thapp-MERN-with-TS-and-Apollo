import React, { useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import { Vouchers as VouchersData, VouchersVariables } from "../../lib/graphql/queries/Vouchers/__generated__/Vouchers"
import { VOUCHERS } from "../../lib/graphql/queries"
import { List, Layout, Card, Typography, Tag } from "antd"
import ListingCard from "../../lib/components/ListingsCard"
import { ListingsPagination } from "../Listings/ListingsPagination"
import { ListingsSkeleton } from "../Listings/ListingsSkeleton"
import { ErrorBanner } from "../../lib/components"
import { VoucherType } from "../../lib/graphql/globalTypes"
import { Link } from "react-router-dom"
import { Viewer } from "../../lib/types"
import { Voucher } from "../../lib/graphql/queries/Voucher/__generated__/Voucher"

const { Content } = Layout
const { Text, Title } = Typography

const PAGE_LIMIT = 8

export const Vouchers = () => {
  const [page, setPage] = useState(1)
  const { loading, data, error } = useQuery<VouchersData, VouchersVariables>(VOUCHERS, {
    variables: {
      limit: PAGE_LIMIT,
      page,
    },
  })

  if (loading) {
    return (
      <Content className="listings">
        <ListingsSkeleton />
      </Content>
    )
  }
  if (error) {
    return (
      <Content className="listings">
        <ErrorBanner description="Error happend loading vouchers" />
        <ListingsSkeleton />
      </Content>
    )
  }

  const vouchers = data ? data.vouchers : null
  const voucherSectionElements = vouchers ? (
    <div>
      <ListingsPagination page={page} total={vouchers.length} limit={PAGE_LIMIT} setPage={setPage} />
      <List
        grid={{
          gutter: 8,
          xs: 1,
          sm: 2,
          lg: 4,
        }}
        dataSource={vouchers}
        renderItem={(voucher) => {
          return voucher ? (
            <List.Item style={{ width: "400px" }}>
              <VoucherCard
                id={voucher.id}
                title={voucher.title}
                description={voucher.description}
                quantity={voucher.quantity}
                price={voucher.price}
                type={voucher.type}
              />
            </List.Item>
          ) : null
        }}
      />
    </div>
  ) : null

  return <Content className="listings">{voucherSectionElements}</Content>
}

interface VoucherProps {
  id: string
  title: string
  description: string
  quantity: number
  price: number
  type: VoucherType
}

const VoucherCard = (voucher: VoucherProps) => {
  const { id, price, title, quantity, type } = voucher
  return (
    <Link to={`/voucher/${id}`}>
      <Card hoverable>
        <div className="listing-card_details">
          <div className="listing-card__description">
            <Title level={4} className="listing-card__price">
              ${price}
            </Title>
            <Text strong ellipsis className="listing-card__title">
              {title}
            </Text>
          </div>
          <div className="listing-card__dimensions listing-card__dimensions--guests">
            <Tag color="magenta">{type}</Tag>
            <Text strong style={{ color: "#05c5ff" }}>
              {quantity} pieces available
            </Text>
          </div>
        </div>
      </Card>
    </Link>
  )
}
