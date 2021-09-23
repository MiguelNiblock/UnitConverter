import 'react-native';
import React from 'react';
import App from '../App';
import Form from '../src/screens/form';
import Input from '../src/components/input';
import renderer from 'react-test-renderer';

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

describe('Form functionality', ()=>{

  it('gives Input the right values', ()=>{
    const tree = renderer.create(<Input fieldname={"Height"} label={"ft"} amount={'20'} />);
    expect(tree.root.props.fieldname).toBe('Height');
    expect(tree.root.props.label).toBe('ft');
    expect(tree.root.props.amount).toBe('20');    
  })
  
})