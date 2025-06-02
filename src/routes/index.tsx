import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Home from '../screens/Home';
import Routes from '../screens/Routes';
import AlertForm from '../screens/AlertForm';
import Profile from '../screens/Profile';
import Help from '../screens/Help';
import { Ionicons } from '@expo/vector-icons';
import BotaoAbrirMenu from '../components/BotaoAbrirMenu';


const Drawer = createDrawerNavigator();

export default function AppRoutes() {
  return (
    <NavigationContainer>
      <Drawer.Navigator
        screenOptions={{
          drawerPosition: 'right',
          headerTitleAlign: 'center',
          drawerActiveTintColor: '#028220',
          drawerLabelStyle: { fontSize: 16 },
          headerRight: () => <BotaoAbrirMenu />
        }}
      >
        <Drawer.Screen
          name="Início"
          component={Home}
          options={{
            drawerIcon: ({ color, size }) => <Ionicons name="home-outline" size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Rotas Seguras"
          component={Routes}
          options={{
            drawerIcon: ({ color, size }) => <Ionicons name="map-outline" size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Alertas"
          component={AlertForm}
          options={{
            drawerIcon: ({ color, size }) => <Ionicons name="alert-circle-outline" size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Perfil"
          component={Profile}
          options={{
            drawerIcon: ({ color, size }) => <Ionicons name="person-outline" size={size} color={color} />,
          }}
        />
        <Drawer.Screen
          name="Ajuda"
          component={Help}
          options={{
            drawerIcon: ({ color, size }) => <Ionicons name="help-circle-outline" size={size} color={color} />,
          }}
        />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
