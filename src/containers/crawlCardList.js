import React from "react"
import CrawlCard from "../components/crawlCard.js"
import { Card } from "semantic-ui-react"

class CrawlCardList extends React.Component {
  render() {
    return (
      <Card.Group itemsPerRow={6}>
        {this.props.crawls.map(crawl => (
          <CrawlCard key={crawl.id} {...crawl} />
        ))}
      </Card.Group>
    )
  }

  static defaultProps = {}
}

export default CrawlCardList
