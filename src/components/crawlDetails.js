import React, { Component } from "react";
import { Form, Button } from "semantic-ui-react";
import PubList from './pubList'

export default class crawlDetails extends Component {
  state = {
    placeSelected: false,
    placeInput: "",
    nameInput: "",
    startTimeInput: "19:00",
    endTimeInput: "23:00",
  };

  componentDidMount() {}

  getPubFromId = id => {
    return this.props.suggestedPubs.filter(pub => pub.venue.id === id)[0]
  }

  getPubsFromIDs = array => {
    return array.map(pubId => this.getPubFromId(pubId))
  }



  render() {
    return (
        <>
      <Form style={{ width: 100 + "%", padding: 20 + "px" }}>
      <Form.Field>
          <label>Please name your Crawl</label>
          <input
            value={this.state.nameInput}
            onChange={event => {
              this.setState({ nameInput: event.target.value });
            }}
            placeholder="Name your crawl"
          />
        </Form.Field>
        <Form.Field>
          <label>Where is your Crawl</label>
          <input
            value={this.state.placeInput}
            onChange={event => {
              this.setState({ placeInput: event.target.value });
            }}
            placeholder="Name a city or area"
          />
        </Form.Field>
        <Form.Field>
          <label>Start Time:</label>
          <input
            value={this.state.startTimeInput}
            type="time"
            onChange={event => {
              this.setState({ startTimeInput: event.target.value });
            }}
          />
        </Form.Field>
        <Form.Field>
          <label>End Time:</label>
          <input
            value={this.state.endTimeInput}
            type="time"
            onChange={event => {
              this.setState({ endTimeInput: event.target.value });
            }}
          />
        </Form.Field>
        {this.state.placeSelected ? (
          <>
            <Form.Field>
              <select className="ui fluid search dropdown" multiple="">
                <option value="">
                  Suggested Pubs ({this.props.suggestedPubs.length})
                </option>
                {this.props.suggestedPubs.map(pub => (
                  <option value={pub.venue.name}>{pub.venue.name}</option>
                ))}
              </select>
            </Form.Field>
          </>
        ) : <Button
        type="submit"
        onClick={() => {
          this.props.handleClick(this.state.placeInput);
          this.setState({
            placeSelected: true
          });
        }}
      >
        Submit
      </Button>}
      </Form>
{
    this.state.placeSelected ? 
    <div className="six wide column">
    <PubList
      selectedPubs={this.getPubsFromIDs(this.props.selectedPubIDs)}
    />
  </div> : null
}
       
     </>
    );
  }
}
