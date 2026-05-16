import api from './api';

/**
 * Camada de serviço para visitantes.
 */
const visitorsService = {
  /** Lista visitantes com filtros opcionais */
  getAll: ({ search, followUpStatus, startDate, endDate } = {}) => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (followUpStatus && followUpStatus !== 'todos') params.set('followUpStatus', followUpStatus);
    if (startDate) params.set('startDate', startDate);
    if (endDate) params.set('endDate', endDate);
    const qs = params.toString();
    return api.get(`/visitors${qs ? `?${qs}` : ''}`);
  },

  getById: (id) => api.get(`/visitors/${id}`),

  getStats: () => api.get('/visitors/stats'),

  create: (data) => api.post('/visitors', data),

  update: (id, data) => api.put(`/visitors/${id}`, data),

  remove: (id) => api.delete(`/visitors/${id}`),
};

export default visitorsService;