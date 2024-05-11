import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import App from '../../App';
import LoginScreen from './LoginScreen';
import SignUpScreen from './SignUpScreen'; // SignUpScreen을 import합니다.
import HomeScreen from './HomeScreen'; 
import MyPageScreen from './MyPageScreen'; 
import CameraScreen from './CameraScreen';

const Stack = createStackNavigator();

const AppStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="App" component={App} />
      <Stack.Screen name="LoginScreen" component={LoginScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} /> {/* SignUpScreen에 대한 스크린을 추가합니다. */}
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen name="MyPageScreen" component={MyPageScreen} />
      <Stack.Screen name="CameraScreen" component={CameraScreen} />
    </Stack.Navigator>
  );
}

export default AppStack;