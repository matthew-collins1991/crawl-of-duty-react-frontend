import React, { Component } from "react"
import { Button, Form } from "semantic-ui-react"
import { NavLink } from "react-router-dom"
import "../Login.css"

export default class Login extends Component {
  componentDidMount() {}

  render() {
    return (
    <div id="image-container">
        <div id="myModal" className="modal">
        <div className="modal-content">
        <h1>Login</h1>
            <Form style={{ width: 100 + "%", padding: 20 + "px" }} className="centered">
            <Form.Field>
                <label>First Name</label>
                <input placeholder="First Name" />
            </Form.Field>
            <Form.Field>
                <label>Last Name</label>
                <input placeholder="Last Name" />
            </Form.Field>

            <Button className="ui submitbutton centered column" type="submit" as={NavLink} to="/home">Submit</Button>
            </Form>
            </div>
        </div>
      </div>
    )
  }
}