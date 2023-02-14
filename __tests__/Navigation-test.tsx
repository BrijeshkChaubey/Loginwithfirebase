import 'react-native';
import React from 'react';
import Navigation from '../src/navigation/Navigation';
import renderer from 'react-test-renderer';

test('Navigation snapShot',()=>{
    const snap =rendere.create(
        <Navigation/>
    ).toJSON();
    expect(snap).toMatchSnapshot();
});