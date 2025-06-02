import React, { useEffect } from 'react';
import AppRoutes from './src/routes';
import Toast from 'react-native-toast-message';
import * as Notifications from 'expo-notifications';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
    shouldShowBanner: true,
    shouldShowList: true,
  }),
});

export default function App() {
  useEffect(() => {
    const pedirPermissao = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        console.log('Permissão de notificação negada');
      }
    };

    pedirPermissao();
  }, []);

  return (
    <>
      <AppRoutes />
      <Toast />
    </>
  );
}
