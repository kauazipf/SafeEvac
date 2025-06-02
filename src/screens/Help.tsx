import React from 'react';
import { ScrollView, Text, StyleSheet } from 'react-native';
import Animated, { FadeIn } from 'react-native-reanimated';
import { colors } from '../styles/theme';

export default function Help() {
  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Animated.View entering={FadeIn.duration(800)}>
        <Text style={styles.title}>Ajuda e Dicas</Text>

        <Text style={styles.section}>📢 Em caso de emergência:</Text>
        <Text style={styles.text}>• Mantenha a calma.</Text>
        <Text style={styles.text}>• Siga as rotas seguras indicadas no mapa.</Text>
        <Text style={styles.text}>• Ajude quem precisar de apoio para se locomover.</Text>

        <Text style={styles.section}>🦽 Acessibilidade:</Text>
        <Text style={styles.text}>• Utilize rampas e evite escadas se tiver mobilidade reduzida.</Text>
        <Text style={styles.text}>• Avise equipes de resgate sobre sua condição especial.</Text>

        <Text style={styles.section}>🧰 Kit de emergência:</Text>
        <Text style={styles.text}>• Água, remédios, documentos e lanterna são essenciais.</Text>
      </Animated.View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 24, 
    backgroundColor: colors.gray
   },
  title: { 
    fontSize: 26,
     fontWeight: 'bold',
      color: colors.primary, 
      marginBottom: 15, 
      textAlign: 'center' 
    },
  section: { 
    fontSize: 18,
     fontWeight: '600',
      color: colors.secondary, 
      marginTop: 20 
    },
  text: { 
    fontSize: 16, 
    color: colors.text, 
    marginVertical: 6 
  },
});
