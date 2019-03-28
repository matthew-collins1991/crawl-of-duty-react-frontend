import React, { Component } from "react"
import { Menu } from "semantic-ui-react"
import { NavLink } from "react-router-dom"

export default class Nav extends Component {
  componentDidMount() {}

  render() {
    return (
      <div>
        <Menu style={{ paddingBottom: 10 + "px", paddingTop: 10 + "px" }}>
          <Menu.Item name="home" as={NavLink} to="/home" />
          <Menu.Item name="create-new" as={NavLink} to="/crawls/new" />
          <Menu.Menu position="right">
          <Menu.Item name="Sign-Out" as={NavLink} to="/" />
          </Menu.Menu>
        </Menu>
      </div>
    )
  }
}
