import React, { Component } from "react"
import { Image } from "semantic-ui-react"
import { Map, GoogleApiWrapper, InfoWindow, Marker } from "google-maps-react"
import CurrentLocation from "./map"

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
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
              
            />
          )
        })}

        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}
          onClose={this.onClose}
        >
          
            <h4>{this.state.selectedPlace.name}</h4>
            <button onClick={console.log('hi')}>log bar</button>
          

        </InfoWindow>
      </CurrentLocation>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB67HJnfJOIlyBoeagBpfvIzXniJaql1dA"
})(MapContainer)
