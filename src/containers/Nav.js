import React, { Component } from 'react'
import {  Menu,  Dropdown, Button, Form } from 'semantic-ui-react'

export default class Nav extends Component {

    state = {
        activeItem: 'home'
    }

    handleItemClick = (e, { name }) => {
        
        this.setState({ 
            activeItem: name 
        })
        this.props.updateViewing(name)
    }
        

    componentDidMount() {

    }

    render(){
        return(
    <div>
        <Menu pointing>
          <Menu.Item 
            name='home' 
            active={this.state.activeItem === 'home'} 
            onClick={this.handleItemClick} />
          <Menu.Item
            name='create-new'
            active={this.state.activeItem === 'create-new'}
            onClick={this.handleItemClick}
          />
          <Menu.Item
            name='contact'
            active={this.state.activeItem === 'contact'}
            onClick={this.handleItemClick}
          />
          <Menu.Menu position='right'>
            <Menu.Item>
            <Dropdown item text='Login'>
                <Dropdown.Menu>
                <Form style={{width: 300 + 'px', padding: 20 + 'px'}}>
                    <Form.Field>
                        <label>First Name</label>
                        <input placeholder='First Name' />
                    </Form.Field>
                    <Form.Field>
                        <label>Last Name</label>
                        <input placeholder='Last Name' />
                    </Form.Field>

                    <Button type='submit'>Submit</Button>
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