import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { useNavigation } from '@react-navigation/native';
import { DrawerNavigationProp } from '@react-navigation/drawer';
import { RootDrawerParamList } from './../types/NavigationTypes';
import { dispararNotificacaoFake } from './../services/notificationService';
import { colors } from '../styles/theme';

type NavigationProps = DrawerNavigationProp<RootDrawerParamList>;

export default function Home() {
  const navigation = useNavigation<NavigationProps>();

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.View entering={FadeIn.duration(800)}>
        <Text style={styles.title}>Bem-vindo ao SafeEvac</Text>

        <Text style={styles.text}>
          O SafeEvac é um aplicativo inteligente para evacuação de áreas de risco, com foco em acessibilidade,
          inclusão e agilidade em situações de emergência.
        </Text>

        <Text style={styles.text}>
          Pessoas com mobilidade reduzida contam com suporte especial por meio de rotas acessíveis e alertas
          monitorados em tempo real.
        </Text>

        <Text style={styles.subtitle}>Funcionalidades disponíveis:</Text>
        <Text style={styles.bullet}>• Visualizar áreas monitoradas no mapa</Text>
        <Text style={styles.bullet}>• Registrar e gerenciar alertas de risco</Text>
        <Text style={styles.bullet}>• Atualizar informações do seu perfil</Text>
        <Text style={styles.bullet}>• Simular recebimento de alerta</Text>

        <View style={styles.cardContainer}>
          <Card
            title="Mapa"
            description="Veja as regiões de risco e sua localização atual."
            onPress={() => navigation.navigate('Mapa')}
          />
          <Card
            title="Alertas"
            description="Cadastre novas regiões monitoradas e consulte alertas existentes."
            onPress={() => navigation.navigate('Alertas')}
          />
          <Card
            title="Perfil"
            description="Veja e edite seus dados pessoais cadastrados no app."
            onPress={() => navigation.navigate('Perfil')}
          />
          <Card
            title="Ajuda"
            description="Dicas, instruções e como agir em emergências."
            onPress={() => navigation.navigate('Ajuda')}
          />
          <Card
            title="Testar Alerta"
            description="Dispara um alerta simulado para fins de demonstração."
            onPress={dispararNotificacaoFake}
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
    backgroundColor: colors.gray,
    margin: 12,
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    marginBottom: 10,
    textAlign: 'center',
    color: colors.primary,
  },
  text: {
    fontSize: 16,
    marginVertical: 10,
    textAlign: 'center',
    color: colors.text,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: '600',
    marginTop: 20,
    marginBottom: 10,
    textAlign: 'center',
    color: colors.secondary,
  },
  bullet: {
    fontSize: 16,
    textAlign: 'left',
    alignSelf: 'stretch',
    marginVertical: 4,
    color: colors.text,
  },
  cardContainer: {
    marginTop: 20,
    width: '100%',
  },
  card: {
    backgroundColor: colors.white,
    borderRadius: 12,
    padding: 20,
    marginVertical: 10,
    elevation: 2,
    borderLeftWidth: 5,
    borderLeftColor: colors.primary,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 6,
    color: colors.primary,
  },
  cardText: {
    fontSize: 14,
    color: colors.text,
  },
});
