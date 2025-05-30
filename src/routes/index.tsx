import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../screens/Home';
import Routes from './../screens/Routes';
import AlertForm from './../screens/AlertForm';
import Profile from './../screens/Profile';
import Help from './../screens/Help';

const Stack = createNativeStackNavigator();

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home" screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Home" component={Home} />
        <Stack.Screen name="Routes" component={Routes} />
        <Stack.Screen name="AlertForm" component={AlertForm} />
        <Stack.Screen name="Profile" component={Profile} />
        <Stack.Screen name="Help" component={Help} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
