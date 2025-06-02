import React from 'react';
import { TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';

export default function BotaoAbrirMenu() {
  const navigation = useNavigation<DrawerNavigationProp<any>>();

  return (
    <TouchableOpacity onPress={() => navigation.openDrawer()} style={{ marginRight: 15 }}>
      <Ionicons name="menu-outline" size={28} color="#000" />
    </TouchableOpacity>
  );
}
