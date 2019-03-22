import React from "react"
import CrawlCard from "../components/crawlCard.js"

class CrawlCardList extends React.Component {
  render() {
    return this.props.crawls.map(crawl => (
      <CrawlCard key={crawl.id} {...crawl} />
    ))
  }

  static defaultProps = {}
}

export default CrawlCardList
