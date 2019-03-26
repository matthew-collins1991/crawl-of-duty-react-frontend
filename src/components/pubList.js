import React, { Component } from "react"

export default class PubList extends Component {
  state = {}

  componentDidMount() {}

  render() {
    return (
      <div>
        {this.props.selectedPubs.length > 0 ? (
          <h3>Your Crawl</h3>
        ) : (
          <h5>Add some pubs...</h5>
        )}
        {this.props.selectedPubs.map((pub, i) => (
          <p>
            {i + 1}. {pub.venue.name}
          </p>
        ))}
      </div>
    )
  }
}
