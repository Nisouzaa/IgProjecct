import { useState, useEffect, useCallback } from 'react';

/**
 * Hook genérico para gerenciar recursos com CRUD.
 * Conecta ao backend via `service` e faz fallback para `mockData` se offline.
 *
 * @param {object} service  - deve implementar: getAll(), create(data), update(id, data), delete(id)
 * @param {Array}  mockData - dados de fallback quando o backend está offline
 */
const useResource = (service, mockData = []) => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [backendOnline, setBackendOnline] = useState(false);

  useEffect(() => {
    let cancelled = false;

    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await service.getAll();
        if (!cancelled) {
          // Backend retorna { success: true, data: [...] }
          const result = Array.isArray(response) ? response : (response.data ?? []);
          setItems(result);
          setBackendOnline(true);
        }
      } catch {
        if (!cancelled) {
          setItems(mockData);
          setBackendOnline(false);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    };

    fetchData();

    return () => { cancelled = true; };
  }, [service]); // eslint-disable-line react-hooks/exhaustive-deps

  const addItem = useCallback(async (data) => {
    try {
      const response = await service.create(data);
      const created = response.data ?? response;
      setItems(prev => [...prev, created]);
    } catch {
      const fallback = { ...data, id: Date.now() };
      setItems(prev => [...prev, fallback]);
    }
  }, [service]);

  const editItem = useCallback(async (id, updates) => {
    try {
      const response = await service.update(id, updates);
      const updated = response.data ?? response;
      setItems(prev => prev.map(item => item.id === id ? updated : item));
    } catch {
      setItems(prev => prev.map(item => item.id === id ? { ...item, ...updates } : item));
    }
  }, [service]);

  const removeItem = useCallback(async (id) => {
    try {
      await service.remove(id);
    } catch {
      // Remove localmente mesmo sem confirmar no backend
    } finally {
      setItems(prev => prev.filter(item => item.id !== id));
    }
  }, [service]);

  return { items, loading, backendOnline, addItem, editItem, removeItem };
};

export default useResource;