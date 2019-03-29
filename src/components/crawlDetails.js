import React, { Component } from "react"
import { Form, Button } from "semantic-ui-react"
import PubList from "./pubList"

export default class crawlDetails extends Component {
  state = {
    placeSelected: false,
    placeInput: "",
    nameInput: "",
    startTimeInput: "19:00",
    endTimeInput: "23:00"
  }

  componentDidUpdate() {
    if (this.props.crawl && this.state.placeSelected === false) {
      this.setState({
        placeSelected: true,
        placeInput: this.props.crawl.location,
        nameInput: this.props.crawl.name,
        startTimeInput: this.props.crawl.start_time.substr(11, 5),
        endTimeInput: this.props.crawl.end_time.substr(11, 5)
      })
    }
  }

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
          {!this.state.placeSelected ? (
            <Form.Field>
              <label style={{ color: "#FFFFFF" }}>Where is your Crawl</label>
              <input
                value={this.state.placeInput}
                onChange={event => {
                  this.setState({ placeInput: event.target.value })
                }}
                placeholder="Name a city or area"
              />
            </Form.Field>
          ) : null}
          {this.state.placeSelected ? (
            <>
              <Form.Field>
                <label style={{ color: "#FFFFFF" }}>Crawl Name</label>
                <input
                  maxlength={30}
                  value={this.state.nameInput}
                  onChange={event => {
                    this.setState({ nameInput: event.target.value })
                  }}
                  placeholder="Name your crawl"
                />
              </Form.Field>
              <Form.Field>
                <label style={{ color: "#FFFFFF" }}>Start Time:</label>
                <input
                  value={this.state.startTimeInput}
                  type="time"
                  onChange={event => {
                    this.setState({ startTimeInput: event.target.value })
                  }}
                />
              </Form.Field>
              <Form.Field>
                <label style={{ color: "#FFFFFF" }}>End Time:</label>
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
              removePubFromList={pub => this.props.removePubFromList(pub)}
              selectedPubs={this.props.selectedPubs}
              endTime={this.state.endTimeInput}
              startTime={this.state.startTimeInput}
            />

            <div className="ui centered grid" style={{ padding: 30 + "px" }}>
              <br />

              {this.props.selectedPubs.length > 0 ? (
                <>
                  <Button
                    onClick={() =>
                      this.props
                        .saveCrawl({
                          name: this.state.nameInput,
                          start_time: this.state.startTimeInput,
                          end_time: this.state.endTimeInput,
                          order_array: this.props.selectedPubIDs.toString(),
                          location: this.state.placeInput
                        })
                        .then(() => this.props.history.push("/home"))
                    }
                  >
                    SAVE
                  </Button>
                  <Button
                    toggle
                    active={this.props.filter}
                    onClick={this.props.toggleFilter}
                  >
                    {this.props.filter
                      ? "Show Suggested Pubs"
                      : "Hide Suggested Pubs"}
                  </Button>
                </>
              ) : null}
            </div>
          </div>
        ) : null}
      </>
    )
  }
}
