import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { useTheme } from '../styles/ThemeContext';

export default function Register() {
  const { theme } = useTheme();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [telefone, setTelefone] = useState('');
  const [cidade, setCidade] = useState('');
  const [estado, setEstado] = useState('');
  const navigation = useNavigation();

  const registrar = async () => {
    if (!nome || !email || !senha) {
      Alert.alert('Atenção', 'Preencha nome, email e senha');
      return;
    }

    const usuario = { nome, email, senha, telefone, cidade, estado };
    await AsyncStorage.setItem('usuario', JSON.stringify(usuario));
    Alert.alert('Sucesso', 'Usuário cadastrado com sucesso');
    navigation.goBack();
  };

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.card,
      padding: 24,
      justifyContent: 'center',
    },
    title: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.colors.primary,
      textAlign: 'center',
      marginBottom: 8,
    },
    subtitle: {
      fontSize: 16,
      textAlign: 'center',
      color: theme.colors.text,
      marginBottom: 24,
    },
    input: {
      backgroundColor: theme.colors.background,
      borderRadius: 8,
      padding: 12,
      marginBottom: 16,
      borderColor: theme.colors.border,
      borderWidth: 1,
      color: theme.colors.text,
    },
    button: {
      backgroundColor: theme.colors.primary,
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 8,
    },
    buttonText: {
      color: theme.colors.white,
      fontWeight: 'bold',
      fontSize: 16,
    },
    link: {
      color: theme.colors.secondary,
      textAlign: 'center',
      marginTop: 16,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastro</Text>
      <Text style={styles.subtitle}>Preencha suas informações para continuar</Text>

      <TextInput
        style={styles.input}
        placeholder="Nome completo"
        placeholderTextColor={theme.colors.placeholder}
        maxLength={40}
        value={nome}
        onChangeText={setNome}
      />

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={theme.colors.placeholder}
        maxLength={50}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />

      <TextInput
        style={styles.input}
        maxLength={20}
        placeholder="Senha"
        placeholderTextColor={theme.colors.placeholder}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TextInput
        style={styles.input}
        placeholder="Telefone"
        placeholderTextColor={theme.colors.placeholder}
        maxLength={11}
        value={telefone}
        onChangeText={setTelefone}
        keyboardType="phone-pad"
      />

      <TextInput
        style={styles.input}
        maxLength={40}
        placeholder="Cidade"
        placeholderTextColor={theme.colors.placeholder}
        value={cidade}
        onChangeText={setCidade}
      />

      <TextInput
        style={styles.input}
        maxLength={20}
        placeholder="Estado"
        placeholderTextColor={theme.colors.placeholder}
        value={estado}
        onChangeText={setEstado}
      />

      <TouchableOpacity style={styles.button} onPress={registrar}>
        <Text style={styles.buttonText}>Cadastrar</Text>
      </TouchableOpacity>

      <Text style={styles.link} onPress={() => navigation.goBack()}>
        Já tem conta? Faça login
      </Text>
    </View>
  );
}
