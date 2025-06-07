import { I18n } from 'i18n-js';

// Traduções em português e inglês
const translations = {
  pt: {
    welcome: 'Bem-vindo ao Terra Segura',
    intro: 'Este aplicativo ajuda na evacuação de áreas de risco com rotas acessíveis e alertas de emergência.',
    routes_title: 'Rotas Seguras',
    routes_desc: 'Visualize no mapa as rotas de evacuação mais próximas e acessíveis.',
    alert_title: 'Registrar Alerta',
    alert_desc: 'Envie alertas sobre locais de risco em tempo real.',
    profile_title: 'Seu Perfil',
    profile_desc: 'Gerencie seu nome, e-mail e preferências de acessibilidade.',
  },
  en: {
    welcome: 'Welcome to Safe Land',
    intro: 'This app helps evacuate people from risk areas using safe and accessible routes.',
    routes_title: 'Safe Routes',
    routes_desc: 'View nearby and accessible evacuation routes on the map.',
    alert_title: 'Register Alert',
    alert_desc: 'Send real-time alerts about risk locations.',
    profile_title: 'Your Profile',
    profile_desc: 'Manage your name, email, and accessibility preferences.',
  },
};

const i18n = new I18n(translations);

// 🌍 Altere para 'en' se quiser inglês como padrão
i18n.locale = 'pt';
i18n.enableFallback = true;

export default i18n;
