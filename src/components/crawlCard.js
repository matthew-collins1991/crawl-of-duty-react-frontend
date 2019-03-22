import React from "react"
import { Card } from "semantic-ui-react"

class CrawlCard extends React.Component {
  render() {
    return (
      <Card color="red">
        <p>{this.props.name}</p>
        <ul>
          {this.props.pubs.map(pub => (
            <li key={pub.id}>{pub.name}</li>
          ))}
        </ul>
      </Card>
    )
  }

  static defaultProps = {}
}

export default CrawlCard
