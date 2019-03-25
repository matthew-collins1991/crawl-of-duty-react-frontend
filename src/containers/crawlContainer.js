import React, { Component } from "react"
import CrawlDetails from "../components/crawlDetails.js"
import MapContainer from "../components/mapContainer.js"
import PubList from "../components/pubList.js"

export default class CrawlContainer extends Component {
  state = {
    suggestedPubs: [],
    crawlPubs: [],
    selectedPubs: []
  }

  componentDidMount() {}

  getPubsAPI = place => {
    const clientID = "5K2PO0TCBUH5ZKRLQQVZVYOV21JQSUVJ44T35142BHVUFKUI"
    const clientSecret = "GIZVTNTL3HOXRFIUDPT1O050GBPCKF3ZRPI3RMS5L0T4JD1M"

    const api = `https://api.foursquare.com/v2/venues/explore?client_id=${clientID}&client_secret=${clientSecret}&v=20180323&limit=50&near=${place}&section=drinks`

    fetch(api)
      .then(res => res.json())
      .then(resp =>
        this.setState({
          suggestedPubs: resp.response.groups[0].items
        })
      )
  }

  addLocation = data => {
    console.log(data.name)
  }

  render() {
    return (
      <div className="ui stackable two column grid">
        <div className="eight wide column">
          <CrawlDetails
            handleClick={this.getPubsAPI}
            suggestedPubs={this.state.suggestedPubs}
            crawlPubs={this.state.suggestedPubs}
          />
        </div>

        <div className="row">
          <div className="ten wide column">
            <MapContainer
              suggestedPubs={this.state.suggestedPubs}
              selectedPubs={this.state.selectedPubs}
              addLocation={this.addLocation}
            />
          </div>
          <div className="six wide column">
            <PubList />
          </div>
        </div>
      </div>
    )
  }
}
