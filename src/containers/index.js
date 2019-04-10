import React from "react"
import CrawlCardList from "../containers/crawlCardList.js"
import "../index.css"

const API = "https://crawl-of-duty-backend.herokuapp.com/api/v1/crawls"

class Index extends React.Component {
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
    return (
    <div id="index-div">
    <CrawlCardList crawls={this.state.crawls.reverse()} />
    </div>
    )
  }
}

export default Index
