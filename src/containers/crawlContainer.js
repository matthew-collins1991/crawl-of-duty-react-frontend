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
            <div class="ui stackable two column grid">
                
                <div class="sixteen wide column">
                    <CrawlDetails />
                </div>
                <div class="eight wide column">
                    <MapContainer />
                </div>
                <div class="eight wide column">
                    <PubList />
                </div>
            </div>
        )
    }
}


