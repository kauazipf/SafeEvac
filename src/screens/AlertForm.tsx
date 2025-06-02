import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, Button, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { Alerta } from '../types/Alerta';
import { criarAlerta, listarAlertas } from '../services/alertaService';
import { showError, showSuccess } from '../utils/toast';

export default function AlertForm() {
  const [local, setLocal] = useState('');
  const [tipo, setTipo] = useState('');
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState(false);

  async function salvarAlerta() {
    if (!local.trim() || !tipo.trim()) {
      showError('Preencha todos os campos');
      return;
    }

    try {
      setLoading(true);
      await criarAlerta({ local, tipo });
      showSuccess('Alerta registrado com sucesso!');
      setLocal('');
      setTipo('');
      await carregarAlertas();
    } catch (err) {
      showError('Erro ao registrar alerta');
    } finally {
      setLoading(false);
    }
  }

  async function carregarAlertas() {
    try {
      setLoading(true);
      const dados = await listarAlertas();
      setAlertas(dados);
    } catch (err) {
      showError('Erro ao buscar alertas');
    } finally {
      setLoading(false);
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

      <Button title="Salvar Alerta" onPress={salvarAlerta} disabled={loading} />

      {loading && <ActivityIndicator size="large" style={{ marginTop: 20 }} />}

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
