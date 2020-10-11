import React, { useEffect, useRef, useState } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import * as serviceWorker from "./serviceWorker"
import ApolloClient from "apollo-boost"
import { ApolloProvider, useMutation } from "react-apollo"
import { Listings, Home, Host, Listing, Login, NotFound, User, AppHeader } from "./sections"
import "./styles/index.css"
import { Affix, Layout, Spin } from "antd"
import { Viewer } from "./lib/types"
import { LOG_IN } from "./lib/graphql/mutations"
import { LogIn as LogInData, LogInVariables } from "./lib/graphql/mutations/Login/__generated__/LogIn"
import { AppHeaderSkeleton, ErrorBanner } from "./lib/components"

const client = new ApolloClient({
  uri: "/api",
  request: async (operation) => {
    const token = sessionStorage.getItem("token")
    operation.setContext({
      headers: {
        "X-CSRF-TOKEN": token || "",
      },
    })
  },
})

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  seller: false,
  hasWallet: null,
  didRequest: false,
}

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer)

  const [logIn, { error }] = useMutation<LogInData, LogInVariables>(LOG_IN, {
    onCompleted: (data) => {
      if (data && data.logIn) {
        setViewer(data.logIn)

        if (data.logIn.token) {
          sessionStorage.setItem("token", data.logIn.token)
        } else {
          sessionStorage.removeItem("token")
        }
      }
    },
  })

  const logInRef = useRef(logIn)
  useEffect(() => {
    logInRef.current()
  }, [])

  if (!viewer.didRequest && !error) {
    return (
      <Layout className="app-skeleton">
        <AppHeaderSkeleton />
        <div className="app-skeleton__spin-section">
          <Spin size="large" tip="Launching App" />
        </div>
      </Layout>
    )
  }

  const logInErrorBannerElement = error ? <ErrorBanner description="Auth error on client!" /> : null

  return (
    <Router>
      <Layout id="app">
        {logInErrorBannerElement}
        <Affix offsetTop={0} className="app__affix-header">
          <AppHeader viewer={viewer} setViewer={setViewer} />
        </Affix>
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/host" component={Host} />
          <Route exact path="/listing/:id" component={Listing} />
          <Route exact path="/listings/:location?" component={Listings} />
          //? means optional
          <Route exact path="/user/:id" render={(props) => <User {...props} viewer={viewer} />} />
          <Route exact path="/login" render={(props) => <Login {...props} setViewer={setViewer} />} />
          <Route component={NotFound} />
        </Switch>
      </Layout>
    </Router>
  )
}

ReactDOM.render(
  <ApolloProvider client={client}>
    <App />
  </ApolloProvider>,
  document.getElementById("root")
)

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister()
