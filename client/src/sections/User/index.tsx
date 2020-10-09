import React, { useState } from "react"
import { useQuery } from "@apollo/react-hooks"
import { USER } from "../../lib/graphql/queries"
import { User as UserData, UserVariables } from "../../lib/graphql/queries/User/__generated__/User"
import { RouteComponentProps } from "react-router-dom"
import { Col, Row, Layout } from "antd"
import UserProfile from "./components/UserProfile"
import { Viewer } from "../../lib/types"
import { ErrorBanner, PageSkeleton } from "../../lib/components"
import { UserBookings, UserListings } from "./components"

interface Props {
  viewer: Viewer
}

interface MatchParams {
  id: string
}
const { Content } = Layout

export const User = ({ viewer, match }: Props & RouteComponentProps<MatchParams>) => {
  const [listingsPage, setListingsPage] = useState(1)
  const [bookingsPage, setBookingsPage] = useState(1)
  const { data, loading, error } = useQuery<UserData, UserVariables>(USER, {
    variables: {
      id: match.params.id,
      bookingsPage,
      listingsPage,
      limit: 4,
    },
  })

  if (loading) {
    return (
      <Content className="user">
        <PageSkeleton />
      </Content>
    )
  }

  if (error) {
    return (
      <Content className="user">
        <ErrorBanner description="This user may not exist." />
        <PageSkeleton />
      </Content>
    )
  }

  const user = data ? data.user : null
  const viewerIsUser = viewer.id === match.params.id //viewer == user

  const userListings = user ? user.listings : null
  const userBookings = user ? user.bookings : null

  const userListingsElement = userListings ? (
    <UserListings userListings={userListings} listingsPage={listingsPage} limit={4} setListingsPage={setListingsPage} />
  ) : null

  const userBookingsElement = userBookings ? (
    <UserBookings userBookings={userBookings} bookingsPage={bookingsPage} limit={4} setBookingsPage={setBookingsPage} />
  ) : null

  const userProfileElement = user ? <UserProfile user={user} viewerIsUser={viewerIsUser} /> : null
  return (
    <Content className="user">
      <Row gutter={12} /* type="flex" */ justify="space-between">
        <Col xs={24}>{userProfileElement}</Col>
        <Col xs={24}>
          {userListingsElement}
          {userBookingsElement}
        </Col>
      </Row>
    </Content>
  )
}
