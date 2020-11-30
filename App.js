/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React,{useState,useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from 'react-native';

import MapView, {Marker} from 'react-native-maps';
import Geolocation from '@react-native-community/geolocation';
import {getLocation} from './redux/actions/location';

const App = () => {

  const selectLocation = useSelector((state)=>state.location.selectLocation);
 
  const dispatch = useDispatch()
  
  const [location, setLocation]= useState({
    latitude:0,
    longitude:0,
    error:null,
  })

  const [selectMarker, setSelectMarker]=useState(location);

  const handleButton = ()=>{
    dispatch(getLocation(selectMarker))
  }

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
    <>
    <View style={styles.container}>
      <MapView
        style={styles.map}
        region={{
          latitude: location.latitude,
          longitude: location.longitude,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}
        showsUserLocation
        onPress={(e)=>{setSelectMarker(e.nativeEvent.coordinate)}}
      >
      <Marker coordinate={selectMarker}
      />
      {selectLocation.length === 0 ? null :
      selectLocation.map((item,index)=>{
        return (
          <Marker coordinate={item} key={index}/>
        )
      })
      }
      </MapView>
    </View>
    <View style={styles.information}>
      <View style={styles.textInformation}>
        <Text style={styles.title}>Selected Coordinat</Text>
        <Text style={styles.text}>Latitude : {selectMarker.latitude}</Text>
        <Text style={styles.text}>Longitude :{selectMarker.longitude}</Text>
        <TouchableOpacity style={styles.button} onPress={handleButton}>
          <Text style={styles.textButton}>Save Coordinat</Text>
        </TouchableOpacity>
      </View>
    </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex:6,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
  information:{
    flex:2,
  },
  textInformation:{
    padding:10,
  },
  title:{
    fontSize:20,
  },
  text:{
    fontSize:16,
  },
  button:{
    marginTop:10,
    alignItems:'center',
    justifyContent:'center',
    backgroundColor:'pink',
    marginHorizontal:50,
    borderRadius:10,
    elevation:5,
  },
  textButton:{
    color:'white',
    fontWeight:'bold',
    lineHeight:35,
    fontSize:18,
  },
});

export default App;
