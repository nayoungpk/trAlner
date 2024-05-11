import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Image, TouchableOpacity, Text } from 'react-native';
import RoutineScreen from './RoutineScreen';
import WorkScreen from './WorkScreen';
import HomeScreen from './HomeScreen';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Routine"
        component={RoutineScreen}
        options={({ route }) => ({
          tabBarLabel: 'Routine',
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? require('../../assets/Routine.png') : require('../../assets/Routine.png')}
              style={{ width: size, height: size }}
            />
          ),
          tabBarButton: ({ accessibilityState, onPress }) => (
            <TouchableOpacity onPress={onPress}>
              <Text>Routine</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="Work"
        component={WorkScreen}
        options={({ route }) => ({
          tabBarLabel: 'Work',
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? require('../../assets/Work.png') : require('../../assets/Work.png')}
              style={{ width: size, height: size }}
            />
          ),
          tabBarButton: ({ accessibilityState, onPress }) => (
            <TouchableOpacity onPress={onPress}>
              <Text>Work</Text>
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={({ navigation, route }) => ({
          tabBarLabel: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <Image
              source={focused ? require('../../assets/Home.png') : require('../../assets/Home.png')}
              style={{ width: size, height: size }}
            />
          ),
          tabBarButton: ({ accessibilityState, onPress }) => (
            <TouchableOpacity onPress={() => navigation.navigate('Home')}>
              <Text>Home</Text>
            </TouchableOpacity>
          ),
        })}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigator;


