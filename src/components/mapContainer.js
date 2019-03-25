import React, { Component } from "react"
import {
  GoogleApiWrapper,
  Marker,
  Polyline
} from "google-maps-react"
import CurrentLocation from "./map"
import InfoWindowEx from './InfoWindowEx'

export class MapContainer extends Component {
  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {}
  }

  getLinePath = () => {
    return this.props.suggestedPubs.map(pub => {
      return { lat: pub.venue.location.lat, lng: pub.venue.location.lng }
    })
  }

  onMarkerClick = (props, marker) => {

    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
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

  consoley = () => 
    console.log('hello')



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

        <Polyline path={this.getLinePath()} />

        <InfoWindowEx
        marker={this.state.activeMarker}
        visible={this.state.showingInfoWindow}
        onClose={this.onClose}>
        <div>
            <h4>{this.state.selectedPlace.name}</h4>
            <input type="button" value="Blah" onClick={() =>  console.log(this.state.activeMarker.name) }/>
            </div>
        </InfoWindowEx>
        
      </CurrentLocation>
    )
  }
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyB67HJnfJOIlyBoeagBpfvIzXniJaql1dA"
})(MapContainer)
