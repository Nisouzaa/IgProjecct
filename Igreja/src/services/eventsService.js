import api from './api';

/**
 * Camada de serviço para eventos.
 * Isola a comunicação com a API do restante do frontend.
 */
const eventsService = {
  /** Lista eventos, com filtros opcionais de mês/ano/categoria */
  getAll: ({ month, year, category } = {}) => {
    const params = new URLSearchParams();
    if (month) params.set('month', month);
    if (year) params.set('year', year);
    if (category && category !== 'todos') params.set('category', category);
    const qs = params.toString();
    return api.get(`/events${qs ? `?${qs}` : ''}`);
  },

  getById: (id) => api.get(`/events/${id}`),

  create: (data) => api.post('/events', data),

  update: (id, data) => api.put(`/events/${id}`, data),

  remove: (id) => api.delete(`/events/${id}`),
};

export default eventsService;