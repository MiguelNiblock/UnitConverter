import 'react-native';
import React from 'react';
import App from '../App';
import Form from '../src/screens/form';
import Input,{propsType as inputProps} from '../src/components/input';
import renderer from 'react-test-renderer';
import { render, fireEvent } from '@testing-library/react-native';
import {UnitProvider,defaultValue,initialState} from '../src/context/unitContext'
import { ButtonGroup, Button } from 'react-native-elements';
import { Input as rneInput } from 'react-native-elements';



describe('Component snapshots',()=>{

  it('renders App correctly', () => {
    const tree = renderer.create(<App />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders Form correctly', ()=>{
    const tree = renderer.create(<Form />).toJSON();
    expect(tree).toMatchSnapshot();
  })  

  it('renders Input correctly', ()=>{
    const tree = renderer.create(<Input fieldname={"Height"} label={"ft"} amount={'20'} />).toJSON();
    expect(tree).toMatchSnapshot();
  })

})

describe('Initial config', ()=>{

  it('gives Input the right values', ()=>{
    const tree = renderer.create(<Input fieldname={"Height"} label={"ft"} amount={'20'} />);
    expect(tree.root.props.fieldname).toBe('Height');
    expect(tree.root.props.label).toBe('ft');
    expect(tree.root.props.amount).toBe('20');    
  })
  
})

describe('User interaction', ()=>{

  it('changes units correctly', ()=>{
    // const { container } = render(<App />);
    const {container} = render(<Form />,{wrapper: UnitProvider});
    let props;
    // const inputs = container.findAllByType(Input)
    // inputs.forEach(i=>console.log(i.props));

    //Weight initial
    const weight = container.findByProps({fieldname:'Weight'})
    // console.log(height);
    props = weight.props as inputProps
    expect(props.amount).toBe(defaultValue);
    expect(props.label).toBe(initialState.weightLabel);

    //Weight change input
    const weightInput = weight.findByType(rneInput);
    // console.log(heightInput);
    fireEvent(weightInput,'onChangeText','1');
    // console.log(height.props)
    props = weight.props as inputProps;
    expect(props.amount).toBe('1');

    //Height initial
    const height = container.findByProps({fieldname:'Height'});
    props = height.props as inputProps;
    expect(props.amount).toBe(defaultValue);
    expect(props.label).toBe(initialState.heightLabel);

    //Height change input
    const heightInput = height.findByType(rneInput);
    fireEvent(heightInput,'onChangeText','1');
    props = height.props as inputProps;
    expect(props.amount).toBe('1');

    //Change units
    const buttonGroup = container.findByType(ButtonGroup);
    fireEvent(buttonGroup,'onPress',1); //Changes to metric
    //Check new weight
    props = weight.props as inputProps;
    // console.log(weight.props)
    expect(props.amount).toBe('0.45359237');
    expect(props.label).toBe('kg');
    //Check new height
    props = height.props as inputProps;
    expect(props.amount).toBe('0.3048');
    expect(props.label).toBe('m');
  })
})