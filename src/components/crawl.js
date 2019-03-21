import React from "react"

class Crawl extends React.Component {
  render() {
    return (
      <div>
        <p>{this.props.name}</p>
      </div>
    )
  }

  static defaultProps = {
    name: "test"
  }
}

export default Crawl
