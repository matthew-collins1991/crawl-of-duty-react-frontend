import React from "react"
import { Card, Image } from "semantic-ui-react"

class CrawlCard extends React.Component {
  render() {
    return (
      <Card link>
        <Image src="http://www.samtrans.com/Assets/SamTrans/Timetables/RB121/Maps/Route+61_2016_08-07.png" />
        <div className="content">
          <h3 className="header">{this.props.name}</h3>
          <ul>
            {this.props.pubs.map(pub => (
              <li key={pub.id}>{pub.name}</li>
            ))}
          </ul>
          <p>
            <span role="img">⭐⭐⭐⭐⭐</span>
          </p>
        </div>
      </Card>
    )
  }

  static defaultProps = {}
}

export default CrawlCard
