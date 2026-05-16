/**
 * Cliente HTTP base.
 * Usa o proxy do Vite em dev (/api → http://localhost:3001/api)
 * Em produção, ajuste BASE_URL via variável de ambiente.
 */

const BASE_URL = import.meta.env.VITE_API_URL || '/api';

const request = async (method, path, body) => {
  const options = {
    method,
    headers: { 'Content-Type': 'application/json' },
  };
  if (body) options.body = JSON.stringify(body);

  const res = await fetch(`${BASE_URL}${path}`, options);
  const data = await res.json();
  if (!res.ok) throw new Error(data.message || 'Erro na requisição');
  return data;
};

const api = {
  get: (path) => request('GET', path),
  post: (path, body) => request('POST', path, body),
  put: (path, body) => request('PUT', path, body),
  delete: (path) => request('DELETE', path),
};

export default api;