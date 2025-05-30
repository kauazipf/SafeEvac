import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Home() {
  const navigation = useNavigation<any>();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>SafeEvac</Text>
      <Button title="Ver rotas seguras" onPress={() => navigation.navigate('Routes')} />
      <Button title="Registrar alerta" onPress={() => navigation.navigate('AlertForm')} />
      <Button title="Perfil" onPress={() => navigation.navigate('Profile')} />
      <Button title="Ajuda" onPress={() => navigation.navigate('Help')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20, gap: 10 },
  title: { fontSize: 32, fontWeight: 'bold', marginBottom: 40, textAlign: 'center' },
});
