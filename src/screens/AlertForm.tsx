import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  FlatList,
  Modal,
  StyleSheet,
  Alert,
  TouchableOpacity,
} from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { Regiao, NivelRisco } from '../types/Region';
import {
  listarRegioes,
  criarRegiao,
  atualizarRegiao,
  deletarRegiao,
} from '../services/regionService';
import { colors } from '../styles/theme';
import { Ionicons } from '@expo/vector-icons';

export default function RegionForm() {
  const [regioes, setRegioes] = useState<Regiao[]>([]);
  const [form, setForm] = useState<Regiao>({
    nome: '',
    latitude: 0,
    longitude: 0,
    descricao: '',
    nivelRisco: 'BAIXO',
  });
  const [editandoId, setEditandoId] = useState<number | null>(null);
  const [modalVisible, setModalVisible] = useState(false);
  const [paginaAtual, setPaginaAtual] = useState(0);
  const [ultimaPagina, setUltimaPagina] = useState(false);
  const [totalPaginas, setTotalPaginas] = useState(1);

  const carregarRegioes = async (pagina = 0) => {
    try {
      const res = await listarRegioes(pagina);
      setRegioes(res.data.content || []);
      setPaginaAtual(res.data.number);
      setUltimaPagina(res.data.last);
      setTotalPaginas(res.data.totalPages);
    } catch {
      Alert.alert('Erro', 'Falha ao carregar regiões');
    }
  };

  const salvar = async () => {
    try {
      if (editandoId) {
        await atualizarRegiao(editandoId, form);
        Alert.alert('Sucesso', 'Região atualizada');
      } else {
        await criarRegiao(form);
        Alert.alert('Sucesso', 'Região criada');
      }
      setForm({ nome: '', latitude: 0, longitude: 0, descricao: '', nivelRisco: 'BAIXO' });
      setEditandoId(null);
      setModalVisible(false);
      setTimeout(() => carregarRegioes(paginaAtual), 300);
    } catch {
      Alert.alert('Erro', 'Falha ao salvar dados');
    }
  };

  const excluir = async (id: number) => {
    Alert.alert('Confirmar', 'Deseja remover a região?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Remover',
        style: 'destructive',
        onPress: async () => {
          await deletarRegiao(id);
          carregarRegioes(paginaAtual);
        },
      },
    ]);
  };

  const editar = (regiao: Regiao) => {
    setForm(regiao);
    setEditandoId(regiao.id || null);
    setModalVisible(true);
  };

  const getIconByRisco = (nivel: NivelRisco) => {
    switch (nivel) {
      case 'BAIXO': return <Ionicons name="checkmark-circle" size={24} color="green" />;
      case 'MEDIO': return <Ionicons name="alert-circle" size={24} color="orange" />;
      case 'ALTO': return <Ionicons name="warning" size={24} color="darkorange" />;
      case 'CRITICO': return <Ionicons name="alert" size={24} color="red" />;
      default: return null;
    }
  };

  useEffect(() => {
    carregarRegioes();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Regiões Monitoradas</Text>
        <TouchableOpacity style={styles.addButton} onPress={() => setModalVisible(true)}>
          <Text style={styles.addButtonText}>+ Nova Região</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        style={styles.flatList}
        contentContainerStyle={styles.flatListContainer}
        data={regioes}
        keyExtractor={(item) => item.id?.toString() || ''}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, marginBottom: 6 }}>
              {getIconByRisco(item.nivelRisco)}
              <Text style={styles.item}><Text style={styles.label}>Nível de Risco:</Text> {item.nivelRisco}</Text>
            </View>
            <Text style={styles.item}><Text style={styles.label}>Nome:</Text> {item.nome}</Text>
            <Text style={styles.item}><Text style={styles.label}>Descrição:</Text> {item.descricao}</Text>
            <Text style={styles.item}><Text style={styles.label}>Coordenadas:</Text> {item.latitude}, {item.longitude}</Text>
            <View style={styles.cardButtons}>
              <TouchableOpacity style={styles.editButton} onPress={() => editar(item)}>
                <Text style={styles.buttonText}>EDITAR</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.deleteButton} onPress={() => excluir(item.id!)}>
                <Text style={styles.buttonText}>EXCLUIR</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <View style={styles.pagination}>
        <TouchableOpacity
          disabled={paginaAtual === 0}
          onPress={() => carregarRegioes(paginaAtual - 1)}
          style={[styles.pageButton, paginaAtual === 0 && { opacity: 0.4 }]}
        >
          <Text style={styles.pageText}>Anterior</Text>
        </TouchableOpacity>

        <Text style={styles.pageIndicator}>
          Página {paginaAtual + 1} de {totalPaginas}
        </Text>

        <TouchableOpacity
          disabled={ultimaPagina}
          onPress={() => carregarRegioes(paginaAtual + 1)}
          style={[styles.pageButton, ultimaPagina && { opacity: 0.4 }]}
        >
          <Text style={styles.pageText}>Próximo</Text>
        </TouchableOpacity>
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.modalContent}>
          <Text style={styles.subtitle}>Preencha os dados da região</Text>

          <Text style={styles.label}>Nome da região</Text>
          <TextInput style={styles.input} value={form.nome} onChangeText={(text) => setForm({ ...form, nome: text })} />

          <Text style={styles.label}>Descrição do risco</Text>
          <TextInput style={styles.input} value={form.descricao} onChangeText={(text) => setForm({ ...form, descricao: text })} />

          <Text style={styles.label}>Latitude</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={String(form.latitude)} onChangeText={(text) => setForm({ ...form, latitude: parseFloat(text) })} />

          <Text style={styles.label}>Longitude</Text>
          <TextInput style={styles.input} keyboardType="numeric" value={String(form.longitude)} onChangeText={(text) => setForm({ ...form, longitude: parseFloat(text) })} />

          <Text style={styles.label}>Nível de risco</Text>
          <Picker selectedValue={form.nivelRisco} onValueChange={(value) => setForm({ ...form, nivelRisco: value as NivelRisco })} style={styles.input}>
            <Picker.Item label="BAIXO" value="BAIXO" />
            <Picker.Item label="MEDIO" value="MEDIO" />
            <Picker.Item label="ALTO" value="ALTO" />
            <Picker.Item label="CRITICO" value="CRITICO" />
          </Picker>

          <Button title="Salvar" onPress={salvar} />
          <Button title="Cancelar" onPress={() => setModalVisible(false)} color="gray" />
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.gray,
    margin: 8,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: colors.primary,
    marginTop: 32,
    marginBottom: 24,
  },
  addButton: {
    backgroundColor: colors.primary,
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 6,
    elevation: 2,
    marginTop: 16,
  },
  addButtonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginTop: 12 ,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 6,
    minHeight: 240,
    justifyContent: 'center',
  },
  label: {
    fontWeight: 'bold',
    fontFamily: 'arial',
    color: colors.primary,
  },
  item: {
    fontSize: 18,
    color: colors.text,
    marginBottom: 6,
  },
  cardButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 12,
  },
  editButton: {
    backgroundColor: colors.secondary,
    padding: 10,
    borderRadius: 6,
  },
  deleteButton: {
    backgroundColor: colors.danger,
    padding: 10,
    borderRadius: 6,
  },
  buttonText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  modalContent: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
    backgroundColor: colors.gray,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 10,
    color: colors.secondary,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: colors.border,
    padding: 10,
    marginBottom: 8,
    borderRadius: 6,
    backgroundColor: colors.white,
    color: colors.text,
  },
  flatList: {
    maxHeight: 550,
  },
  flatListContainer: {
    paddingBottom: 20,
  },
  pagination: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
  },
  pageButton: {
    backgroundColor: colors.primary,
    padding: 10,
    borderRadius: 6,
  },
  pageText: {
    color: colors.white,
    fontWeight: 'bold',
  },
  pageIndicator: {
    fontSize: 16,
    color: colors.text,
    fontWeight: '500',
  },
});
