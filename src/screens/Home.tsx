import React from 'react';
import { View, Text, StyleSheet, Button, ScrollView, Image, TouchableOpacity } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import i18n from '../i18n/translations';
import { RootDrawerParamList } from './../types/NavigationTyoes';

// Navegação tipada
type NavigationProps = DrawerNavigationProp<RootDrawerParamList>;

export default function Home() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.View entering={FadeIn.duration(800)}>
        {/* Substitua ou ative a logo se quiser */}
        {/* <Image source={require('../assets/evacsafe-logo.png')} style={styles.logo} resizeMode="contain" /> */}

        <Text style={styles.title}>{i18n.t('welcome')}</Text>
        <Text style={styles.text}>{i18n.t('intro')}</Text>

        <Text style={styles.text}>
          Através de rotas seguras e acessíveis, especialmente pensadas para pessoas com mobilidade reduzida,
          o EvacSafe ajuda você a encontrar rapidamente o ponto de evacuação mais próximo e registrar alertas
          em tempo real.
        </Text>

        <Text style={styles.subtitle}>O que você pode fazer:</Text>
        <Text style={styles.bullet}>• Ver rotas seguras e acessíveis no mapa</Text>
        <Text style={styles.bullet}>• Registrar alertas sobre locais de risco</Text>
        <Text style={styles.bullet}>• Salvar seu perfil com preferências de evacuação</Text>

        <View style={styles.cardContainer}>
          <Card
            title={i18n.t('routes_title')}
            description={i18n.t('routes_desc')}
            onPress={() => navigation.navigate('Rotas Seguras')}
          />
          <Card
            title={i18n.t('alert_title')}
            description={i18n.t('alert_desc')}
            onPress={() => navigation.navigate('Alertas')}
          />
          <Card
            title={i18n.t('profile_title')}
            description={i18n.t('profile_desc')}
            onPress={() => navigation.navigate('Perfil')}
          />
        </View>
      </Animated.View>
    </ScrollView>
  );
}

function Card({ title, description, onPress }: { title: string; description: string; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <Text style={styles.cardTitle}>{title}</Text>
      <Text style={styles.cardText}>{description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  logo: {
    width: 180,
    height: 100,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: '#028220',
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
    color: '#333',
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
  },
  bullet: {
    fontSize: 16,
    textAlign: 'left',
    alignSelf: 'stretch',
    marginVertical: 4,
  },
  cardContainer: {
    marginTop: 20,
    width: '100%',
  },
  card: {
    backgroundColor: '#f2f2f2',
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
  },
  cardText: {
    fontSize: 14,
    color: '#555',
  },
});