import * as actions from './actionTypes';

export const getLocation =(coordinate)=>{
  return {
    type:actions.select_location,
    payload:coordinate,
  }
}