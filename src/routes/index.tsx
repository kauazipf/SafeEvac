import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons';
import Home from '../screens/Home';
import Routes from '../screens/Routes';
import AlertForm from '../screens/AlertForm';
import Profile from '../screens/Profile';
import Help from '../screens/Help';
import { colors } from '../styles/theme';

const Drawer = createDrawerNavigator();

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: colors.primary,
          },
          headerTintColor: colors.white,
          headerTitleAlign: 'center',
          drawerPosition: 'right',
          drawerStyle: {
            backgroundColor: colors.primary,
          },
          drawerLabelStyle: {
            color: colors.white,
            fontWeight: 'bold',
          },
          drawerActiveBackgroundColor: colors.secondary,
          drawerInactiveTintColor: colors.white,
          drawerActiveTintColor: colors.white,
        }}
      >
        <Drawer.Screen
          name="Início"
          component={Home}
          options={{
            drawerIcon: ({ color }) => <Ionicons name="home" size={20} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Rotas Seguras"
          component={Routes}
          options={{
            drawerIcon: ({ color }) => <Ionicons name="map" size={20} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Alertas"
          component={AlertForm}
          options={{
            drawerIcon: ({ color }) => <Ionicons name="alert" size={20} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Perfil"
          component={Profile}
          options={{
            drawerIcon: ({ color }) => <Ionicons name="person" size={20} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Ajuda"
          component={Help}
          options={{
            drawerIcon: ({ color }) => <Ionicons name="help-circle" size={20} color={color} />,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
