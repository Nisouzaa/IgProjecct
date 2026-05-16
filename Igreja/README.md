# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# ✝ Igreja — Sistema de Gestão

Sistema completo de gestão para igrejas com agenda, visitantes e dashboard.

## Estrutura do Projeto

```
Igreja/
├── index.html                  # Entry point do Vite
├── vite.config.js              # Configuração Vite + proxy para API
├── package.json
│
├── src/                        # FRONTEND (React)
│   ├── main.jsx                # Bootstrap do React
│   ├── App.jsx                 # Componente raiz + roteamento de páginas
│   │
│   ├── components/             # Componentes reutilizáveis
│   │   ├── layout/             # Estrutura visual global
│   │   │   ├── Sidebar.jsx     # Menu lateral
│   │   │   ├── Topbar.jsx      # Barra superior
│   │   │   └── AppShell.jsx    # Wrapper principal
│   │   ├── ui/                 # Componentes primitivos de UI
│   │   │   ├── Button.jsx
│   │   │   ├── Modal.jsx
│   │   │   ├── Badge.jsx
│   │   │   ├── Toast.jsx
│   │   │   └── EmptyState.jsx
│   │   ├── calendar/           # Componentes da agenda
│   │   │   ├── CalendarGrid.jsx
│   │   │   ├── EventForm.jsx
│   │   │   └── EventListItem.jsx
│   │   ├── visitors/           # Componentes de visitantes
│   │   │   ├── VisitorForm.jsx
│   │   │   ├── VisitorTable.jsx
│   │   │   └── VisitorDetail.jsx
│   │   └── dashboard/          # Componentes do dashboard
│   │       ├── StatCard.jsx
│   │       ├── UpcomingEvents.jsx
│   │       └── RecentVisitors.jsx
│   │
│   ├── pages/                  # Páginas da aplicação
│   │   ├── DashboardPage.jsx
│   │   ├── AgendaPage.jsx
│   │   └── VisitorsPage.jsx
│   │
│   ├── services/               # Camada de comunicação com a API
│   │   ├── api.js              # Cliente HTTP base
│   │   ├── eventsService.js    # CRUD de eventos
│   │   └── visitorsService.js  # CRUD de visitantes
│   │
│   ├── hooks/                  # Custom hooks React
│   │   ├── useEvents.js
│   │   ├── useVisitors.js
│   │   └── useToast.js
│   │
│   ├── constants/              # Constantes e dados fixos
│   │   └── index.js
│   │
│   └── styles/                 # CSS global e variáveis
│       ├── global.css
│       └── variables.css
│
└── backend/                    # BACKEND (Node.js + Express)
    ├── server.js               # Entry point do Express
    ├── package.json
    ├── database/
    │   └── db.js               # Banco em memória (seed data)
    ├── controllers/
    │   ├── eventsController.js
    │   └── visitorsController.js
    ├── routes/
    │   └── index.js
    └── middlewares/
        └── index.js
```

## Como Rodar

### Frontend
```bash
npm install
npm run dev       # http://localhost:3000
```

### Backend
```bash
cd backend
npm install
npm run dev       # http://localhost:3001
```

## API Endpoints

| Método | Rota                  | Descrição              |
|--------|-----------------------|------------------------|
| GET    | /api/events           | Listar eventos         |
| POST   | /api/events           | Criar evento           |
| PUT    | /api/events/:id       | Atualizar evento       |
| DELETE | /api/events/:id       | Remover evento         |
| GET    | /api/visitors         | Listar visitantes      |
| POST   | /api/visitors         | Cadastrar visitante    |
| PUT    | /api/visitors/:id     | Atualizar visitante    |
| DELETE | /api/visitors/:id     | Remover visitante      |
| GET    | /api/visitors/stats   | Estatísticas           |