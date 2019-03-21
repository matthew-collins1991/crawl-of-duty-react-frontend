import React from "react"
import Crawl from "../components/crawl.js"

class CrawlList extends React.Component {
  render() {
    return this.props.crawls.map(crawl => <Crawl key={crawl.id} {...crawl} />)
  }

  static defaultProps = {}
}

export default CrawlList
