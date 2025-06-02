import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, Dimensions, Alert, ActivityIndicator,
  Text, Switch, Button, Modal
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rotasSeguras, Rota } from '../data/rotas';
import { criarAlerta } from '../services/alertaService';

export default function Routes() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [apenasAcessiveis, setApenasAcessiveis] = useState(false);
  const [rotasFiltradas, setRotasFiltradas] = useState<Rota[]>([]);
  const [rotaSelecionada, setRotaSelecionada] = useState<Rota | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  async function carregarPerfilEFiltrarRotas(localizacao?: Location.LocationObject) {
    try {
      const perfilData = await AsyncStorage.getItem('@perfilUsuario');
      const perfil = perfilData ? JSON.parse(perfilData) : null;
      const isAcessivel = perfil?.mobilidadeReduzida ?? false;

      setApenasAcessiveis(isAcessivel);

      const filtradas = rotasSeguras.filter((r) => {
        return !isAcessivel || r.acessivel;
      });

      setRotasFiltradas(filtradas);
      if (localizacao) setLocation(localizacao);
    } catch (error) {
      Alert.alert('Erro ao carregar perfil');
    }
  }

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão de localização negada');
        setLoading(false);
        return;
      }

      try {
        const loc = await Location.getCurrentPositionAsync({});
        await carregarPerfilEFiltrarRotas(loc);
      } catch (error) {
        Alert.alert('Erro ao obter localização');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const filtradas = rotasSeguras.filter((r) => {
      return !apenasAcessiveis || r.acessivel;
    });
    setRotasFiltradas(filtradas);
  }, [apenasAcessiveis]);

  async function salvarAlertaComRota(rota: Rota) {
    try {
      await criarAlerta({ local: rota.nome, tipo: 'Evacuação sugerida' });
      Alert.alert('Alerta salvo com base na rota!');
      setModalVisible(false);
    } catch (error) {
      Alert.alert('Erro ao salvar alerta');
    }
  }

  if (loading || !location) {
    return <ActivityIndicator size="large" style={{ marginTop: 40 }} />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.filtroContainer}>
        <Text>Somente acessíveis</Text>
        <Switch value={apenasAcessiveis} onValueChange={setApenasAcessiveis} />
      </View>

      <MapView
        style={styles.map}
        initialRegion={{
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        showsUserLocation
      >
        {rotasFiltradas.map((rota) => (
          <Marker
            key={rota.id}
            coordinate={{ latitude: rota.latitude, longitude: rota.longitude }}
            title={rota.nome}
            description={rota.acessivel ? 'Acessível' : 'Não acessível'}
            pinColor={rota.acessivel ? 'green' : 'red'}
            onPress={() => {
              setRotaSelecionada(rota);
              setModalVisible(true);
            }}
          />
        ))}
      </MapView>

      <Modal visible={modalVisible} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalhes da Rota</Text>
            <Text>🧭 Nome: {rotaSelecionada?.nome}</Text>
            <Text>♿ Acessível: {rotaSelecionada?.acessivel ? 'Sim' : 'Não'}</Text>
            <Button title="Salvar como alerta" onPress={() => rotaSelecionada && salvarAlertaComRota(rotaSelecionada)} />
            <Button title="Fechar" onPress={() => setModalVisible(false)} />
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  map: { width: Dimensions.get('window').width, height: Dimensions.get('window').height },
  filtroContainer: {
    position: 'absolute',
    top: 50,
    zIndex: 1,
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 10,
    left: 20,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.5)'
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10
  }
});
