import React, { Component } from "react"
import { Image } from "semantic-ui-react"
import {
  Map,
  GoogleApiWrapper,
  InfoWindow,
  Marker,
  Polyline
} from "google-maps-react"
import CurrentLocation from "./map"

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  }

  getLinePath = () => {
    return this.props.selectedPubs.map(pub => {
      return { lat: pub.venue.location.lat, lng: pub.venue.location.lng }
    })
  }

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    })

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
      <CurrentLocation centerAroundCurrentLocation google={this.props.google}>
        {this.props.suggestedPubs.map(pub => {
          return (
            <Marker
              onClick={this.onMarkerClick}
              name={pub.venue.name}
              position={{
                lat: pub.venue.location.lat,
                lng: pub.venue.location.lng
              }}
              icon={
                this.props.selectedPubs.includes(pub)
                  ? "https://cdn2.iconfinder.com/data/icons/harry-potter-colour-collection/60/32_-_Harry_Potter_-_Colour_-_Butterbeer-20.png"
                  : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
              }
            />
          )
        })}

        <Polyline path={this.getLinePath()} />
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          <h4>{this.state.selectedPlace.name}</h4>
        </InfoWindow>
      </CurrentLocation>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB67HJnfJOIlyBoeagBpfvIzXniJaql1dA"
})(MapContainer)
