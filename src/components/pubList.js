import React, { Component } from "react"
import { Header, Image, Table, Button } from 'semantic-ui-react'





export default class PubList extends Component {
  state = {
      hours: undefined,
      minutes: undefined
  }

  componentWillReceiveProps() {
    this.splitTime(this.props.endTime,this.props.startTime)
}

splitTime = (end, start) => {
let endTime = end.split(':')
let numEndTime = endTime.map(time => parseInt(time))
let startTime = start.split(':')
let numStartTime = startTime.map(time => parseInt(time))

this.getHours(numEndTime[0],numStartTime[0])
this.getMinutes(numEndTime[1],numStartTime[1])

}

getHours = (end,start) => {
    let calcHours = 0
    if(end <= start){
        calcHours = 24 - start + end
        console.log(calcHours)
    } else{
        calcHours = end - start
        console.log(calcHours)
    }
    this.setState({
        hours: calcHours
    })
}

getMinutes = (end,start) => {
    let calcMins = 0
    if(end <= start){
        calcMins = start - end
        console.log(calcMins)
    } else{
        calcMins = end - start
        console.log(calcMins)
    }
    this.setState({
        minutes: calcMins
    })
}


  render() {
    return (
        
      <div className = 'eight wide column'>
      <br></br>
        {this.props.selectedPubs.length === 0 ? (
            <div className= 'ui centered two column grid'>
          <h5>Click on the map to add your first pub!</h5>
          </div>
        ) : (
<div className="ui centered two column grid">
<Table basic='very' celled collapsing>
    <Table.Header>
    <Table.Row>
        <Table.HeaderCell>Enter Time</Table.HeaderCell>
        <Table.HeaderCell>Pub Name</Table.HeaderCell>
    </Table.Row>
    </Table.Header>
    <Table.Body>

        {this.props.selectedPubs.map((pub, i) => (
        <Table.Row>
        <Table.Cell>{this.state.hours}</Table.Cell>
        <Table.Cell>
          <Header as='h4' image>
            <Image src='https://cdn2.iconfinder.com/data/icons/harry-potter-colour-collection/60/32_-_Harry_Potter_-_Colour_-_Butterbeer-32.png' rounded size='mini' />
            <Header.Content>
              {pub.name}
            </Header.Content>
          </Header>
        </Table.Cell>
        
      </Table.Row>
        ))}
    </Table.Body>
</Table>
</div>
    )
  }
  </div>
    )}

}

