import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, StyleSheet, Switch, Button, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function Profile() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [mobilidadeReduzida, setMobilidadeReduzida] = useState(false);

  const PERFIL_KEY = '@perfilUsuario';

  async function salvarPerfil() {
    const perfil = {
      nome,
      email,
      mobilidadeReduzida
    };

    try {
      await AsyncStorage.setItem(PERFIL_KEY, JSON.stringify(perfil));
      Alert.alert('Perfil salvo com sucesso!');
    } catch (error) {
      Alert.alert('Erro ao salvar perfil.');
    }
  }

  async function carregarPerfil() {
    try {
      const dados = await AsyncStorage.getItem(PERFIL_KEY);
      if (dados) {
        const perfil = JSON.parse(dados);
        setNome(perfil.nome);
        setEmail(perfil.email);
        setMobilidadeReduzida(perfil.mobilidadeReduzida);
      }
    } catch (error) {
      Alert.alert('Erro ao carregar perfil.');
    }
  }

  useEffect(() => {
    carregarPerfil();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>

      <TextInput
        placeholder="Nome"
        value={nome}
        onChangeText={setNome}
        style={styles.input}
      />

      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        style={styles.input}
      />

      <View style={styles.switchContainer}>
        <Text style={styles.label}>Possui mobilidade reduzida?</Text>
        <Switch value={mobilidadeReduzida} onValueChange={setMobilidadeReduzida} />
      </View>

      <Button title="Salvar" onPress={salvarPerfil} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  input: { borderWidth: 1, borderRadius: 5, padding: 10, marginBottom: 10 },
  switchContainer: { flexDirection: 'row', alignItems: 'center', marginVertical: 10 },
  label: { fontSize: 16, marginRight: 10 },
});
