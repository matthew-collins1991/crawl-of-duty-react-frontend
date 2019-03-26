import React, { Component } from "react"
import { Form, Button } from "semantic-ui-react"

export default class PubList extends Component {
  state = {
    placeSelected: false,
    placeInput: ""
  }

  componentDidMount() {}

  

  render() {
    return (
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
        <Button
          type="submit"
          onClick={() => this.props.handleClick(this.state.placeInput)}
        >
          Submit
        </Button>
            
            {
                this.state.placeSelected ? 
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
            <Button
            type="submit"
            onClick={() => this.props.handleClick(this.state.placeInput)}
          >
            Submit
          </Button>
          </>
        :
        null
        }
        
    
      </Form>
    )
  }
}
