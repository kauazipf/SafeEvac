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

O **SafeEvac** é um aplicativo móvel desenvolvido com React Native que tem como objetivo auxiliar a evacuação de áreas de risco durante eventos extremos como enchentes, incêndios ou deslizamentos. O app é voltado especialmente para **pessoas com mobilidade reduzida**, oferecendo rotas acessíveis, alertas em tempo real e perfil com informações pessoais relevantes.

---

### 🧩 Funcionalidades

✅ Tela inicial com introdução do projeto  
✅ Login e Registro de usuários com dados pessoais  
✅ Navegação por menu lateral (Drawer Navigation)  
✅ 5 telas principais:
- Início
- **Mapa com localização e busca por destino**
- Alertas (com CRUD completo e paginação)
- Perfil do usuário com edição
- Ajuda e instruções

✅ **CRUD completo de alertas**
- Criar, visualizar, editar e excluir alertas
- Integração com API RESTful via Axios
- Modal de edição
- Paginação entre alertas
- Feedback visual com loading e erros

✅ **Mapa interativo**
- Localização atual com marcador
- Busca de destino por latitude/longitude

✅ **Perfil com dados pessoais**
- Armazenamento local via `AsyncStorage`
- Edição dos dados cadastrados (nome, e-mail, telefone, cidade, estado)

✅ **Autenticação básica**
- Tela de login com validação
- Tela de registro com múltiplos campos
- Redirecionamento de rota com base na autenticação

✅ Estilização moderna com tema baseado em azul escuro  
✅ Acessibilidade visual, responsividade e experiência intuitiva

---

### 🖌️ Identidade Visual

- Cor primária: `#0A2647`  
- Cor secundária: `#2C74B3`  
- Alto contraste para acessibilidade  
- Layout com sombras, espaçamento generoso e foco em usabilidade

---

### 🎥 Vídeo de Apresentação

📺 [Clique aqui para assistir no YouTube](https://www.youtube.com/watch?v=SEU_VIDEO_AQUI)

---

### 🚀 Tecnologias Utilizadas

- React Native + Expo
- React Navigation (Drawer + Stack)
- Axios
- AsyncStorage
- TypeScript
- React Native Maps
- React Native Reanimated
- ESLint + Prettier

---

### 📂 Estrutura do Projeto

```
src/
├── components/
│   └── BotaoAbrirMenu.tsx
├── data/
│   └── rotas.ts
├── hooks/
│   └── useMyLocation.ts
├── i18n/
│   └── translations.js
├── routes/
│   ├── AuthStack.tsx
│   └── Index.tsx
├── screens/
│   ├── AlertForm.tsx
│   ├── Help.tsx
│   ├── Home.tsx
│   ├── Login.tsx
│   ├── MapScreen.tsx
│   ├── Profile.tsx
│   └── Register.tsx
├── services/
│   ├── notificationService.ts
│   └── regionService.ts
├── styles/
│   └── theme.ts
├── types/
│   ├── NavigationTypes.ts
│   └── Region.ts
└── utils/
    └── toast.ts
```

---

### 📌 Como rodar o projeto (App)

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

### ⚙️ Como rodar a API Java (Spring Boot)

> A API responsável pela gestão de alertas e regiões monitoradas deve estar rodando localmente antes de iniciar o app mobile.

#### ✅ Pré-requisitos
- Java 17+
- Maven 3.8+
- Banco de dados configurado (ex: PostgreSQL, MySQL ou H2)
- IDE (ex: IntelliJ, Eclipse) ou terminal

#### 🛠️ Passos para rodar:

1. Clone o repositório da API:
```bash
git clone https://github.com/seu-usuario/terra-segura-api.git
cd terra-segura-api
```

2. Configure o `application.properties` ou `application.yml`:
```properties
spring.datasource.url=jdbc:mysql://localhost:3306/terra_segura
spring.datasource.username=root
spring.datasource.password=senha
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

3. Rode a aplicação:
```bash
./mvnw spring-boot:run
```
ou
```bash
mvn spring-boot:run
```

4. Acesse a API:
```
http://localhost:8080
```

---

### 💡 Observações Finais

- Este projeto faz parte da entrega do Global Solution 2025/1, integrando conhecimentos de desenvolvimento mobile com responsabilidade social e apoio a pessoas em vulnerabilidade.
- O botão de notificação presente no app é uma simulação local de uma possível notificação, que poderá ser enviada automaticamente ao usuário caso ele esteja próximo de uma área de risco identificada no sistema.