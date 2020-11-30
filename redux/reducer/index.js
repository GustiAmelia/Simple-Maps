import { combineReducers } from 'redux';
import locationReducers from './location';

const indexReducer = combineReducers({
    location : locationReducers
});

export default indexReducer;