import { Alert } from 'react-native';

export function dispararNotificacaoFake() {
  setTimeout(() => {
    Alert.alert(
      'Alerta de evacuação 🚨',
      'Verifique as rotas seguras disponíveis agora.'
    );
  }, 2000);
}
