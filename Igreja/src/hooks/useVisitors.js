import { useState, useEffect, useCallback } from 'react';
import visitorsService from '../services/visitorsService';
import { MOCK_VISITORS } from '../constants';

/**
 * Hook para gerenciar o estado e as operações de visitantes.
 *
 * @returns {{ visitors, loading, backendOnline, addVisitor, editVisitor, removeVisitor }}
 */
const useVisitors = () => {
  const [visitors, setVisitors] = useState(MOCK_VISITORS);
  const [loading, setLoading] = useState(true);
  const [backendOnline, setBackendOnline] = useState(false);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await visitorsService.getAll();
        if (res.success) {
          setVisitors(res.data);
          setBackendOnline(true);
        }
      } catch {
        // Backend offline: mantém mock data
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const addVisitor = useCallback(async (form) => {
    if (backendOnline) {
      const res = await visitorsService.create(form);
      if (res.success) setVisitors((prev) => [...prev, res.data]);
    } else {
      const newVisitor = { ...form, id: String(Date.now()), createdAt: new Date().toISOString() };
      setVisitors((prev) => [...prev, newVisitor]);
    }
  }, [backendOnline]);

  const editVisitor = useCallback(async (id, form) => {
    if (backendOnline) {
      const res = await visitorsService.update(id, form);
      if (res.success) setVisitors((prev) => prev.map((v) => (v.id === id ? res.data : v)));
    } else {
      setVisitors((prev) => prev.map((v) => (v.id === id ? { ...v, ...form } : v)));
    }
  }, [backendOnline]);

  const removeVisitor = useCallback(async (id) => {
    if (backendOnline) await visitorsService.remove(id);
    setVisitors((prev) => prev.filter((v) => v.id !== id));
  }, [backendOnline]);

  return { visitors, loading, backendOnline, addVisitor, editVisitor, removeVisitor };
};

export default useVisitors;