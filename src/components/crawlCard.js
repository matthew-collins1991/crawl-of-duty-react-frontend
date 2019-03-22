import React from "react"
import { Card } from "semantic-ui-react"

class CrawlCard extends React.Component {
  render() {
    return (
      <Card>
        <div className="content">
          <a className="header">{this.props.name}</a>
          <ul>
            {this.props.pubs.map(pub => (
              <li key={pub.id}>{pub.name}</li>
            ))}
          </ul>
        </div>
      </Card>
    )
  }

  static defaultProps = {}
}

export default CrawlCard
