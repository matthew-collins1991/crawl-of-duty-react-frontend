import React, { Component } from 'react'
import { Form, Button } from "semantic-ui-react"

export default class PubList extends Component {

    state = {

    }

    componentDidMount() {

    }

    render(){
        return(
            
            <Form style={{width: 100 + '%', padding: 20 + 'px'}}>
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
        
        )
    }
}