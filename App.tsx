import React, { useEffect, useState } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Toast from 'react-native-toast-message';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppRoutes from './src/routes/Index';
import AuthStack from './src/routes/AuthStack';

export default function App() {
  const [logado, setLogado] = useState<boolean | null>(null);

  useEffect(() => {
    const verificarLogin = async () => {
      const isLogado = await AsyncStorage.getItem('usuarioLogado');
      setLogado(isLogado === 'true');
    };

    const interval = setInterval(() => {
      verificarLogin();
    }, 1000); // verifica a cada 1s

    return () => clearInterval(interval);
    verificarLogin();
  }, []);

  if (logado === null) return null;

  return (
    <>
    <NavigationContainer>
      {logado ? <AppRoutes /> : <AuthStack />}
    </NavigationContainer>
    <Toast />
  </>
  );
}
