import React, { Component } from "react"
import { GoogleApiWrapper, Marker, Polyline, Map } from "google-maps-react"
import InfoWindowEx from "./InfoWindowEx"

const style = {
  //   position: "absolute",
  width: "100%",
  height: "93vh"
}

export class MapContainer extends Component {
  state = {
    suggestedPubs: [],
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    selectedID: ""
  }

  getLinePath = () => {
    return this.props.selectedPubs.map(pub => {
      return { lat: parseFloat(pub.lat), lng: parseFloat(pub.lng) }
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
        initialCenter={this.props.coords}
        center={this.props.coords}
        zoom={this.props.zoom}
        onClick={this.onMapClicked}
      >
        {this.props.filter === false
          ? this.props.suggestedPubs.map(pub => {
              return (
                <Marker
                  key={pub.four_id}
                  onClick={this.onMarkerClick}
                  name={pub.name}
                  id={pub.four_id}
                  position={{
                    lat: parseFloat(pub.lat),
                    lng: parseFloat(pub.lng)
                  }}
                  icon={
                    this.props.selectedPubIDs.includes(pub.four_id)
                      ? "https://cdn2.iconfinder.com/data/icons/harry-potter-colour-collection/60/32_-_Harry_Potter_-_Colour_-_Butterbeer-32.png"
                      : "http://maps.google.com/mapfiles/ms/icons/blue-dot.png"
                  }
                />
              )
            })
          : this.props.selectedPubs.map(pub => {
              return (
                <Marker
                  key={pub.four_id}
                  onClick={this.onMarkerClick}
                  name={pub.name}
                  id={pub.four_id}
                  position={{
                    lat: parseFloat(pub.lat),
                    lng: parseFloat(pub.lng)
                  }}
                  icon={
                    "https://cdn2.iconfinder.com/data/icons/harry-potter-colour-collection/60/32_-_Harry_Potter_-_Colour_-_Butterbeer-32.png"
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
