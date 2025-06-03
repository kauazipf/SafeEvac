## 🧭 SafeEvac – Sistema de Evacuação Inteligente

**Disciplina:** Mobile Application Development  
**Curso:** Análise e Desenvolvimento de Sistemas – FIAP  
**Desafio:** Global Solution 2025/1 – Eventos Extremos  
**Grupo:** Caetano Matos Penafiel, Kauã Fermino Zipf e Victor Egídio Lira

---

### 👥 Participantes
- Caetano Matos Penafiel – RM: 557984
- Kauã Fermino Zipf – RM: 558957
- Victor Egídio Lira – RM: 556653

---

### 📱 Sobre o Projeto

O **SafeEvac** é um aplicativo móvel desenvolvido com React Native que tem como objetivo auxiliar a evacuação de áreas de risco durante eventos extremos como enchentes, incêndios ou deslizamentos. O app é voltado especialmente para **pessoas com mobilidade reduzida**, oferecendo rotas acessíveis e alertas em tempo real.

---

### 🧩 Funcionalidades

✅ Tela inicial com introdução do projeto  
✅ Navegação por menu lateral (Drawer Navigation)  
✅ 5 telas principais:
- Início
- Rotas Seguras
- Alertas (com CRUD completo)
- Perfil do usuário
- Ajuda e instruções

✅ **CRUD completo de alertas**
- Criar, visualizar, editar e excluir alertas
- Integração com API RESTful via Axios
- Modal de edição
- Feedback visual com loading e erros

✅ Armazenamento local do perfil usando `AsyncStorage`

✅ Estilização moderna com tema baseado em azul escuro

✅ Acessibilidade visual e responsividade

---

### 🖌️ Identidade Visual

- Cor primária: `#0A2647`  
- Cor secundária: `#2C74B3`  
- Texto e elementos com alto contraste  
- Layout adaptado para mobile

---

### 🎥 Vídeo de Apresentação

📺 [Clique aqui para assistir no YouTube](https://www.youtube.com/watch?v=SEU_VIDEO_AQUI)  

---

### 🚀 Tecnologias Utilizadas

- React Native + Expo
- React Navigation (Drawer)
- Axios
- AsyncStorage
- TypeScript
- React Native Reanimated
- ESLint + Prettier

---

### 📂 Estrutura do Projeto

```
src/
├── components/
│   └── Card.tsx
├── screens/
│   ├── Home.tsx
│   ├── Routes.tsx
│   ├── AlertForm.tsx
│   ├── Profile.tsx
│   └── Help.tsx
├── services/
│   └── alertaService.ts
├── styles/
│   └── theme.ts
├── types/
│   ├── Alerta.ts
│   └── NavigationTypes.ts
└── AppRoutes.tsx
```

---

### 📌 Como rodar o projeto

1. Clone o repositório:
```bash
git clone https://github.com/kauazipf/SafeEvac.git
cd safeevac
```

2. Instale as dependências:
```bash
npm install
```

3. Rode o projeto:
```bash
npx expo start
```

---

### 💡 Observações Finais

- Este projeto faz parte da entrega do Global Solution 2025/1, integrando conhecimentos de desenvolvimento mobile com responsabilidade social e apoio a pessoas em vulnerabilidade.
