import React, { useState } from "react"
import ReactDOM from "react-dom"
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"
import * as serviceWorker from "./serviceWorker"
import ApolloClient from "apollo-boost"
import { ApolloProvider } from "react-apollo"
import { Listings, Home, Host, Listing, Login, NotFound, User } from "./sections"
import "./styles/index.css"
import { Layout } from "antd"
import { Viewer } from "./lib/types"

const client = new ApolloClient({ uri: "/api" })

const initialViewer: Viewer = {
  id: null,
  token: null,
  avatar: null,
  hasWallet: null,
  didRequest: false,
}

const App = () => {
  const [viewer, setViewer] = useState<Viewer>(initialViewer)
  console.log(viewer)

  return (
    <Router>
      <Layout id="app">
        <Switch>
          <Route exact path="/" component={Home} />
          <Route exact path="/host" component={Host} />
          <Route exact path="/listing/:id" component={Listing} />
          <Route exact path="/listings/:location?" component={Listings} />
          //? means optional
          <Route exact path="/user/:id" component={User} />
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
