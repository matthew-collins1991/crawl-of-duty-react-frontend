import React, { Component } from 'react'
import CrawlDetails from "../components/crawlDetails.js"
import MapContainer from "../components/mapContainer.js"
import PubList from "../components/pubList.js"

export default class CrawlContainer extends Component {

    state = {

    }

    componentDidMount() {

    }

    render(){
        return(
            <div className="ui stackable two column grid">

                <div className="two wide column">
                    <CrawlDetails />
                </div>
                <div className="eight wide column">
                    <MapContainer />
                </div>
                <div className="eight wide column">
                    <PubList />
                </div>
            </div>
        )
    }
}


