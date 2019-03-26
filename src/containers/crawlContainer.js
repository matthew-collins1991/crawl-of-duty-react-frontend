import React, { Component } from "react"
import CrawlDetails from "../components/crawlDetails.js"
import MapContainer from "../components/mapContainer.js"
import PubList from "../components/pubList.js"
import "semantic-ui-react"

export default class CrawlContainer extends Component {
  state = {
    suggestedPubs: [],
    selectedPubIDs: [],
    selectedPubs: [],
    coords: {
      lat: 51.84,
      lng: -0.12
    },
    zoom: 8
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
          suggestedPubs: this.convertPubs(
            resp.response.groups[0].items.map(item => item.venue)
          )
        })
      )
      .then(() => this.recenterMap())
  }

  saveCrawl = crawl => {
    const API = "http://localhost:3000/api/v1/crawls"

    return fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(crawl)
    })
      .then(res => res.json())
      .then(res =>
        this.state.selectedPubs.forEach(pub => {
          this.savePub(pub, res)
        })
      )
  }

  savePub = (pub, crawl) => {
    const API = "http://localhost:3000/api/v1/pubs"
    pub = { ...pub, crawl_id: crawl.id }
    return fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(pub)
    })
      .then(res => res.json())
      .then(res => console.log(res))
  }

  getPubFromId = id => {
    return this.state.suggestedPubs.filter(pub => pub.four_id === id)[0]
  }

  convertPub = fullPub => {
    let pub = {
      name: fullPub.name,
      four_id: fullPub.id,
      lat: fullPub.location.lat,
      lng: fullPub.location.lng
    }
    return pub
  }

  convertPubs = array => array.map(pub => this.convertPub(pub))

  getPubsFromIDs = array => {
    return array.map(pubId => this.getPubFromId(pubId))
  }

  addLocation = data => {
    console.log(data.name)
  }

  addToSelectedPubIDs = id => {
    this.setState({
      selectedPubIDs: [...this.state.selectedPubIDs, id],
      selectedPubs: [...this.state.selectedPubs, this.getPubFromId(id)]
    })
  }

  recenterMap = () => {
    const { lat, lng } = this.state.suggestedPubs[0]
    this.setState({
      zoom: 15,
      coords: {
        lat: lat,
        lng: lng
      }
    })
    console.log(this.state.coords)
  }

  render() {
    return (
      <div className="ui grid">
        <div className="six wide column">
          <CrawlDetails
            handleClick={this.getPubsAPI}
            suggestedPubs={this.state.suggestedPubs}
            crawlPubs={this.state.suggestedPubs}
            selectedPubs={this.state.selectedPubs}
            selectedPubIDs={this.state.selectedPubIDs}
            saveCrawl={this.saveCrawl}
            savePub={this.savePub}
          />
        </div>

        <div className="ten wide column">
          <MapContainer
            zoom={this.state.zoom}
            coords={this.state.coords}
            suggestedPubs={this.state.suggestedPubs}
            selectedPubs={this.state.selectedPubs}
            selectedPubIDs={this.state.selectedPubIDs}
            addLocation={this.addLocation}
            addToSelectedPubIDs={this.addToSelectedPubIDs}
          />
        </div>
      </div>
    )
  }
}
