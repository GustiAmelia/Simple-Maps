import * as actions from '../actions/actionTypes';

const initialState = {
  selectLocation : []
};

const locationReducers = (state = initialState, action)=>{
  switch(action.type){
    case actions.select_location:
      return {
        ...state,
        selectLocation : state.selectLocation.concat(action.payload)
      }
    default:
      return state
  }
}

export default locationReducers;