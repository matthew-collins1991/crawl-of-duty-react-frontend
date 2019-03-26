import React, { Component } from "react"
import CrawlDetails from "../components/crawlDetails.js"
import MapContainer from "../components/mapContainer.js"
import PubList from "../components/pubList.js"
import "semantic-ui-react"

export default class CrawlContainer extends Component {
  state = {
    suggestedPubs: [],
    selectedPubIDs: [],
    coords: {
        lat: 51.84,
        lng: -0.12
    },
    crawlName: "",
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
          suggestedPubs: resp.response.groups[0].items
        })
      ).then(() => this.recenterMap())
    
  }

  getPubFromId = id => {
    return this.state.suggestedPubs.filter(pub => pub.venue.id === id)[0]
  }

  getPubsFromIDs = array => {
    return array.map(pubId => this.getPubFromId(pubId))
  }

  addLocation = data => {
    console.log(data.name)
  }

  addToSelectedPubIDs = id => {
    this.setState({
      selectedPubIDs: [...this.state.selectedPubIDs, id]
    })
  }

  recenterMap = () => {
    const { lat, lng } = this.state.suggestedPubs[0].venue.location
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
            selectedPubIDs={this.state.selectedPubIDs}
          />
        </div>

        
          <div className="ten wide column">
            <MapContainer
              zoom={this.state.zoom}
              coords={this.state.coords}
              suggestedPubs={this.state.suggestedPubs}
              selectedPubs={this.getPubsFromIDs(this.state.selectedPubIDs)}
              selectedPubIDs={this.state.selectedPubIDs}
              addLocation={this.addLocation}
              addToSelectedPubIDs={this.addToSelectedPubIDs}
            />
          </div>
        </div>

    )
  }
}
