import React, { Component } from "react"
import Index from "./containers/index.js"
import "./App.css"
import Nav from "./containers/Nav.js"
import CrawlContainer from "./containers/crawlContainer.js"

class App extends Component {

  state = {
    currentlyViewing: 'home'
  }

  updateViewing = (view) => {
    this.setState({
      currentlyViewing: view
    })
  }


  render() {
    return(
      <div>
        <p>App Page</p>
      <Nav updateViewing={(view) => this.updateViewing(view)}/>
      {
        this.state.currentlyViewing === 'home' ? 
        <Index /> 
        :
        <CrawlContainer />
      }
      </div>
    )
  }
}

export default App
