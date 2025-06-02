import Toast from 'react-native-toast-message';

export function showSuccess(message: string) {
  Toast.show({
    type: 'success',
    text1: 'Sucesso',
    text2: message,
  });
}

export function showError(message: string) {
  Toast.show({
    type: 'error',
    text1: 'Erro',
    text2: message,
  });
}

export function showInfo(message: string) {
  Toast.show({
    type: 'info',
    text1: 'Aviso',
    text2: message,
  });
}
