import {createStore,applyMiddleware} from 'redux';
import {persistStore, persistReducer} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';

import rpm from 'redux-promise-middleware';
import {createLogger} from 'redux-logger';

import indexReducer from '../redux/reducer/index';

const config = {
  key: 'root',
  storage: AsyncStorage,
};

let persistedReducer = persistReducer(config,indexReducer);

const logger = createLogger();
const enhancers = applyMiddleware(rpm,logger);

export default ()=>{
  let store = createStore(persistedReducer,enhancers);
  let persistore = persistStore(store);
  return {
    store,
    persistore,
  };
};
