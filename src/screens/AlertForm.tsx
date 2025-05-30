import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, Alert } from 'react-native';
import { api } from '../services/api';
import { Alerta } from './../types/Alerta';

export default function AlertForm() {
  const [local, setLocal] = useState('');
  const [tipo, setTipo] = useState('');
  const [alertas, setAlertas] = useState<Alerta[]>([]);

  async function salvarAlerta() {
    try {
      await api.post('/alertas', { local, tipo });
      Alert.alert('Alerta registrado!');
      setLocal('');
      setTipo('');
      carregarAlertas();
    } catch (err) {
      Alert.alert('Erro ao registrar alerta');
    }
  }

  async function carregarAlertas() {
    try {
      const response = await api.get<Alerta[]>('/alertas');
      setAlertas(response.data);
    } catch (err) {
      Alert.alert('Erro ao buscar alertas');
    }
  }

  useEffect(() => {
    carregarAlertas();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Cadastrar Alerta</Text>
      <TextInput placeholder="Local" value={local} onChangeText={setLocal} style={styles.input} />
      <TextInput placeholder="Tipo de risco" value={tipo} onChangeText={setTipo} style={styles.input} />
      <Button title="Salvar Alerta" onPress={salvarAlerta} />
      <Text style={styles.subtitle}>Alertas Registrados:</Text>
      <FlatList
        data={alertas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => <Text>📍 {item.local} — {item.tipo}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 24, fontWeight: 'bold', marginBottom: 10 },
  input: { borderWidth: 1, padding: 10, marginVertical: 5, borderRadius: 5 },
  subtitle: { fontSize: 18, marginTop: 20, fontWeight: 'bold' },
});
