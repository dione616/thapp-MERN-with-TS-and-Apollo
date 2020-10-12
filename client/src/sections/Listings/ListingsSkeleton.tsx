import React from "react"
import { Card, List, Skeleton } from "antd"

export const ListingsSkeleton = () => {
  const emptyDate = [{}, {}, {}, {}, {}, {}, {}, {}]

  return (
    <div>
      <Skeleton paragraph={{ rows: 1 }} />
      <List
        grid={{ gutter: 8, xs: 1, sm: 2, lg: 4 }}
        dataSource={emptyDate}
        renderItem={() => (
          <List.Item>
            <Card
              cover={
                <div
                  style={{ background: `white`, width: "400px" }}
                  className="listings-skeleton__card-cover-img"
                ></div>
              }
              loading
              className="listings-skeleton__card"
            />
          </List.Item>
        )}
      />
    </div>
  )
}
