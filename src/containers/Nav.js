import React, { Component } from "react"
import { Menu, Dropdown, Button, Form, Image } from "semantic-ui-react"
import { BrowserRouter, Route, Switch, NavLink } from "react-router-dom"

export default class Nav extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Menu>
          <Menu.Item name="home" as={NavLink} to="/" />
          <Menu.Item name="create-new" as={NavLink} to="/crawls/new" />
          <Menu.Menu position="right">
            <Menu.Item>
              <Dropdown item text="Login">
                <Dropdown.Menu>
                  <Form style={{ width: 300 + "px", padding: 20 + "px" }}>
                    <Form.Field>
                      <label>First Name</label>
                      <input placeholder="First Name" />
                    </Form.Field>
                    <Form.Field>
                      <label>Last Name</label>
                      <input placeholder="Last Name" />
                    </Form.Field>

                    <Button type="submit">Submit</Button>
                  </Form>
                </Dropdown.Menu>
              </Dropdown>
            </Menu.Item>
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}
