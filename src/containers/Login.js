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
                <label>UserName</label>
                <input placeholder="First Name" value="MattCollins1991"/>

            </Form.Field>
            <Form.Field>
                <label>Password</label>
                <input placeholder="Password" type="password" value="London"/>
            </Form.Field>

            <Button className="ui submitbutton centered column" type="submit" as={NavLink} to="/home">Submit</Button>
            </Form>
            </div>
        </div>
      </div>
    )
  }
}
