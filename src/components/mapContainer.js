import React, { Component } from "react"
import {
  GoogleApiWrapper,
  Marker,
  Polyline,
  Map
} from "google-maps-react"
import InfoWindowEx from "./InfoWindowEx"

const style = {
    //   position: "absolute",
      width: "700px",
      height: "700px"
  }

export class MapContainer extends Component {
  
    state = {
    suggestedPubs: [],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    selectedID: ''
  }




  getLinePath = () => {
    return this.props.selectedPubs.map(pub => {
      return { lat: pub.venue.location.lat, lng: pub.venue.location.lng }
    })
  }

  onMarkerClick = (props, marker) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true,
      selectedID: props.id
    })
  }

  onClose = props => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  }

  render() {
    return (
        <Map
        google={this.props.google}
        style={style}
        initialCenter={
          this.props.coords
        }
        center = {
        this.props.coords
        }
        zoom={this.props.zoom}
        onClick={this.onMapClicked}
      >
        {this.props.suggestedPubs.map(pub => {
          return (
            <Marker
              onClick={this.onMarkerClick}
              name={pub.venue.name}
              id={pub.venue.id}
              position={{
                lat: pub.venue.location.lat,
                lng: pub.venue.location.lng
              }}
              icon={
                this.props.selectedPubIDs.includes(pub.venue.id)
                  ? "https://cdn2.iconfinder.com/data/icons/harry-potter-colour-collection/60/32_-_Harry_Potter_-_Colour_-_Butterbeer-32.png"
                  : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              }
            />
          )
        })}

        <Polyline path={this.getLinePath()} />

        <InfoWindowEx
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <div>
            <h4>{this.state.selectedPlace.name}</h4>
            <input
              type="button"
              value="Add to Crawl"
              onClick={() =>
                this.props.addToSelectedPubIDs(this.state.selectedID)
              }
            />
          </div>
        </InfoWindowEx>
        
      </Map>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB67HJnfJOIlyBoeagBpfvIzXniJaql1dA"
})(MapContainer)
