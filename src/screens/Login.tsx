import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, Alert, TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../styles/theme';

export default function Login() {
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const navigation = useNavigation<any>();

  const logar = async () => {
    if (!email || !senha) {
      Alert.alert('Atenção', 'Preencha todos os campos');
      return;
    }
    const user = await AsyncStorage.getItem('usuario');

    if (!user) {
      Alert.alert('Erro', 'Usuário não encontrado. Faça o cadastro.');
      return;
    }

    const dados = JSON.parse(user);
    if (dados.email === email && dados.senha === senha) {
      await AsyncStorage.setItem('usuarioLogado', 'true');
      // Navegação controlada automaticamente no App.tsx
    } else {
      Alert.alert('Erro', 'E-mail ou senha incorretos');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}> Terra Segura</Text>
      <Text style={styles.subtitle}>Acesso Seguro</Text>

      <TextInput
        style={styles.input}
        placeholder="Email"
        placeholderTextColor={colors.placeholder}
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />

      <TextInput
        style={styles.input}
        placeholder="Senha"
        placeholderTextColor={colors.placeholder}
        value={senha}
        onChangeText={setSenha}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={logar}>
        <Text style={styles.buttonText}>Entrar</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => navigation.navigate('Register')}>
        <Text style={styles.link}>Criar conta</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray,
    padding: 24,
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: colors.primary,
    textAlign: 'center',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: colors.text,
    marginBottom: 24,
  },
  input: {
    backgroundColor: colors.white,
    borderRadius: 8,
    padding: 12,
    marginBottom: 16,
    borderColor: colors.border,
    borderWidth: 1,
    color: colors.text,
  },
  button: {
    backgroundColor: colors.primary,
    padding: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
    fontSize: 16,
  },
  link: {
    color: colors.secondary,
    textAlign: 'center',
    marginTop: 16,
  },
});
