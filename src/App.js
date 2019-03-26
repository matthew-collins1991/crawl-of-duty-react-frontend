import React, { Component } from "react"
import Index from "./containers/index.js"
import "./App.css"
import Nav from "./containers/Nav.js"
import CrawlContainer from "./containers/crawlContainer.js"
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom"

class App extends Component {
  state = {}

  render() {
    return (
      <div>
        <Router>
          <Nav />

          {/* <Switch> */}
          <>
            <Route exact path="/" component={Index} />
            
            <Route path="/crawls/new" component={CrawlContainer} />
            {/* </Switch> */}
          </>
        </Router>
      </div>
    )
  }
}

export default App
