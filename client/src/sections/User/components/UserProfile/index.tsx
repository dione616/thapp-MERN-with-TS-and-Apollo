import React from "react"
import { User as UserData } from "../../../../lib/graphql/queries/User/__generated__/User"
import { Avatar, Card, Divider, Typography, Button } from "antd"

interface Props {
  user: UserData["user"] //access elem by types know as lookup types
  viewerIsUser: boolean
}

const { Paragraph, Text, Title } = Typography

const UserProfile: React.FC<Props> = ({ user, viewerIsUser }) => {
  const additionalDetailsSection = viewerIsUser ? (
    <div>
      <Divider />
      <div className="user_profile__details">
        <Title>Additional Details</Title>
      </div>
      <Paragraph>You'r the seller! Now you can host your own listing!</Paragraph>
    </div>
  ) : null

  return (
    <div className="user-profile">
      <Card className="user-profile__card">
        <div className="user-profile__avatar">
          <Avatar size={100} src={user.avatar} />
        </div>
        <Divider />
        <div className="user-profile__details">
          <Title level={4}>Detaile</Title>
          <Paragraph>
            Name:<Text strong>{user.name}</Text>
          </Paragraph>
          <Paragraph>
            Contact:<Text strong>{user.contact}</Text>
          </Paragraph>
        </div>
        {additionalDetailsSection}
      </Card>
    </div>
  )
}

export default UserProfile
