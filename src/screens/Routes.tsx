import React, { useEffect, useState } from 'react';
import {
  View, StyleSheet, Dimensions, ActivityIndicator,
  Text, Switch, Button, Modal
} from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import * as Notifications from 'expo-notifications';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { rotasSeguras, Rota } from '../data/rotas';
import { criarAlerta } from '../services/alertaService';
import { showError, showSuccess } from '../utils/toast';

export default function Routes() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const [loading, setLoading] = useState(true);
  const [apenasAcessiveis, setApenasAcessiveis] = useState(false);
  const [rotasFiltradas, setRotasFiltradas] = useState<Rota[]>([]);
  const [rotaSelecionada, setRotaSelecionada] = useState<Rota | null>(null);
  const [modalVisible, setModalVisible] = useState(false);

  const notifiedSet = new Set<number>();

  async function solicitarPermissaoNotificacao() {
    const { status } = await Notifications.requestPermissionsAsync();
    if (status !== 'granted') {
      showError('Permissão de notificação negada');
    }
  }

  async function carregarPerfilEFiltrarRotas(loc?: Location.LocationObject) {
    try {
      const perfilData = await AsyncStorage.getItem('@perfilUsuario');
      const perfil = perfilData ? JSON.parse(perfilData) : null;
      const isAcessivel = perfil?.mobilidadeReduzida ?? false;

      setApenasAcessiveis(isAcessivel);
      const filtradas = rotasSeguras.filter((r) => !isAcessivel || r.acessivel);
      setRotasFiltradas(filtradas);
      if (loc) setLocation(loc);
    } catch {
      showError('Erro ao carregar perfil');
    }
  }

  function calcularDistancia(lat1: number, lon1: number, lat2: number, lon2: number) {
    const toRad = (x: number) => x * Math.PI / 180;
    const R = 6371e3;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  }

  async function monitorarProximidade() {
    const posicao = await Location.getCurrentPositionAsync({});
    const { latitude, longitude } = posicao.coords;

    rotasSeguras.forEach(async (rota) => {
      if (!rota.acessivel && !notifiedSet.has(rota.id)) {
        const distancia = calcularDistancia(latitude, longitude, rota.latitude, rota.longitude);
        if (distancia < 100) {
          await Notifications.scheduleNotificationAsync({
            content: {
              title: '⚠️ Atenção!',
              body: `Você está se aproximando de uma rota não acessível: ${rota.nome}`,
              sound: true,
            },
            trigger: null,
          });
          notifiedSet.add(rota.id);
        }
      }
    });
  }

  useEffect(() => {
    (async () => {
      await solicitarPermissaoNotificacao();

      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        showError('Permissão de localização negada');
        setLoading(false);
        return;
      }

      try {
        const loc = await Location.getCurrentPositionAsync({});
        await carregarPerfilEFiltrarRotas(loc);

        const interval = setInterval(() => {
          monitorarProximidade();
        }, 15000);

        return () => clearInterval(interval);
      } catch (error) {
        showError('Erro ao obter localização');
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  useEffect(() => {
    const filtradas = rotasSeguras.filter((r) => !apenasAcessiveis || r.acessivel);
    setRotasFiltradas(filtradas);
  }, [apenasAcessiveis]);

  async function salvarAlertaComRota(rota: Rota) {
    try {
      await criarAlerta({ local: rota.nome, tipo: 'Evacuação sugerida' });
      showSuccess('Alerta salvo com base na rota!');
      setModalVisible(false);
    } catch {
      showError('Erro ao salvar alerta');
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
