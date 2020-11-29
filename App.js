/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,useEffect} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';

const App = () => {

  const [location, setLocation]= useState({
    latitude:0,
    longitude:0,
    error:null,
  })

  useEffect(()=>{
    Geolocation.getCurrentPosition(
      position =>{
        setLocation({
          ...location,
          latitude:position.coords.latitude,
          longitude:position.coords.longitude,
          error:null
        });
      },
      error => setLocation({
        error:error.message
      }),
      {enableHighAccuracy:true,timeout:20000, maximumAge:2000}
    )
  },[])
  return (
    <MapView
      style={styles.map}
      region={{
        latitude: location.latitude,
        longitude: location.longitude,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      }}
      showsUserLocation
      onPress={(e)=>{console.log(e.nativeEvent)}}
    >
    <Marker coordinate={location}
    />
    </MapView>
  );
};

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    height: 400,
    width: 400,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

export default App;
