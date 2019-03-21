import React, { Component } from "react"
import CrawlList from "./containers/crawlList.js"
import "./App.css"

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
    return <CrawlList crawls={this.state.crawls} />
  }
}

export default App
