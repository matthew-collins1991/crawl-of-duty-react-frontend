import React from "react"
import { Card, Image } from "semantic-ui-react"

class CrawlCard extends React.Component {
  render() {
    return (
      <Card>
        <Image src="http://www.samtrans.com/Assets/SamTrans/Timetables/RB121/Maps/Route+61_2016_08-07.png" />
        <div className="content">
          <a className="header">{this.props.name}</a>
          <ul>
            {this.props.pubs.map(pub => (
              <li key={pub.id}>{pub.name}</li>
            ))}
          </ul>
          <p>⭐⭐⭐⭐⭐</p>
        </div>
      </Card>
    )
  }

  static defaultProps = {}
}

export default CrawlCard
