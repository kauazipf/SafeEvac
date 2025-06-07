import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { colors } from '../styles/theme';

export default function Help() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ajuda e Instruções</Text>

      <Text style={styles.sectionTitle}>📍 Rotas Seguras</Text>
      <Text style={styles.text}>
        Acesse a aba "Rotas Seguras" para visualizar no mapa os pontos de evacuação mais próximos.
        O aplicativo usará sua localização para mostrar esses pontos com precisão.
      </Text>

      <Text style={styles.sectionTitle}>🚨 Alertas</Text>
      <Text style={styles.text}>
        Na aba "Alertas", você pode cadastrar regiões de risco que encontrar, como alagamentos,
        deslizamentos ou incêndios. Isso ajuda outras pessoas a evitarem essas áreas.
      </Text>

      <Text style={styles.sectionTitle}>👤 Perfil</Text>
      <Text style={styles.text}>
        Em "Perfil", futuramente você poderá configurar preferências como acessibilidade, localização padrão
        ou modo noturno.
      </Text>

      <Text style={styles.sectionTitle}>📱 Contato e Suporte</Text>
      <Text style={styles.text}>
        Para mais informações ou em caso de problemas com o aplicativo, entre em contato com a equipe do SafeEvac
        através do e-mail suporte@safeevac.app.br (exemplo fictício).
      </Text>

      <Text style={styles.footer}>Versão 1.0 – Projeto Global Solution 2025</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 24,
    backgroundColor: colors.gray,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.primary,
    marginBottom: 20,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.secondary,
    marginTop: 16,
    marginBottom: 8,
  },
  text: {
    fontSize: 15,
    color: colors.text,
    lineHeight: 22,
    textAlign: 'justify',
  },
  footer: {
    marginTop: 30,
    fontSize: 14,
    textAlign: 'center',
    color: colors.text,
    opacity: 0.7,
  },
});
