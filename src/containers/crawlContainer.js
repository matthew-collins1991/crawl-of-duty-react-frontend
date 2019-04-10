import React, { Component } from "react"
import CrawlDetails from "../components/crawlDetails.js"
import MapContainer from "../components/mapContainer.js"
import "semantic-ui-react"
import "../CrawlContainer.css"


export default class CrawlContainer extends Component {
  state = {
    filter: false,
    crawl: undefined,
    suggestedPubs: [],
    selectedPubs: [],
    coords: {
      lat: 51.84,
      lng: -0.12
    },
    zoom: 8
  }

  componentDidMount() {
    if (this.props.id) {
      this.getCrawlFromId(this.props.id).then(crawl =>
        this.setState({
          filter: true,
          selectedPubs: crawl.pubs,
          selectedPubIDs: crawl.pubs.map(pub => pub.four_id),
          suggestedPubs: crawl.pubs,
          crawl: crawl,
          coords: {
            lat: parseFloat(crawl.pubs[0].lat),
            lng: parseFloat(crawl.pubs[0].lng)
          },
          zoom: 15
        })
      )
    }
  }

  getPubIds = array => {
    return array.map(pub => pub.four_id)
  }

  getCrawlFromId = id => {
    const API = `https://crawl-of-duty-backend.herokuapp.com/api/v1/crawls/${id}`

    return fetch(API).then(res => res.json())
  }

  getPubsAPI = place => {
    const clientID = "5K2PO0TCBUH5ZKRLQQVZVYOV21JQSUVJ44T35142BHVUFKUI"
    const clientSecret = "GIZVTNTL3HOXRFIUDPT1O050GBPCKF3ZRPI3RMS5L0T4JD1M"

    const api = `https://api.foursquare.com/v2/venues/explore?client_id=${clientID}&client_secret=${clientSecret}&v=20180323&limit=50&near=${place}&section=drinks`

    fetch(api)
      .then(res => res.json())
      .then(resp =>
        this.setState({
          suggestedPubs: [
            ...this.state.suggestedPubs,
            ...this.convertPubs(
              resp.response.groups[0].items.map(item => item.venue)
            )
          ]
        })
      )
      .then(() => this.recenterMap())
  }

  saveCrawl = crawl => {
    const API = "https://crawl-of-duty-backend.herokuapp.com/api/v1/crawls"
    const newCrawl = {
      crawl: crawl,
      pubs: this.state.selectedPubs
    }

    return fetch(API, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newCrawl)
    }).then(resp => resp.json())
    // .then(res => res.json())
    // .then(res =>
    //   this.state.selectedPubs.forEach(pub => {
    //     this.savePub(pub, res)
    //   })
    // )
  }

  savePub = (pub, crawl) => {
    const API = "https://crawl-of-duty-backend.herokuapp.com/api/v1/pubs"
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

  addToSelectedPubs = id => {
    this.setState({
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
  }

  // delete pub from selected list
  removePubFromList = pub => {
    this.setState({
      selectedPubs: this.state.selectedPubs.filter(
        Selectedpub => Selectedpub.four_id !== pub.four_id
      )
    })
  }

  // this will control what is filtered
  toggleFilter = () => {
    this.setState({
      filter: !this.state.filter
    })

    if (this.state.suggestedPubs.length === this.state.selectedPubs.length) {
      this.getPubsAPI(this.state.crawl.location)
    }
  }

  render() {
    return (
    <div id ="crawlContainer-div">
      <div className="ui grid">
        <div className="six wide column">
          <CrawlDetails
            crawl={this.state.crawl}
            handleClick={this.getPubsAPI}
            suggestedPubs={this.state.suggestedPubs}
            crawlPubs={this.state.suggestedPubs}
            selectedPubs={this.state.selectedPubs}
            selectedPubIDs={this.getPubIds(this.state.selectedPubs)}
            saveCrawl={this.saveCrawl}
            savePub={this.savePub}
            removePubFromList={this.removePubFromList}
            toggleFilter={this.toggleFilter}
            filter={this.state.filter}
            history={this.props.history}
          />{" "}
        </div>

        <div className="ten wide column map-container">
          <MapContainer
            zoom={this.state.zoom}
            coords={this.state.coords}
            suggestedPubs={this.state.suggestedPubs}
            selectedPubs={this.state.selectedPubs}
            selectedPubIDs={this.getPubIds(this.state.selectedPubs)}
            addLocation={this.addLocation}
            addToSelectedPubIDs={this.addToSelectedPubs}
            filter={this.state.filter}
          />
        </div>
      </div>
      </div>
    )
  }
}
