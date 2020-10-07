import React from "react"
import { Card, Layout, Typography } from "antd"

const { Content } = Layout
const { Text, Title } = Typography

export const Login = () => {
  return (
    <Content className="log-in">
      <Card className="log-in-card">
        <div className="log-in-card__intro">
          <Title level={3} className="log-in-card__intro-title">
            <span role="img" aria-label="wave">
              &#128257;
            </span>
          </Title>
          <Title level={3} className="log-in-card__intro-title">
            <span role="img" aria-label="wave">
              Login to app
            </span>
          </Title>
          <Text>Sign in with Google to start booking available rentals!</Text>
        </div>
        <button className="log-in-card__google-button">
          <span className="log-in-card__goole-button-logo">Sign in with Google</span>
        </button>
        <Text type="secondary">
          Note: ...Lorem ipsum dolor sit amet consectetur adipisicing elit. Temporibus natus reprehenderit sunt facere
          pariatur harum deleniti excepturi veniam autem accusantium molestias quis, sequi adipisci minima ut culpa sit
          consequuntur exercitationem?
        </Text>
      </Card>
    </Content>
  )
}
