import React, { useState, FormEvent } from "react"
import { Link, Redirect, RouteComponentProps } from "react-router-dom"
import { useMutation } from "@apollo/react-hooks"
import { Button, Form, Input, InputNumber, Layout, Radio, Typography, Upload, Row, Col } from "antd"
import { Viewer } from "../../lib/types"
import {
  EditVoucher as EditVoucherData,
  EditVoucherVariables,
} from "../../lib/graphql/mutations/EditVoucher/__generated__/EditVoucher"
import { EDIT_VOUCHER } from "../../lib/graphql/mutations/EditVoucher"
import { displayErrorMessage, displaySuccessNotification } from "../../lib/utils"

interface MatchParams {
  id: string
}
interface Props {
  viewer: Viewer
}

const { Content } = Layout
const { Paragraph, Title, Text } = Typography
const { Item } = Form

export const VoucherEdit = ({ viewer, match }: Props & RouteComponentProps<MatchParams>) => {
  const [editVoucher, editVaucherParams] = useMutation<EditVoucherData, EditVoucherVariables>(EDIT_VOUCHER, {
    onError: () => {
      displayErrorMessage("Sorry we cant update your voucher! Try again later.")
    },
    onCompleted: () => {
      displaySuccessNotification("You've successfully updated your voucher!")
    },
  })

  if (editVaucherParams.loading) {
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

  if (editVaucherParams.data) {
    return <Redirect to={`/vouchers`} />
  }

  const handleEditVoucher = (event: any) => {
    let values = event

    const input = {
      ...values,
      price: values.price,
      id: match.params.id,
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
          <Col xs={24}>
            <Form layout="vertical" onFinish={handleEditVoucher}>
              <div className="host__form-header">
                <Title level={3} className="host__form-title">
                  Edit voucher!
                </Title>
                <Text type="secondary">Pass new data to modify the voucher.</Text>
              </div>

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
