import React, { Component } from "react"
import CrawlList from "./containers/crawlList.js"
import "./App.css"
import Nav from "./containers/Nav.js"
import CrawlContainer from "./containers/crawlContainer.js"

const API = "http://localhost:3000/api/v1/crawls"

class App extends Component {
  state = {
    crawls: []
  }

  componentDidMount() {
    fetch(API)
      .then(res => res.json())
      .then(crawls =>
        this.setState({
          crawls: crawls
        })
      )
  }

  render() {
    return(
      <div>
        <p>App Page</p>
      <Nav />
      <CrawlList crawls={this.state.crawls} />
      <CrawlContainer />
      </div>
    )
    
    
  }
}

export default App
