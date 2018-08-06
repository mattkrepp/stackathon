import React, {Component} from 'react'
import {connect} from 'react-redux'
import PlantCard from './cards/plantCard'
import {Modal, Button, Form, Icon, List} from 'semantic-ui-react'
import {
  fetchPlantsByGarden,
  fetchPlants,
  addPlantToGarden
} from '../store/plant'

class Garden extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showModal: false,
      currentDate: new Date()
    }
    this.addPlant = this.addPlant.bind(this)
    this.addWeek = this.addWeek.bind(this)
    this.subtractWeek = this.subtractWeek.bind(this)
  }
  async componentDidMount() {
    const gardenId = this.props.user.GardenId
    await this.props.fetchPlantsByGarden(gardenId)
    await this.props.fetchPlants()
  }

  async addPlant(event) {
    const plantId = event.target.value
    const plantObj = this.props.plants.find(plant => plant.id === plantId)
    const gardenId = this.props.user.GardenId

    await this.props.addPlantToGarden(plantObj, gardenId)
    await this.props.fetchPlantsByGarden(gardenId)
  }
  async addWeek() {
    const currentTime = this.state.currentDate.getTime()
    const weekMs = 604800000
    const newDate = new Date(currentTime + weekMs)
    await this.setState({
      currentDate: newDate
    })
  }
  async subtractWeek() {
    const currentTime = this.state.currentDate.getTime()
    const weekMs = 604800000
    const newDate = new Date(currentTime - weekMs)
    await this.setState({
      currentDate: newDate
    })
  }
  render() {
    console.log('this.props.plants', this.props.plants)
    console.log(this.state.currentDate)
    const month = this.state.currentDate.getMonth()
    const day = this.state.currentDate.getDate()
    return (
      <div>
        <div>
          <h1>Current Garden</h1>
          <h3>
            Tasks for the week of {month + 1}/{day}:
          </h3>
          <div>
            <Button className="add-wk-btn" onClick={this.addWeek}>
              Next Week
            </Button>
            <Button className="add-wk-btn" onClick={this.subtractWeek}>
              Previous Week
            </Button>
          </div>
          {this.props.selectedPlants ? (
            this.props.selectedPlants.map(plant => (
              <PlantCard
                key={plant.id}
                plant={plant}
                currentDate={this.state.currentDate}
              />
            ))
          ) : (
            <h3>No plants in garden.</h3>
          )}
        </div>
        <div>
          <Modal
            open={this.state.showModal}
            trigger={
              <Button
                className="add-plants-btn"
                onClick={() => this.setState({showModal: true})}
              >
                Add Plants
              </Button>
            }
          >
            <Modal.Header>
              <div className="add-plant-header">Add Plants</div>
              <i
                id="exit-modal"
                className="modal-close window close icon"
                onClick={() => this.setState({showModal: false})}
              />
              <div className="clear" />
            </Modal.Header>
            <Modal.Content>
              <Modal.Description>
                <List as="ul">
                  {this.props.plants.map(plant => (
                    <li key={plant.id} value={plant.id} onClick={this.addPlant}>
                      {plant.name}
                    </li>
                  ))}
                </List>
              </Modal.Description>
              <div className="clear" />
            </Modal.Content>
          </Modal>
        </div>
      </div>
    )
  }
}

const mapDispatch = dispatch => ({
  fetchPlantsByGarden: gardenId => dispatch(fetchPlantsByGarden(gardenId)),
  fetchPlants: () => dispatch(fetchPlants()),
  addPlantToGarden: (plant, gardenId) =>
    dispatch(addPlantToGarden(plant, gardenId))
})

const mapState = state => ({
  user: state.user,
  selectedPlants: state.plants.selectedPlants,
  plants: state.plants.plants
})

export default connect(mapState, mapDispatch)(Garden)
