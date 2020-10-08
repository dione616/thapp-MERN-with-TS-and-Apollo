import React, { useEffect, useRef } from "react"
import { Card, Layout, Typography, Spin } from "antd"
import { Viewer } from "../../lib/types"
import { useApolloClient, useMutation } from "@apollo/react-hooks"
import { AUTH_URL } from "../../lib/graphql/queries"
import { LOG_IN } from "../../lib/graphql/mutations"
import { AuthUrl as AuthUrlData } from "../../lib/graphql/queries/AuthUrl/__generated__/AuthUrl"
import { LogIn as LogInData, LogInVariables } from "../../lib/graphql/mutations/Login/__generated__/LogIn"
import { ErrorBanner } from "../../lib/components"
import { displayErrorMessage, displaySuccessNotification } from "../../lib/utils"
import { Redirect } from "react-router-dom"

const { Content } = Layout
const { Text, Title } = Typography

interface Props {
  setViewer: (viewer: Viewer) => void
}

export const Login: React.FC<Props> = ({ setViewer }) => {
  const client = useApolloClient()
  const [logIn, { data: LogInData, loading: logInLoading, error: logInError }] = useMutation<LogInData, LogInVariables>(
    LOG_IN,
    {
      onCompleted: (data) => {
        if (data && data.logIn) {
          setViewer(data.logIn)
          displaySuccessNotification("You have successfully logged in!")
        }
      },
    }
  )

  const loginRef = useRef(logIn)
  useEffect(() => {
    const code = new URL(window.location.href).searchParams.get("code") //retrurn valuea from href

    if (code) {
      loginRef.current({
        variables: {
          input: { code },
        },
      })
    }
  }, [])

  const handleAuthorize = async () => {
    try {
      const { data } = await client.query<AuthUrlData>({
        query: AUTH_URL,
      })
      window.location.href = data.authUrl
    } catch (error) {
      displayErrorMessage("Sorry. Wawern't able to log you in. Please try  again later!")
    }
  }

  if (logInLoading) {
    return (
      <Content>
        <Spin size="large" tip="Loading you in..." />
      </Content>
    )
  }

  if (LogInData && LogInData.logIn) {
    const { id: viewerId } = LogInData.logIn
    return <Redirect to={`/user/${viewerId}`} />
  }

  const logInErrorBannerElement = logInError ? (
    <ErrorBanner description="Sorry! Wawern't able to log you in. Please try  again later!" />
  ) : null

  return (
    <Content className="log-in">
      {logInErrorBannerElement}
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
        <button className="log-in-card__google-button" onClick={handleAuthorize}>
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
