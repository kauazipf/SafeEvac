import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppRoutes from './src/routes/Index';
import AuthStack from './src/routes/AuthStack';
import { ThemeProvider } from './src/styles/ThemeContext';

export default function App() {
  const [logado, setLogado] = useState<boolean | null>(null);

  useEffect(() => {
    const verificarLogin = async () => {
      const isLogado = await AsyncStorage.getItem('usuarioLogado');
      setLogado(isLogado === 'true');
    };

    const interval = setInterval(() => {
      verificarLogin();
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  if (logado === null) return null;

  return (
    <>
    <ThemeProvider>
      <NavigationContainer>
        {logado ? <AppRoutes /> : <AuthStack />}
      </NavigationContainer>
      <Toast />
    </ThemeProvider>
    </>
  );
}
