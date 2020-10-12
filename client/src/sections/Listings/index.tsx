import React, { useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import { Listings as ListingsData, ListingsVariables } from "../../lib/graphql/queries/Listings/__generated__/Listings"
import { LISTINGS } from "../../lib/graphql/queries"
import { ListingsFilters } from "../../lib/graphql/globalTypes"
import { List, Layout } from "antd"
import ListingCard from "../../lib/components/ListingsCard"
import { ListingsFilter } from "./ListingsFilter"
import { ListingsPagination } from "./ListingsPagination"
import { ListingsSkeleton } from "./ListingsSkeleton"
import { ErrorBanner } from "../../lib/components"

const { Content } = Layout

const PAGE_LIMIT = 8

export const Listings = () => {
  const [filter, setFilter] = useState(ListingsFilters.PRICE_HIGHEST)
  const [page, setPage] = useState(1)
  const { loading, data, error } = useQuery<ListingsData, ListingsVariables>(LISTINGS, {
    variables: {
      filter,
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
        <ErrorBanner description="Error happend loading listings" />
        <ListingsSkeleton />
      </Content>
    )
  }

  const listings = data ? data.listings : null
  const listingsSectionElements =
    listings && listings.result.length ? (
      <div>
        <ListingsPagination page={page} total={listings.total} limit={PAGE_LIMIT} setPage={setPage} />
        <ListingsFilter filter={filter} setFilter={setFilter} />
        <List
          grid={{
            gutter: 8,
            xs: 1,
            sm: 2,
            lg: 4,
          }}
          dataSource={listings.result}
          renderItem={(listing) => (
            <List.Item style={{ width: "400px" }}>
              <ListingCard listing={listing} />
            </List.Item>
          )}
        />
      </div>
    ) : null

  return <Content className="listings">{listingsSectionElements}</Content>
}
