import React from "react"
import { Card, Image } from "semantic-ui-react"
import { BrowserRouter, Route, Switch, Link } from "react-router-dom"

class CrawlCard extends React.Component {
  render() {
    return (
      <Card as={Link} to={`/crawls/${this.props.id}`}>
        <Image
          src={`https://loremflickr.com/320/240/pub?random=${this.props.id}`}
        />
        <div className="content">
          <h3 className="header">{this.props.name}</h3>
          <small>{this.props.location.toUpperCase()}</small>
          <ol>
            {this.props.pubs.slice(0, 6).map(pub => (
              <li key={pub.id}>{pub.name}</li>
            ))}
          </ol>
          {this.props.pubs.length > 6 ? <p>more...</p> : null}
        </div>
      </Card>
    )
  }

  static defaultProps = {}
}

export default CrawlCard
