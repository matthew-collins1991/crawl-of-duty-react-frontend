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
            <div>
                <p>Crawl Container</p>
                <CrawlDetails />
                <MapContainer />
                <PubList />
            </div>
        )
    }
}