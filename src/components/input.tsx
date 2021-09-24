import React,{useContext} from 'react';
import {
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { Input } from 'react-native-elements';
import {weightLabelType, heightLabelType, fieldnameType} from "../types"
import {UnitContext} from "../context/unitContext"

export type propsType = {
  fieldname:fieldnameType
  label:weightLabelType | heightLabelType
  amount: string
}

export default ({fieldname,label,amount}:propsType) => {

  const { state, dispatch } = useContext(UnitContext);

  const changeAmount = (newAmount:string) => {
    dispatch({type:fieldname,payload:newAmount})
  }

  return (
    <View style={styles.container}>
      <Input 
        keyboardType="decimal-pad"
        label={fieldname}
        containerStyle={styles.rneInputContainer}
        value={amount}
        onChangeText={changeAmount}
      />
      <Text style={styles.label}>{label}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection:'row',

  },
  rneInputContainer: {
    width: "85%"
  },
  label: {
    flex:1,
    fontSize: 18,
    alignSelf:'center'
  }
});