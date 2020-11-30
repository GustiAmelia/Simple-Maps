/**
 * @format
 */
import React from 'react';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

import {PersistGate} from 'redux-persist/integration/react';
import {Provider} from 'react-redux';

import configureStore from  './redux/store';

const {persistore,store} = configureStore();

const reactRedux = ()=>{
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistore}>
        <App/>
      </PersistGate>
    </Provider>
  );
};

AppRegistry.registerComponent(appName, () => reactRedux);

