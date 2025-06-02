import React, { useState, useEffect } from 'react';
import {
  View, Text, TextInput, FlatList, Button, StyleSheet,
  ActivityIndicator, Modal
} from 'react-native';
import { Alerta } from '../types/Alerta';
import {
  criarAlerta, listarAlertas,
  atualizarAlerta, excluirAlerta
} from '../services/alertaService';
import Animated, { FadeIn } from 'react-native-reanimated';
import { colors } from '../styles/theme';

export default function AlertForm() {
  const [local, setLocal] = useState('');
  const [tipo, setTipo] = useState('');
  const [alertas, setAlertas] = useState<Alerta[]>([]);
  const [loading, setLoading] = useState(false);
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [modalVisivel, setModalVisivel] = useState(false);

  async function carregarAlertas() {
    setLoading(true);
    const data = await listarAlertas();
    setAlertas(data);
    setLoading(false);
  }

  useEffect(() => {
    carregarAlertas();
  }, []);

  async function salvarAlerta() {
    if (!local.trim() || !tipo.trim()) return;
    setLoading(true);
    if (editandoId !== null) {
      await atualizarAlerta(editandoId, { local, tipo });
    } else {
      await criarAlerta({ local, tipo });
    }
    setLocal('');
    setTipo('');
    setEditandoId(null);
    setModalVisivel(false);
    await carregarAlertas();
    setLoading(false);
  }

  async function handleEditar(alerta: Alerta) {
    setEditandoId(alerta.id);
    setLocal(alerta.local);
    setTipo(alerta.tipo);
    setModalVisivel(true);
  }

  async function handleExcluir(id: number) {
    setLoading(true);
    await excluirAlerta(id);
    await carregarAlertas();
    setLoading(false);
  }

  return (
    <Animated.View entering={FadeIn.duration(800)} style={styles.container}>
      <Text style={styles.title}>Alertas Registrados</Text>

      {loading && <ActivityIndicator size="large" color={colors.primary} />}

      <FlatList
        data={alertas}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View style={styles.itemRow}>
            <Text style={styles.item}>📍 {item.local} — {item.tipo}</Text>
            <View style={styles.buttons}>
              <Button title="Editar" onPress={() => handleEditar(item)} />
              <Button title="Excluir" color={colors.danger} onPress={() => handleExcluir(item.id)} />
            </View>
          </View>
        )}
      />

      <Button title="Novo Alerta" onPress={() => setModalVisivel(true)} />

      <Modal visible={modalVisivel} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.subtitle}>{editandoId ? 'Editar Alerta' : 'Novo Alerta'}</Text>
          <TextInput style={styles.input} placeholder="Local" value={local} onChangeText={setLocal} />
          <TextInput style={styles.input} placeholder="Tipo de risco" value={tipo} onChangeText={setTipo} />
          <Button title="Salvar" onPress={salvarAlerta} />
          <Button title="Cancelar" color="gray" onPress={() => {
            setEditandoId(null);
            setModalVisivel(false);
            setLocal('');
            setTipo('');
          }} />
        </View>
      </Modal>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 24, backgroundColor: colors.gray },
  title: { fontSize: 26, fontWeight: 'bold', color: colors.primary, textAlign: 'center', marginBottom: 20 },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    borderRadius: 6,
    marginBottom: 12,
    backgroundColor: colors.white,
    color: colors.text,
  },
  subtitle: { fontSize: 20, fontWeight: '600', color: colors.secondary, marginBottom: 10 },
  item: { fontSize: 16, color: colors.text },
  itemRow: {
    backgroundColor: colors.white,
    padding: 10,
    marginVertical: 8,
    borderRadius: 8,
    elevation: 1,
  },
  buttons: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 10, gap: 10 },
  modalContent: { flex: 1, padding: 24, backgroundColor: colors.white, justifyContent: 'center' },
});
