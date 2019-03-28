import React from "react"
import CrawlCard from "../components/crawlCard.js"
import {
  Card,
  Form,
  Menu,
  Label
} from "semantic-ui-react"

class CrawlCardList extends React.Component {
  state = {
    locationSearch: "",
    pubNumberSearch: 0
  }

  filteredCrawls = () => {
    let numberFilter = this.props.crawls.filter(
      crawl => crawl.pubs.length >= this.state.pubNumberSearch
    )
    return numberFilter.filter(crawl =>
      crawl.location
        .toLowerCase()
        .includes(this.state.locationSearch.toLowerCase())
    )
  }

  render() {
    return (
      <div>
        <div style={{ paddingBottom: 5 + "px", paddingTop: 5 + "px" }}>
          <Menu>
            <Form style={{ marginLeft: 5 + "px", padding: 5 + "px" }}>
              <Form.Field inline>
                <Label pointing="right">Location Search</Label>
                <input
                  type="text"
                  placeholder="Location"
                  value={this.state.locationSearch}
                  onChange={event => {
                    this.setState({ locationSearch: event.target.value })
                  }}
                />
              </Form.Field>
            </Form>
            <Form style={{ marginLeft: 5 + "px", padding: 5 + "px" }}>
              <Form.Field inline>
                <Label pointing="right">Minimum Number of Pubs</Label>
                <input
                  type="Number"
                  placeholder={0}
                  value={this.state.pubNumberSearch}
                  onChange={event => {
                    this.setState({ pubNumberSearch: event.target.value })
                  }}
                />
              </Form.Field>
            </Form>
          </Menu>
        </div>
        <Card.Group>
          {this.filteredCrawls().map(crawl => (
            <CrawlCard key={crawl.id} {...crawl} />
          ))}
        </Card.Group>
      </div>
    )
  }

  static defaultProps = {}
}

export default CrawlCardList
