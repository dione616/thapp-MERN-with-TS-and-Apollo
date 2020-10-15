import { Pagination } from "antd"
import React from "react"

interface Props {
  total: number
  page: number
  limit: number
  setPage: (page: number) => void
}

export const ListingsPagination = ({ total, page, limit, setPage }: Props) => {
  console.log(total, page, limit)

  return (
    <Pagination
      current={page}
      total={total}
      defaultPageSize={10}
      showLessItems
      onChange={(page: number) => setPage(page)}
      className="listings-pagination"
    />
  )
}
