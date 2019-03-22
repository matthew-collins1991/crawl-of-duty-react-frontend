import React, { Component } from "react"
import Index from "./containers/index.js"
import "./App.css"
import Nav from "./containers/Nav.js"
import CrawlContainer from "./containers/crawlContainer.js"

class App extends Component {
  render() {
    return(
      <div>
        <p>App Page</p>
      <Nav />
      <CrawlContainer />
      <Index />
      </div>
    )
  }
}

export default App
