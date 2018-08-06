import React, {Component} from 'react'
import {Image, Item, List, Card, Modal, Button} from 'semantic-ui-react'

class plantCard extends Component {
  constructor() {
    super()
    this.state = {
      currentDate: new Date()
    }
  }

  async componentDidMount() {
    await this.setState({
      currentDate: this.props.currentDate
    })
  }
  async componentWillReceiveProps() {
    await this.setState({
      currentDate: this.props.currentDate
    })
  }
  
  render() {
    console.log('props.plant from plantCard', this.props.plant)
    let upcomingTasks = this.props.plant.schedule
    let plantDate = this.props.plant.Gardens[0].PlantGarden.plantDate
    plantDate = new Date(plantDate)
    const plantTime = plantDate.getTime()
  
    const currentTime = this.state.currentDate.getTime()
    upcomingTasks = JSON.parse(upcomingTasks)
    upcomingTasks = upcomingTasks.filter(task => {
      console.log("task time", plantTime + task.time, "due date", 604800000 + currentTime)
      return plantTime + task.time > currentTime && plantTime + task.time < 604800000 + currentTime
    })

    return (
      <Card>
        <Card.Content>
          <Image src={this.props.plant.imageUrl} />
          <Card.Header>{this.props.plant.name}</Card.Header>
          <Card.Meta>
            <List as="ul">
              {upcomingTasks.map(task => (
                <List.Item as="li">{task.task}</List.Item>
              ))}
            </List>
            <Modal
              trigger={<Button className="add-plants-btn">More</Button>}
            >
              <Modal.Header>
                <Image className="card-img" src={this.props.plant.imageUrl} />
                {this.props.plant.name}
              </Modal.Header>
              <Modal.Content>
                <Modal.Description>
                  <List as="ul">
                    {upcomingTasks.map(task => {
                      const taskTime = task.time + plantTime
                      const taskDate = new Date(taskTime)
                      const day = taskDate.getDate()
                      const month = taskDate.getMonth() + 1
                      const year = taskDate.getFullYear()
                      return (
                        <li>
                          {month}/{day}/{year}: {task.task}
                        </li>
                      )
                    })}
                  </List>
                  <Button className="add-plants-btn">Remove Plant</Button>
                </Modal.Description>
                <div className="clear" />
              </Modal.Content>
            </Modal>
          </Card.Meta>
        </Card.Content>
      </Card>

      // <Item.Group>
      //   <Item>
      //     <Item.Content>
      //       <Item.Header as='a'>{props.plant.name}</Item.Header>
      //       <Item.Meta>
      //         <List as='ul'>
      //           {upcomingTasks.map(task => (<List.Item as ='li'>{task.task}</List.Item>))}
      //         </List>
      //       </Item.Meta>
      //     </Item.Content>
      //   </Item>
      // </Item.Group>
    )
  }
}
export default plantCard
