import React, { createContext, useReducer, Dispatch } from 'react';
import {stateType,actionType} from "../types"

const defaultValue = "0"

const initialState: stateType = {
  unitName: "Imperial",
  unitButtonIndex: 0,
  weightLabel: "lbs",
  heightLabel: "ft",
  weight: defaultValue,
  height: defaultValue,
}

const UnitContext = createContext<{
  state: stateType;
  dispatch: Dispatch<actionType>;
}>({
  state: initialState,
  dispatch: () => null
});

const reducer = (state:stateType, action:actionType) => {
  console.log('reducer invoked')
  switch (action.type){

    case "Imperial":{
      const newWeight:number = parseFloat(state.weight) / 0.45359237
      const newHeight:number = parseFloat(state.height) / 0.3048
      return {...state,
        unitName:"Imperial",
        unitButtonIndex:0,
        weightLabel:"lbs",
        heightLabel:"ft",
        weight: newWeight? (newWeight).toPrecision() : defaultValue, 
        height: newHeight? (newHeight).toPrecision() : defaultValue
      } as stateType
    }

    case "Metric": {
      const newWeight:number = parseFloat(state.weight) * 0.45359237
      const newHeight:number = parseFloat(state.height) * 0.3048
      return {...state,
        unitName:"Metric",
        unitButtonIndex:1,
        weightLabel:"kg",
        heightLabel:"m",
        weight: newWeight? (newWeight).toPrecision() : defaultValue,
        height: newHeight? (newHeight).toPrecision() : defaultValue
      } as stateType
    }

    case "Weight":{
      return {...state,
        weight: action.payload
      } as stateType
    }

    case "Height":{
      return {...state,
        height: action.payload
      } as stateType
    }

    case "setData": {
      console.log('setData case in reducer')
      return action.payload
    }

    default:
      return state
  }
};

const UnitProvider = ({children}: {children:JSX.Element}) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <UnitContext.Provider value={{state, dispatch}}>
      {children}
    </UnitContext.Provider>
  )
}
export { UnitProvider, UnitContext };