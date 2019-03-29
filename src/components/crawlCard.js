import React from "react"
import { Card, Icon } from "semantic-ui-react"
import { Link } from "react-router-dom"
import "../crawlCard.css"



class CrawlCard extends React.Component {

  

  render() {
    return (
      
      <Card as={Link} to={`/crawls/${this.props.id}`} style={{padding: 5+"px"}}>
        {/* <Image
          src={`https://loremflickr.com/320/240/pub?random=${this.props.id}`}
        /> */}
        
        <Card.Content header={this.props.name} />
        <Card.Meta style={{paddingLeft: 5+"px"}}>{this.props.location.toUpperCase()}</Card.Meta>
        <Card.Content description={
        <>
        <ol>
            {this.props.pubs.slice(0, 5).map(pub => (
              <li key={pub.id}>{pub.name}</li>
            ))}
          </ol>
         { this.props.pubs.length > 5 ? <p>more...</p> : null}
          </>}
          /> 
          <Card.Content extra >
          <div style={{textAlign: "left", display: "inline-block"}}>
      <Icon name='clock' />
      <small>
             (
            {this.props.start_time.substr(11, 5)}-
            {this.props.end_time.substr(11, 5)})
          </small><p>{"   "}</p>
        </div>
        <div style={{textAlign: "left", display: "inline-flex"}}>
          <Icon name='beer' style={{paddingLeft: 20+"px"}}/>
      <small style={{paddingLeft: 15+"px"}}>
            QTY: {this.props.pubs.length}
          </small>
          </div>
    </Card.Content>
          
          
        
      </Card>
      
    )
  }

  static defaultProps = {}
}

export default CrawlCard
