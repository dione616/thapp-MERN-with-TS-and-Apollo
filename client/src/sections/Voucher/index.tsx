import React, { useState, FormEvent } from "react"
import { Link, Redirect } from "react-router-dom"
import { useMutation } from "@apollo/react-hooks"
import { Button, Form, Input, InputNumber, Layout, Radio, Typography, Upload, Row, Col } from "antd"
import { Viewer } from "../../lib/types"
import {
  CreateVoucher as CreateVoucherData,
  CreateVoucherVariables,
} from "../../lib/graphql/mutations/CreateVoucher/__generated__/CreateVoucher"
import { CREATE_VOUCHER } from "../../lib/graphql/mutations/CreateVoucher"
import {
  EditVoucher as EditVoucherData,
  EditVoucherVariables,
} from "../../lib/graphql/mutations/EditVoucher/__generated__/EditVoucher"
import { EDIT_VOUCHER } from "../../lib/graphql/mutations/EditVoucher"
import { displayErrorMessage, displaySuccessNotification } from "../../lib/utils"

const { Content } = Layout
const { Text, Title } = Typography
const { Item } = Form

interface Props {
  viewer: Viewer
}

export const Voucher = ({ viewer }: Props) => {
  const [createVoucher, createVaucherParams] = useMutation<CreateVoucherData, CreateVoucherVariables>(CREATE_VOUCHER, {
    onError: () => {
      displayErrorMessage("Sorry we cant create your voucher! Try again later.")
    },
    onCompleted: () => {
      displaySuccessNotification("You've successfully created your voucher!")
    },
  })

  const [editVoucher, editVaucherParams] = useMutation<EditVoucherData, EditVoucherVariables>(EDIT_VOUCHER, {
    onError: () => {
      displayErrorMessage("Sorry we cant update your voucher! Try again later.")
    },
    onCompleted: () => {
      displaySuccessNotification("You've successfully updated your voucher!")
    },
  })

  if (createVaucherParams.loading || editVaucherParams.loading) {
    return (
      <Content className="host-content">
        <div className="host__form-header">
          <Title level={3}>Please wait!</Title>
          <Text type="secondary">We're your query processing right now.</Text>
        </div>
      </Content>
    )
  }

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

  const handleCreateVoucher = (event: any) => {
    let values = event

    const input = {
      ...values,
      price: values.price * 100,
    }

    createVoucher({
      variables: {
        input,
      },
    })
  }
  const handleEditVoucher = (event: any) => {
    let values = event

    const input = {
      ...values,
      price: values.price * 100,
    }

    editVoucher({
      variables: {
        input,
      },
    })
  }
  return (
    <Content className="voucher-menu">
      {viewer.id ? (
        <Row gutter={24} style={{ display: "flex", justifyContent: "space-between" }}>
          <Col xs={24} lg={12}>
            <Form layout="vertical" onFinish={handleCreateVoucher}>
              <div className="host__form-header">
                <Title level={3} className="host__form-title">
                  Create a voucher!
                </Title>
                <Text type="secondary">You can create new voucher providing a data.</Text>
              </div>

              <Item
                label="Type"
                name="type"
                rules={[{ required: true, message: "CINEMA OR RESTAURANT OR MUSEUM OR CLUB" }]}
              >
                <Radio.Group>
                  <Radio.Button value="CINEMA">
                    <span>CINEMA</span>
                  </Radio.Button>
                  <Radio.Button value="RESTAURANT">
                    <span>RESTAURANT</span>
                  </Radio.Button>
                  <Radio.Button value="MUSEUM">
                    <span>MUSEUM</span>
                  </Radio.Button>
                  <Radio.Button value="CLUB">
                    <span>CLUB</span>
                  </Radio.Button>
                </Radio.Group>
              </Item>

              <Item label="Quantity" name="quantity" rules={[{ required: true, message: "Plesse enter quantity!" }]}>
                <InputNumber min={1} placeholder="4" />
              </Item>

              <Item
                label="Title"
                extra="Max character count of 45"
                name="title"
                rules={[{ required: true, message: "Plesse enter title!" }]}
              >
                <Input maxLength={45} placeholder="Cinema" />
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
                  Create
                </Button>
              </Item>
            </Form>
          </Col>
          <Col xs={24} lg={12}>
            <Form layout="vertical" onFinish={handleEditVoucher}>
              <div className="host__form-header">
                <Title level={3} className="host__form-title">
                  Edit a voucher!
                </Title>
                <Text type="secondary">Pass new data to modify the voucher.</Text>
              </div>

              <Item
                label="ID"
                extra="Enter ID of vaucher"
                name="id"
                rules={[{ required: true, message: "Plesse enter Id!" }]}
              >
                <Input maxLength={45} placeholder="Cinema" />
              </Item>

              <Item
                label="Home Type"
                name="type"
                rules={[{ required: true, message: "CINEMA OR RESTAURANT OR MUSEUM OR CLUB" }]}
              >
                <Radio.Group>
                  <Radio.Button value="CINEMA">
                    <span>CINEMA</span>
                  </Radio.Button>
                  <Radio.Button value="RESTAURANT">
                    <span>RESTAURANT</span>
                  </Radio.Button>
                  <Radio.Button value="MUSEUM">
                    <span>MUSEUM</span>
                  </Radio.Button>
                  <Radio.Button value="CLUB">
                    <span>CLUB</span>
                  </Radio.Button>
                </Radio.Group>
              </Item>

              <Item label="Quantity" name="quantity" rules={[{ required: true, message: "Plesse enter quantity!" }]}>
                <InputNumber min={1} placeholder="4" />
              </Item>

              <Item
                label="Title"
                extra="Max character count of 45"
                name="title"
                rules={[{ required: true, message: "Plesse enter title!" }]}
              >
                <Input maxLength={45} placeholder="Cinema" />
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
                  Update
                </Button>
              </Item>
            </Form>
          </Col>
        </Row>
      ) : null}
    </Content>
  )
}
