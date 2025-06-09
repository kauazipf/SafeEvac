import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  TextInput,
  StyleSheet,
  Alert,
} from 'react-native';
import MapView, { Marker, Region } from 'react-native-maps';
import * as Location from 'expo-location';
import { useTheme } from '../styles/ThemeContext';

export default function MapScreen() {
  const mapRef = useRef<MapView | null>(null);
  const [currentRegion, setCurrentRegion] = useState<Region | null>(null);
  const [destination, setDestination] = useState({ latitude: '', longitude: '' });
  const { theme } = useTheme();

  const buscarLocalizacaoAtual = async () => {
    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        Alert.alert('Permissão negada', 'Você precisa permitir o uso da localização.');
        return;
      }

      const location = await Location.getCurrentPositionAsync({});
      const region = {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      };

      setCurrentRegion(region);
      mapRef.current?.animateToRegion(region, 1000);
    } catch (err) {
      Alert.alert('Erro', 'Não foi possível obter sua localização.');
    }
  };

  const irParaDestino = () => {
    const lat = parseFloat(destination.latitude);
    const lon = parseFloat(destination.longitude);

    if (isNaN(lat) || isNaN(lon)) {
      Alert.alert('Erro', 'Latitude ou longitude inválida.');
      return;
    }

    const region = {
      latitude: lat,
      longitude: lon,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };

    mapRef.current?.animateToRegion(region, 1000);
  };

  useEffect(() => {
    buscarLocalizacaoAtual();
  }, []);

  const styles = StyleSheet.create({
    controls: {
      position: 'absolute',
      bottom: 50,
      left: 20,
      right: 20,
      backgroundColor: theme.colors.card,
      padding: 16,
      borderRadius: 12,
      elevation: 4,
    },
    label: {
      fontWeight: 'bold',
      color: theme.colors.primary,
      marginTop: 8,
    },
    input: {
      borderWidth: 1,
      borderColor: theme.colors.border,
      borderRadius: 8,
      padding: 8,
      marginTop: 4,
      color: theme.colors.text,
      backgroundColor: theme.colors.background,
    },
    button: {
      backgroundColor: theme.colors.primary,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginBottom: 10,
    },
    goButton: {
      backgroundColor: theme.colors.secondary,
      padding: 12,
      borderRadius: 8,
      alignItems: 'center',
      marginTop: 12,
    },
    buttonText: {
      color: theme.colors.white,
      fontWeight: 'bold',
    },
  });

  return (
    <View style={{ flex: 1 }}>
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        initialRegion={{
          latitude: -23.55,
          longitude: -46.63,
          latitudeDelta: 0.05,
          longitudeDelta: 0.05,
        }}
      >
        {currentRegion && (
          <Marker
            coordinate={{
              latitude: currentRegion.latitude,
              longitude: currentRegion.longitude,
            }}
            title="Você está aqui"
            description="Sua localização atual"
            pinColor="blue"
          />
        )}
      </MapView>

      <View style={styles.controls}>
        <TouchableOpacity style={styles.button} onPress={buscarLocalizacaoAtual}>
          <Text style={styles.buttonText}>📍 Minha Localização</Text>
        </TouchableOpacity>

        <Text style={styles.label}>Latitude:</Text>
        <TextInput
          style={styles.input}
          placeholder="-23.55"
          placeholderTextColor={theme.colors.placeholder}
          keyboardType="numeric"
          value={destination.latitude}
          onChangeText={(text) => setDestination({ ...destination, latitude: text })}
        />

        <Text style={styles.label}>Longitude:</Text>
        <TextInput
          style={styles.input}
          placeholder="-46.63"
          placeholderTextColor={theme.colors.placeholder}
          keyboardType="numeric"
          value={destination.longitude}
          onChangeText={(text) => setDestination({ ...destination, longitude: text })}
        />

        <TouchableOpacity style={styles.goButton} onPress={irParaDestino}>
          <Text style={styles.buttonText}>Ir para Localização</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
