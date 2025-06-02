import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

export default function Help() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Ajuda e Dicas</Text>

      <Text style={styles.sectionTitle}>📢 Em caso de emergência:</Text>
      <Text style={styles.text}>• Mantenha a calma.</Text>
      <Text style={styles.text}>• Siga as rotas seguras indicadas no aplicativo.</Text>
      <Text style={styles.text}>• Ajude pessoas com dificuldade de locomoção.</Text>

      <Text style={styles.sectionTitle}>🦽 Dicas de acessibilidade:</Text>
      <Text style={styles.text}>• Verifique se a rota possui acessos adaptados (rampas, pisos táteis).</Text>
      <Text style={styles.text}>• Evite escadas ou trechos acidentados se estiver com mobilidade reduzida.</Text>

      <Text style={styles.sectionTitle}>🧰 Kit de emergência recomendado:</Text>
      <Text style={styles.text}>• Água potável</Text>
      <Text style={styles.text}>• Lanterna e pilhas</Text>
      <Text style={styles.text}>• Remédios essenciais</Text>
      <Text style={styles.text}>• Documentos pessoais</Text>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { padding: 20 },
  title: { fontSize: 28, fontWeight: 'bold', marginBottom: 20, textAlign: 'center' },
  sectionTitle: { fontSize: 20, fontWeight: '600', marginTop: 15 },
  text: { fontSize: 16, marginVertical: 4 },
});
