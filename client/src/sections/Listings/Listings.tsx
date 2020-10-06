import { gql } from "apollo-boost"
import React from "react"
import { useQuery, useMutation } from "react-apollo"
import { Listings as ListingsData } from "./__generated__/Listings"
import { DeleteListing as DeleteListingData, DeleteListingVariables } from "./__generated__/DeleteListing"
import "./Listings.css"
import { Avatar, List, Button, Spin, Alert } from "antd"
import { ListingsSkeleton } from "./components"

const LISTINGS = gql`
  query Listings {
    listings {
      id
      title
      description
      image
      address
      price
      numOfGuests
      numOfBeds
      numOfBaths
      rating
    }
  }
`

const DELETE_LISTING = gql`
  mutation DeleteListing($id: ID!) {
    deleteListing(id: $id) {
      id
    }
  }
`

interface Props {
  title: string
}

export const Listings: React.FC<Props> = ({ title }) => {
  const { data, loading, error, refetch } = useQuery<ListingsData>(LISTINGS)

  const [deleteListing, { loading: deleteListingLoading, error: deleteListingError }] = useMutation<
    DeleteListingData,
    DeleteListingVariables
  >(DELETE_LISTING)

  const handledeleteListing = async (id: any /* : string */) => {
    await deleteListing({ variables: { id } })

    refetch()
  }

  const listings = data ? data.listings : null

  const listingsList = listings ? (
    <List
      itemLayout="horizontal"
      dataSource={listings}
      renderItem={(listing) => (
        <List.Item
          actions={[
            <Button type="primary" onClick={() => handledeleteListing(listing.id)}>
              Delete
            </Button>,
          ]}
        >
          <List.Item.Meta
            title={listing.title}
            description={listing.address}
            avatar={<Avatar src={listing.image} shape="square" size={48} />}
          />
        </List.Item>
      )}
    />
  ) : null

  /* const listingsList = listings
    ? listings.map((listing) => {
        return (
          <li key={listing.id}>
            {listing.title} <div>{listing.description}</div>
            <button onClick={() => handledeleteListing(listing.id)}>Delete</button>
            <img style={{ width: "400px" }} src={listing.image} alt="image" />
          </li>
        )
      })
    : null */

  if (loading) {
    return (
      <div className="listings">
        <ListingsSkeleton title={title} />
      </div>
    )
  }
  if (error) {
    return (
      <div className="listings">
        <ListingsSkeleton title={title} error={true} />
      </div>
    )
  }

  const deleteListingLoadingAlert = deleteListingError ? (
    <Alert type="error" message="Uh oh! Something went wrong - try again later!" className="listings__alert" />
  ) : null

  return (
    <div className="listings">
      <Spin spinning={deleteListingLoading}>
        {deleteListingLoadingAlert}
        <h2>{title}</h2>
        <ul>{listingsList}</ul>
      </Spin>
    </div>
  )
}
