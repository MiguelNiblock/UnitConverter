import React, { useEffect, useContext } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import Input from '../components/input'
import { ButtonGroup, Button } from 'react-native-elements';
import {UnitContext} from "../context/unitContext"
import {unitNameType,unitButtonIndexType} from "../types"
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function form() {

  const { state, dispatch } = useContext(UnitContext);

  const unitNames:[unitNameType,unitNameType] = ["Imperial","Metric"]

  const changeUnits = (newIndex:unitButtonIndexType)=>{
    const unitName:unitNameType = unitNames[newIndex]
    dispatch({type:unitName})
  }

  const storeData = async () => {  
    try {    
      const jsonValue:string = JSON.stringify(state)
      await AsyncStorage.setItem('UnitConverter-State', jsonValue)  
    } catch (e) { console.error("Saving error:",e)  }
  }

  const getData = async () => {
    try {    
      const jsonValue = await AsyncStorage.getItem('UnitConverter-State')  
      const data = jsonValue != null ? JSON.parse(jsonValue) : null;
      dispatch({type:"setData",payload:data})
    } catch(e) { console.error("Error reading value:",e)}
  }
  
  useEffect(()=>{
    getData()
  },[])
  
  return (
    <View style={styles.container}>
      <Text style={styles.h1}>Unit Converter</Text>
      <Input 
        label={state.weightLabel}
        fieldname="Weight"
        amount={state.weight}
      />
      <Input 
        label={state.heightLabel}
        fieldname="Height"
        amount={state.height}
      />
      <ButtonGroup
        buttons={unitNames}
        selectedIndex={state.unitButtonIndex}
        onPress={changeUnits}
      />
      <Button
        title="Save"
        containerStyle={styles.button}
        onPress={storeData}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex:1,
    justifyContent:"center"
  },
  h1: {
    fontSize: 40,
    marginTop:30,
    marginBottom:40,
    alignSelf:'center'
  },
  button: {
    width: "45%",
    margin: 25,
    alignSelf:'center'
  }
})
