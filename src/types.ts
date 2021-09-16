
  export type unitNameType = "Imperial" | "Metric"
  export type unitButtonIndexType = 0 | 1
  export type weightLabelType = "lbs" | "kg"
  export type heightLabelType = "ft" | "m"
  export type stateType = {
    unitName: unitNameType, 
    unitButtonIndex: unitButtonIndexType,
    weightLabel: weightLabelType,
    heightLabel: heightLabelType,
    weight: string,
    height: string
  }
  export type fieldnameType = "Weight" | "Height"
  export type actionType = {type:unitNameType} | {type:fieldnameType, payload:string} | {type:"setData",payload:stateType}