import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, Switch, Button, Alert, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { colors } from '../styles/theme';

export default function Profile() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mobilidadeReduzida, setMobilidadeReduzida] = useState(false);
  const PERFIL_KEY = '@perfilUsuario';

  async function salvarPerfil() {
    try {
      await AsyncStorage.setItem(PERFIL_KEY, JSON.stringify({ nome, email, mobilidadeReduzida }));
      Alert.alert('Perfil salvo com sucesso!');
    } catch {
      Alert.alert('Erro ao salvar o perfil.');
    }
  }

  async function carregarPerfil() {
    try {
      const data = await AsyncStorage.getItem(PERFIL_KEY);
      if (data) {
        const perfil = JSON.parse(data);
        setNome(perfil.nome);
        setEmail(perfil.email);
        setMobilidadeReduzida(perfil.mobilidadeReduzida);
      }
    } catch {
      Alert.alert('Erro ao carregar perfil.');
    }
  }

  useEffect(() => {
    carregarPerfil();
  }, []);

  return (
    <Animated.View entering={FadeIn.duration(800)} style={styles.container}>
      <Text style={styles.title}>Seu Perfil</Text>

      <TextInput style={styles.input} placeholder="Nome" value={nome} onChangeText={setNome} />
      <TextInput style={styles.input} placeholder="Email" keyboardType="email-address" value={email} onChangeText={setEmail} />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Mobilidade reduzida?</Text>
        <Switch value={mobilidadeReduzida} onValueChange={setMobilidadeReduzida} />
      </View>

      <Button title="Salvar Perfil" onPress={salvarPerfil} />
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
     padding: 24,
      backgroundColor: colors.gray 
    },
  title: { 
    fontSize: 26, 
    fontWeight: 'bold', 
    color: colors.primary,
     marginBottom: 20,
      textAlign: 'center' 
    },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
    backgroundColor: colors.white,
    color: colors.text,
  },
  switchContainer: { 
    flexDirection: 'row', 
    alignItems: 'center',
     marginBottom: 20 
    },
  label: { 
    fontSize: 16,
     color: colors.text,
      marginRight: 10 
    },
});
