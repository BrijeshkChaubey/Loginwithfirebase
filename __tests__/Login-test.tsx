import 'react-native';
import React from 'react';
import Login from '../src/screens/Login';
import renderer from 'react-test-renderer';


  it(' renders correctly', () => {
    const hello = renderer.create (
    <Login />);
   
  });
