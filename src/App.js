import React, { Component } from "react"
import Index from "./containers/index.js"
import "./App.css"
import Nav from "./containers/Nav.js"
import CrawlContainer from "./containers/crawlContainer.js"
import Login from "./containers/Login.js"
import { BrowserRouter as Router, Route, Switch } from "react-router-dom"


class App extends Component {
  state = {}

  render() {
    return (
      <div>
        <Router>
          <Nav />

          <Switch>
          <Route exact path="/" component={Login} />

            <Route exact path="/home" component={Index} />

            <Route path="/crawls/new" component={CrawlContainer} />

            <Route
              path="/crawls/:id"
              component={routerProps => {
                return (
                  <CrawlContainer
                    id={routerProps.match.params.id}
                    {...routerProps}
                  />
                )
              }}
            />
          </Switch>
        </Router>
      </div>
    )
  }
}

export default App
