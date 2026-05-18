import express from 'express';
import cors from 'cors';
import crypto from 'crypto';

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

// ─── Dados em memória (substituir por banco de dados futuramente) ───────────

let events = [
  {
    id: '1',
    title: 'Culto de Domingo',
    date: new Date().toISOString().split('T')[0],
    time: '10:00',
    endTime: '12:00',
    category: 'culto',
    location: 'Templo Principal',
    description: 'Culto principal com louvor e pregação',
    recurring: true,
    recurrence: 'weekly',
  },
  {
    id: '2',
    title: 'Escola Bíblica',
    date: new Date(Date.now() + 2 * 86400000).toISOString().split('T')[0],
    time: '09:00',
    endTime: '10:30',
    category: 'aula',
    location: 'Sala 01',
    description: 'Estudo das escrituras',
    recurring: true,
    recurrence: 'weekly',
  },
  {
    id: '3',
    title: 'Reunião de Jovens',
    date: new Date(Date.now() + 4 * 86400000).toISOString().split('T')[0],
    time: '19:00',
    endTime: '21:00',
    category: 'evento',
    location: 'Salão Social',
    description: 'Encontro semanal dos jovens',
    recurring: true,
    recurrence: 'weekly',
  },
  {
    id: '4',
    title: 'Culto de Quarta',
    date: new Date(Date.now() + 3 * 86400000).toISOString().split('T')[0],
    time: '19:30',
    endTime: '21:00',
    category: 'culto',
    location: 'Templo Principal',
    description: 'Culto de oração e intercessão',
    recurring: true,
    recurrence: 'weekly',
  },
];

let visitors = [
  {
    id: '1',
    name: 'Ana Souza',
    email: 'ana@email.com',
    phone: '(11) 98765-4321',
    visitDate: new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0],
    howFoundUs: 'amigo',
    observations: 'Pediu mais informações sobre a Escola Bíblica',
    followUpStatus: 'pendente',
  },
  {
    id: '2',
    name: 'Carlos Mendes',
    email: 'carlos@email.com',
    phone: '(11) 91234-5678',
    visitDate: new Date(Date.now() - 14 * 86400000).toISOString().split('T')[0],
    howFoundUs: 'redes_sociais',
    observations: 'Interessado no grupo de jovens',
    followUpStatus: 'contatado',
  },
  {
    id: '3',
    name: 'Maria Oliveira',
    email: '',
    phone: '(11) 99876-5432',
    visitDate: new Date().toISOString().split('T')[0],
    howFoundUs: 'passando_pela_frente',
    observations: 'Primeira visita hoje',
    followUpStatus: 'pendente',
  },
];

// ─── Rotas de Eventos ──────────────────────────────────────────────────────

// GET /api/events — lista com filtros opcionais: month, year, category
app.get('/api/events', (req, res) => {
  const { month, year, category } = req.query;

  let result = [...events];

  if (month) {
    result = result.filter(e => {
      const d = new Date(e.date + 'T00:00:00');
      return String(d.getMonth() + 1) === String(month);
    });
  }

  if (year) {
    result = result.filter(e => {
      const d = new Date(e.date + 'T00:00:00');
      return String(d.getFullYear()) === String(year);
    });
  }

  if (category && category !== 'todos') {
    result = result.filter(e => e.category === category);
  }

  res.json({ success: true, data: result });
});

// GET /api/events/:id — busca por ID
app.get('/api/events/:id', (req, res) => {
  const event = events.find(e => e.id === req.params.id);
  if (!event) {
    return res.status(404).json({ success: false, message: 'Evento não encontrado' });
  }
  res.json({ success: true, data: event });
});

// POST /api/events — cria evento
app.post('/api/events', (req, res) => {
  const newEvent = {
    id: crypto.randomUUID(),
    ...req.body,
  };
  events.push(newEvent);
  res.status(201).json({ success: true, data: newEvent });
});

// PUT /api/events/:id — atualiza evento
app.put('/api/events/:id', (req, res) => {
  const index = events.findIndex(e => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Evento não encontrado' });
  }
  events[index] = { ...events[index], ...req.body };
  res.json({ success: true, data: events[index] });
});

// DELETE /api/events/:id — remove evento
app.delete('/api/events/:id', (req, res) => {
  const index = events.findIndex(e => e.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Evento não encontrado' });
  }
  events.splice(index, 1);
  res.json({ success: true, message: 'Evento removido com sucesso' });
});

// ─── Rotas de Visitantes ───────────────────────────────────────────────────

// GET /api/visitors — lista com filtros opcionais: search, followUpStatus, startDate, endDate
app.get('/api/visitors', (req, res) => {
  const { search, followUpStatus, startDate, endDate } = req.query;

  let result = [...visitors];

  if (search) {
    const term = search.toLowerCase();
    result = result.filter(
      v =>
        v.name.toLowerCase().includes(term) ||
        v.email.toLowerCase().includes(term) ||
        v.phone.includes(term)
    );
  }

  if (followUpStatus && followUpStatus !== 'todos') {
    result = result.filter(v => v.followUpStatus === followUpStatus);
  }

  if (startDate) {
    result = result.filter(v => v.visitDate >= startDate);
  }

  if (endDate) {
    result = result.filter(v => v.visitDate <= endDate);
  }

  res.json({ success: true, data: result });
});

// GET /api/visitors/stats — estatísticas gerais
app.get('/api/visitors/stats', (req, res) => {
  const total = visitors.length;
  const pendente = visitors.filter(v => v.followUpStatus === 'pendente').length;
  const contatado = visitors.filter(v => v.followUpStatus === 'contatado').length;
  const integrado = visitors.filter(v => v.followUpStatus === 'integrado').length;

  res.json({
    success: true,
    data: { total, pendente, contatado, integrado },
  });
});

// GET /api/visitors/:id — busca por ID
app.get('/api/visitors/:id', (req, res) => {
  const visitor = visitors.find(v => v.id === req.params.id);
  if (!visitor) {
    return res.status(404).json({ success: false, message: 'Visitante não encontrado' });
  }
  res.json({ success: true, data: visitor });
});

// POST /api/visitors — cria visitante
app.post('/api/visitors', (req, res) => {
  const newVisitor = {
    id: crypto.randomUUID(),
    ...req.body,
  };
  visitors.push(newVisitor);
  res.status(201).json({ success: true, data: newVisitor });
});

// PUT /api/visitors/:id — atualiza visitante
app.put('/api/visitors/:id', (req, res) => {
  const index = visitors.findIndex(v => v.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Visitante não encontrado' });
  }
  visitors[index] = { ...visitors[index], ...req.body };
  res.json({ success: true, data: visitors[index] });
});

// DELETE /api/visitors/:id — remove visitante
app.delete('/api/visitors/:id', (req, res) => {
  const index = visitors.findIndex(v => v.id === req.params.id);
  if (index === -1) {
    return res.status(404).json({ success: false, message: 'Visitante não encontrado' });
  }
  visitors.splice(index, 1);
  res.json({ success: true, message: 'Visitante removido com sucesso' });
});

// ─── Inicialização ─────────────────────────────────────────────────────────

app.listen(PORT, () => {
  console.log(`✅ Backend rodando em http://localhost:${PORT}`);
});