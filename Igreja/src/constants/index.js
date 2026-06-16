// ─── Labels de categoria de evento ────────────────────────────────────────
export const CAT_LABELS = {
  culto: 'Culto',
  aula: 'Aula / EBD',
  evento: 'Evento',
  outro: 'Outro',
};

// ─── Labels de como o visitante encontrou a igreja ─────────────────────────
export const HOW_LABELS = {
  amigo: 'Indicação de amigo',
  redes_sociais: 'Redes sociais',
  passando_pela_frente: 'Passando pela frente',
  convite: 'Convite impresso',
  outro: 'Outro',
};

// ─── Labels de status de acompanhamento ───────────────────────────────────
export const FOLLOW_LABELS = {
  pendente: 'Pendente',
  contatado: 'Contatado',
  membro: 'Tornou-se membro',
};

// ─── Dias da semana e meses em PT-BR ──────────────────────────────────────
export const DAYS_OF_WEEK = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

export const MONTHS = [
  'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
  'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro',
];

// ─── Valores padrão dos formulários ───────────────────────────────────────
export const EVENT_DEFAULTS = {
  title: '',
  description: '',
  date: '',
  time: '',
  endTime: '',
  category: 'culto',
  location: '',
  recurring: false,
  recurrence: 'weekly',
};

export const VISITOR_DEFAULTS = {
  name: '',
  email: '',
  phone: '',
  visitDate: new Date().toISOString().split('T')[0],
  howFoundUs: 'amigo',
  observations: '',
  followUpStatus: 'pendente',
};

// // ─── Mock data (usado quando o backend está offline) ──────────────────────
export const MOCK_EVENTS = [];
//   {
//     id: '1',
//     title: 'Culto de Domingo',
//     date: new Date().toISOString().split('T')[0],
//     time: '10:00',
//     endTime: '12:00',
//     category: 'culto',
//     location: 'Templo Principal',
//     description: 'Culto principal com louvor e pregação',
//     recurring: true,
//     recurrence: 'weekly',
//   },
//   {
//     id: '2',
//     title: 'Escola Bíblica',
//     date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
//     time: '09:00',
//     endTime: '10:30',
//     category: 'aula',
//     location: 'Sala 01',
//     description: 'Estudo das escrituras',
//     recurring: true,
//     recurrence: 'weekly',
//   },
//   {
//     id: '3',
//     title: 'Reunião de Jovens',
//     date: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0],
//     time: '19:00',
//     endTime: '21:00',
//     category: 'evento',
//     location: 'Salão Social',
//     description: 'Encontro semanal dos jovens',
//     recurring: true,
//     recurrence: 'weekly',
//   },
//   {
//     id: '4',
//     title: 'Culto de Quarta',
//     date: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
//     time: '19:30',
//     endTime: '21:00',
//     category: 'culto',
//     location: 'Templo Principal',
//     description: 'Culto de oração e intercessão',
//     recurring: true,
//     recurrence: 'weekly',
//   },
// ];

export const MOCK_VISITORS = [];
//   {
//     id: '',
//     name: '',
//     email: '',
//     phone: '',
//     visitDate: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0],
//     howFoundUs: '',
//     observations: '',
//     followUpStatus: '',
//   },
//   {
//     id: '',
//     name: '',
//     email: '',
//     phone: '',
//     visitDate: new Date(Date.now() - 14 * 86400000).toISOString().split('T')[0],
//     howFoundUs: '',
//     observations: '',
//     followUpStatus: '',
//   },
//   {
//     id: '',
//     name: '',
//     email: '',
//     phone: '',
//     visitDate: new Date().toISOString().split('T')[0],
//     howFoundUs: '',
//     observations: '',
//     followUpStatus: '',
//   },
// ];
