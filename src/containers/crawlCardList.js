import React from "react"
import CrawlCard from "../components/crawlCard.js"

class CrawlCardList extends React.Component {
  render() {
    return (
      <div className="cardList">
        {this.props.crawls.map(crawl => (
          <CrawlCard key={crawl.id} {...crawl} />
        ))}
      </div>
    )
  }

  static defaultProps = {}
}

export default CrawlCardList
