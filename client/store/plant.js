import axios from 'axios'
import history from '../history'

const FETCH_ALL_PLANTS = 'FETCH_ALL_PLANTS';
const FETCH_PLANTS_BY_GARDEN = 'FETCH_PLANTS_BY_GARDEN';
const ADD_PLANT_TO_GARDEN = 'ADD_PLANT_TO_GARDEN';

const fetchPlantsThunk = (plants) => ({type: FETCH_ALL_PLANTS, plants}) 
const fetchPlantsGardenThunk = (plants) => ({type: FETCH_PLANTS_BY_GARDEN, plants})
const addPlantToGardenThunk = (plant) => ({type: ADD_PLANT_TO_GARDEN, plant})

export const fetchPlants = () => async dispatch => {
  try {  
    let plants = await axios.get('/api/plants');
    // plants = JSON.parse(plants);
    plants = plants.data;
    dispatch(fetchPlantsThunk(plants))
  } catch (err) {
    console.error(err);
  }
}

export const fetchPlantsByGarden = gardenId => async dispatch => {
  try {  
    let plants = await axios.get(`/api/plants/${gardenId}`);
    plants = plants.data;
    dispatch(fetchPlantsGardenThunk(plants))
  } catch (err) {
    console.error(err);
  }
}

export const addPlantToGarden = (plant, gardenId) => async dispatch => {
  try {
    await axios.post(`/api/plants/addgarden/${plant.id}/${gardenId}`);
    dispatch(addPlantToGardenThunk(plant));
  } catch(err) {
    console.error(err);
  }
}


const defaultState = {plants: [], selectedPlants: []};

export default function(state = defaultState, action) {
  switch (action.type) {
    case FETCH_ALL_PLANTS:
      return ({...state, plants: action.plants})
    case FETCH_PLANTS_BY_GARDEN:
      return ({...state, selectedPlants: action.plants})
    case ADD_PLANT_TO_GARDEN:
      return ({...state, selectedPlants: [...state.selectedPlants, action.plant]})
    default:
      return state
  }
}


