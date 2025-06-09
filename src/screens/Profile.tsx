import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  TextInput,
  Modal,
  Alert,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useTheme } from '../styles/ThemeContext';

interface Usuario {
  nome: string;
  email: string;
  senha?: string;
  telefone?: string;
  cidade?: string;
  estado?: string;
}

export default function Profile() {
  const { theme, toggleTheme, isDark } = useTheme();
  const [usuario, setUsuario] = useState<Usuario | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [form, setForm] = useState<Usuario | null>(null);

  const carregarUsuario = async () => {
    const userData = await AsyncStorage.getItem('usuario');
    if (userData) {
      const data = JSON.parse(userData);
      setUsuario(data);
      setForm(data);
    }
  };

  const salvarUsuario = async () => {
    try {
      if (form) {
        await AsyncStorage.setItem('usuario', JSON.stringify(form));
        setUsuario(form);
        setModalVisible(false);
        Alert.alert('Sucesso', 'Dados atualizados com sucesso');
      }
    } catch {
      Alert.alert('Erro', 'Falha ao salvar os dados');
    }
  };

  useEffect(() => {
    carregarUsuario();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: theme.colors.card,
    },
    title: {
      fontSize: 24,
      fontWeight: 'bold',
      color: theme.colors.primary,
      margin: 32,
      textAlign: 'center',
    },
    card: {
      backgroundColor: isDark ? '#fff6' : theme.colors.background,
      padding: 20,
      borderRadius: 12,
      marginBottom: 20,
      elevation: 4,
    },
    label: {
      fontWeight: 'bold',
      color: theme.colors.primary,
      marginTop: 16,
      fontSize: 18,
    },
    item: {
      fontSize: 16,
      color: theme.colors.text,
    },
    input: {
      backgroundColor: theme.colors.background,
      borderRadius: 8,
      padding: 16,
      marginTop: 12,
      borderColor: theme.colors.border,
      borderWidth: 1,
      color: theme.colors.text,
    },
    button: {
      backgroundColor: theme.colors.primary,
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 24,
      marginBottom: 8,
    },
    buttonText: {
      color: theme.colors.white,
      fontWeight: 'bold',
      fontSize: 18,
    },
    modalContent: {
      flex: 1,
      padding: 28,
      backgroundColor: theme.colors.card,
      justifyContent: 'center',
    },
    cancelButton: {
      backgroundColor: theme.colors.danger,
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 10,
    },
    themeButton: {
      backgroundColor: theme.colors.secondary,
      padding: 14,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 8,
    },
  });

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Perfil do Usuário</Text>

      {usuario ? (
        <View style={styles.card}>
          <Text style={styles.label}>Nome:</Text>
          <Text style={styles.item}>{usuario.nome}</Text>

          <Text style={styles.label}>Email:</Text>
          <Text style={styles.item}>{usuario.email}</Text>

          <Text style={styles.label}>Telefone:</Text>
          <Text style={styles.item}>{usuario.telefone || 'Não informado'}</Text>

          <Text style={styles.label}>Cidade:</Text>
          <Text style={styles.item}>{usuario.cidade || 'Não informado'}</Text>

          <Text style={styles.label}>Estado:</Text>
          <Text style={styles.item}>{usuario.estado || 'Não informado'}</Text>

          <TouchableOpacity style={styles.button} onPress={() => setModalVisible(true)}>
            <Text style={styles.buttonText}>Editar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
            <Text style={styles.buttonText}>
              {isDark ? 'Modo Claro' : 'Modo Escuro'}
            </Text>
          </TouchableOpacity>

        </View>
      ) : (
        <Text style={styles.item}>Nenhum usuário logado.</Text>
      )}

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.title}>Editar Perfil</Text>

          <TextInput
            style={styles.input}
            value={form?.nome}
            onChangeText={(text) => setForm({ ...form!, nome: text })}
            placeholder="Nome"
            placeholderTextColor={theme.colors.placeholder}
          />

          <TextInput
            style={styles.input}
            value={form?.email}
            onChangeText={(text) => setForm({ ...form!, email: text })}
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor={theme.colors.placeholder}
          />

          <TextInput
            style={styles.input}
            value={form?.telefone}
            onChangeText={(text) => setForm({ ...form!, telefone: text })}
            placeholder="Telefone"
            keyboardType="phone-pad"
            placeholderTextColor={theme.colors.placeholder}
          />

          <TextInput
            style={styles.input}
            value={form?.cidade}
            onChangeText={(text) => setForm({ ...form!, cidade: text })}
            placeholder="Cidade"
            placeholderTextColor={theme.colors.placeholder}
          />

          <TextInput
            style={styles.input}
            value={form?.estado}
            onChangeText={(text) => setForm({ ...form!, estado: text })}
            placeholder="Estado"
            placeholderTextColor={theme.colors.placeholder}
          />

          <TouchableOpacity style={styles.button} onPress={salvarUsuario}>
            <Text style={styles.buttonText}>Salvar</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.cancelButton} onPress={() => setModalVisible(false)}>
            <Text style={styles.buttonText}>Cancelar</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}
