import React, { useState, FormEvent } from "react"
import { Link, Redirect } from "react-router-dom"
import { useMutation } from "@apollo/react-hooks"
import { Button, Form, Input, InputNumber, Layout, Radio, Typography, Upload } from "antd"
import { Viewer } from "../../lib/types"
import {
  HostListing as HostListingData,
  HostListingVariables,
} from "../../lib/graphql/mutations/HostListing/__generated__/HostListing"
import { HOST_LISTING } from "../../lib/graphql/mutations/HostListing"
import { displayErrorMessage, displaySuccessNotification } from "../../lib/utils"

const { Content } = Layout
const { Text, Title } = Typography
const { Item } = Form

interface Props {
  viewer: Viewer
}

export const Host = ({ viewer }: Props) => {
  const [hostListing, { loading, data }] = useMutation<HostListingData, HostListingVariables>(HOST_LISTING, {
    onError: () => {
      displayErrorMessage("Sorry we cant create your listing! Try again later.")
    },
    onCompleted: () => {
      displaySuccessNotification("You've successfully created your listing!")
    },
  })

  if (!viewer.id) {
    return (
      <Content className="host-content">
        <div className="host__form-header">
          <Title level={3}>You must sign in and sign up to become seller</Title>
          <Text type="secondary">
            Only signed in users can host new listings<Link to="/login">/login</Link>
          </Text>
        </div>
      </Content>
    )
  }

  if (loading) {
    return (
      <Content className="host-content">
        <div className="host__form-header">
          <Title level={3}>Please wait!</Title>
          <Text type="secondary">We're creating your listing now.</Text>
        </div>
      </Content>
    )
  }

  if (data && data.hostListing) {
    return <Redirect to={`/listing/${data.hostListing.id}`} />
  }

  const handleHostListing = (event: any) => {
    console.log(event)

    let values = event

    const input = {
      ...values,
      price: values.price * 100,
    }

    hostListing({
      variables: {
        input,
      },
    })
  }

  return (
    <Content className="host-content">
      <Form layout="vertical" onFinish={handleHostListing}>
        <div className="host__form-header">
          <Title level={3} className="host__form-title">
            Hi! Let's get started listing your place.
          </Title>
          <Text type="secondary">
            In this form, we'll collect some basic and additional information about your listing.
          </Text>
        </div>

        <Item label="Home Type" name="type" rules={[{ required: true, message: "Plesse enter max number of guests!" }]}>
          <Radio.Group>
            <Radio.Button value="APARTMENT">
              <span>Apartment</span>
            </Radio.Button>
            <Radio.Button value="HOUSE">
              <span>House</span>
            </Radio.Button>
          </Radio.Group>
        </Item>

        <Item
          label="Max num of Guests"
          name="numOfGuests"
          rules={[{ required: true, message: "Plesse enter max number of guests!" }]}
        >
          <InputNumber min={1} placeholder="4" />
        </Item>

        <Item
          label="Title"
          extra="Max character count of 45"
          name="title"
          rules={[{ required: true, message: "Plesse enter title!" }]}
        >
          <Input maxLength={45} placeholder="The iconic and luxurious Bel-Air mansion" />
        </Item>

        <Item
          label="Description of listing"
          extra="Max character count of 400"
          name="description"
          rules={[{ required: true, message: "Plesse enterDescription!" }]}
        >
          <Input.TextArea
            rows={3}
            maxLength={400}
            placeholder="Modern, clean, and iconic home of the Fresh Prince. Situated in the heart of Bel-Air, Los Angeles."
          />
        </Item>

        <Item label="Address" name="address" rules={[{ required: true, message: "Plesse enter address!" }]}>
          <Input placeholder="251 North Bristol Avenue" />
        </Item>

        <Item label="City/Town" name="city" rules={[{ required: true, message: "Plesse enter city" }]}>
          <Input placeholder="Los Angeles" />
        </Item>

        <Item label="Country" name="country" rules={[{ required: true, message: "Plesse enter country" }]}>
          <Input placeholder="USA" />
        </Item>

        <Item
          label="Image"
          extra="Images have to be under 1MB in size and of type JPG or PNG"
          name="image"
          rules={[{ required: true, message: "Plesse enter image url!" }]}
        >
          <div className="host__form-image-upload">
            <Input placeholder="Please enter a zip code for your listing!" />
          </div>
        </Item>

        <Item
          label="Price"
          extra="All prices in $USD/day"
          name="price"
          rules={[{ required: true, message: "Plesse enter price" }]}
        >
          <InputNumber min={0} placeholder="120" />
        </Item>

        <Item>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Item>
      </Form>
    </Content>
  )
}

/* export const WrappedHost = Form.create<Props & FormComponentProps>({
  name: "host_form"
})(Host); */
