import React, { Component } from "react"
import { Form, Button } from "semantic-ui-react"
import PubList from "./pubList"
import { BrowserRouter, Route, Switch, Link } from "react-router-dom"

export default class crawlDetails extends Component {
  state = {
    placeSelected: false,
    placeInput: "",
    nameInput: "",
    startTimeInput: "19:00",
    endTimeInput: "23:00"
  }

  componentDidMount() {}

  getPubFromId = id => {
    return this.props.suggestedPubs.filter(pub => pub.four_id === id)[0]
  }

  getPubsFromIDs = array => {
    return array.map(pubId => this.getPubFromId(pubId))
  }

  render() {
    return (
      <>
        <Form style={{ width: 100 + "%", padding: 20 + "px" }}>
          <Form.Field>
            <label>Where is your Crawl</label>
            <input
              value={this.state.placeInput}
              onChange={event => {
                this.setState({ placeInput: event.target.value })
              }}
              placeholder="Name a city or area"
            />
          </Form.Field>
          {this.state.placeSelected ? (
            <>
              <Form.Field>
                <label>Please name your Crawl</label>
                <input
                  value={this.state.nameInput}
                  onChange={event => {
                    this.setState({ nameInput: event.target.value })
                  }}
                  placeholder="Name your crawl"
                />
              </Form.Field>
              <Form.Field>
                <label>Start Time:</label>
                <input
                  value={this.state.startTimeInput}
                  type="time"
                  onChange={event => {
                    this.setState({ startTimeInput: event.target.value })
                  }}
                />
              </Form.Field>
              <Form.Field>
                <label>End Time:</label>
                <input
                  value={this.state.endTimeInput}
                  type="time"
                  onChange={event => {
                    this.setState({ endTimeInput: event.target.value })
                  }}
                />
              </Form.Field>
            </>
          ) : (
            <Button
              type="submit"
              onClick={() => {
                this.props.handleClick(this.state.placeInput)
                this.setState({
                  placeSelected: true
                })
              }}
            >
              Submit
            </Button>
          )}
        </Form>
        {this.state.placeSelected ? (
          <div className="six wide column">
            <PubList
              removePubFromList={(pub) => this.props.removePubFromList(pub) }
              selectedPubs={this.props.selectedPubs}
              endTime={this.state.endTimeInput}
              startTime={this.state.startTimeInput}
            />
            
            <div className="ui centered grid" style={{ padding: 30 + "px" }}>
            <br></br>

            {
                this.props.selectedPubs.length > 0 ? 
            <Button
              as={Link}
              to="/"
              onClick={() =>
                this.props.saveCrawl({
                  name: this.state.nameInput,
                  start_time: this.state.startTimeInput,
                  end_time: this.state.endTimeInput,
                  order_array: this.props.selectedPubIDs.toString()
                })
              }
            >
              SAVE
            </Button>
            :
            null
            }
            </div>
          </div>
        ) : null}
      </>
    )
  }
}
