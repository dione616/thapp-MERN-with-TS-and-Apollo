import React from "react"
import { Select } from "antd"
import { ListingsFilters } from "../../lib/graphql/globalTypes"

interface Props {
  filter: ListingsFilters
  setFilter: (filter: ListingsFilters) => void
}

const { Option } = Select

export const ListingsFilter = ({ filter, setFilter }: Props) => {
  return (
    <div className="listings-filters">
      <span>Filter By</span>
      <Select value={filter} onChange={(filter: ListingsFilters) => setFilter(filter)}>
        <Option value={ListingsFilters.PRICE_LOWEST}>Price: Low to High</Option>
        <Option value={ListingsFilters.PRICE_HIGHEST}>Price: High to Low</Option>
      </Select>
    </div>
  )
}
