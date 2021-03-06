import React, { Component } from "react"
import { Header, Image, Table, Button } from "semantic-ui-react"

export default class PubList extends Component {
  state = {
    startTime: "19:01",
    endTime: "23:01",
    hours: 0,
    minutes: 0,
    totalMins: 0
  }

  componentDidMount() {
    this.getTime()
  }

  componentDidUpdate() {
    this.getTime()
  }

  getTime = () => {
    if (
      this.state.startTime === this.props.startTime &&
      this.state.endTime === this.props.endTime
    ) {
    } else {
      this.setState({
        startTime: this.props.startTime,
        endTime: this.props.endTime
      })
      this.splitTime(this.props.endTime, this.props.startTime)
    }
  }

  splitTime = (end, start) => {
    let endTime = end.split(":")
    let numEndTime = endTime.map(time => parseInt(time))
    let startTime = start.split(":")
    let numStartTime = startTime.map(time => parseInt(time))

    this.getHours(numEndTime[0], numStartTime[0])
    this.getMinutes(numEndTime[1], numStartTime[1])
  }

  getHours = (end, start) => {
    let calcHours = 0
    if (end <= start) {
      calcHours = 24 - start + end
    } else {
      calcHours = end - start
    }
    this.setState(
      {
        hours: calcHours
      },
      () => this.timePerPub()
    )
  }

  getMinutes = (end, start) => {
    let calcMins = 0
    if (end <= start) {
      calcMins = start - end
    } else {
      calcMins = end - start
    }
    this.setState({
      minutes: calcMins
    })
  }

  timePerPub = () => {
    let totalMins = this.state.hours * 60 + this.state.minutes
    this.setState({
      totalMins: totalMins
    })
  }

  pubEntryTime = i => {
    let minsToAdd = (this.state.totalMins / this.props.selectedPubs.length) * i
    var hours = minsToAdd / 60
    var rhours = Math.floor(hours)
    var minutes = (hours - rhours) * 60
    var rminutes = Math.round(minutes)
    let startTime = this.state.startTime.split(":")
    let numStartTime = startTime.map(time => parseInt(time))
    let newHour =
      numStartTime[0] + rhours >= 10
        ? `${numStartTime[0] + rhours}`
        : `0${numStartTime[0] + rhours}`
    let newMins =
      numStartTime[1] + rminutes >= 10
        ? `${numStartTime[1] + rminutes}`
        : `0${numStartTime[1] + rminutes}`
    if (newHour > 23) {
      newHour - 24 >= 10
        ? (newHour = `${newHour - 24}`)
        : (newHour = `0${newHour - 24}`)
      return `${newHour}:${newMins}`
    } else {
      return `${newHour}:${newMins}`
    }
  }

  render() {
    return (
      <div className="eight wide column" style={{color: "#FFFFFF"}}>
        <br />
        {this.props.selectedPubs.length === 0 ? (
          <div className="ui centered two column grid">
            <h5>Click on the map to add your first pub!</h5>
          </div>
        ) : (
          <div className="ui centered two column grid">
            <Table basic="very" celled collapsing>
              <Table.Header>
                <Table.Row >
                  <Table.HeaderCell style={{color: "#FFFFFF"}}>Enter Time</Table.HeaderCell>
                  <Table.HeaderCell style={{color: "#FFFFFF"}}>Pub Name</Table.HeaderCell>
                  <Table.HeaderCell style={{color: "#FFFFFF"}}>Remove</Table.HeaderCell>
                </Table.Row>
              </Table.Header>
              <Table.Body style={{color: "#FFFFFF"}}>
                {this.props.selectedPubs.map((pub, i) => (
                  <Table.Row>
                    <Table.Cell style={{color: "#FFFFFF"}}>
                      {this.props.selectedPubs.length === 0
                        ? this.state.totalMins
                        : this.pubEntryTime(i)}
                    </Table.Cell>
                    <Table.Cell>
                      <Header as="h4" image>
                        <Image
                          src="https://cdn2.iconfinder.com/data/icons/harry-potter-colour-collection/60/32_-_Harry_Potter_-_Colour_-_Butterbeer-32.png"
                          rounded
                          size="mini"
                        />
                        <Header.Content style={{color: "#FFFFFF"}}>{pub.name}</Header.Content>
                      </Header>
                    </Table.Cell>
                    <Table.Cell>
                      <Button onClick={() => this.props.removePubFromList(pub)}>
                        Delete
                      </Button>
                    </Table.Cell>
                  </Table.Row>
                ))}
              </Table.Body>
            </Table>
          </div>
        )}
      </div>
    )
  }
}
