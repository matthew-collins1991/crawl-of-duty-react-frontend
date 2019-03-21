import React from "react"

class Crawl extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.name}</p>
        <ul>
          {this.props.pubs.map(pub => (
            <li key={pub.id}>{pub.name}</li>
          ))}
        </ul>
      </div>
    )
  }

  static defaultProps = {}
}

export default Crawl
