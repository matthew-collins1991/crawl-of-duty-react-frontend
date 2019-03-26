import React, { Component } from "react"
import "semantic-ui-react"

export default class PubList extends Component {
  state = {}

  componentDidMount() {}

  render() {
    return (
      <div className = 'eight wide column'>
        {this.props.selectedPubs.length > 0 ? (
          <h3>Your Crawl</h3>
        ) : (
          <h5>Click on the map to add your first pub!</h5>
        )}
        {this.props.selectedPubs.map((pub, i) => (
          <p>
            {i + 1}. {pub.name}
          </p>
        ))}
      </div>
    )
  }
}
