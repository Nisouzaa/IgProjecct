import { useState, useEffect, useCallback } from 'react';
import eventsService from '../services/eventsService';
import { MOCK_EVENTS } from '../constants';

/**
 * Hook para gerenciar o estado e as operações de eventos.
 * Tenta carregar do backend; caso offline, usa mock data.
 *
 * @returns {{ events, loading, backendOnline, addEvent, editEvent, removeEvent }}
 */
const useEvents = () => {
  const [events, setEvents] = useState(MOCK_EVENTS);
  const [loading, setLoading] = useState(true);
  const [backendOnline, setBackendOnline] = useState(false);

  // Carrega eventos ao montar
  useEffect(() => {
    const load = async () => {
      try {
        const res = await eventsService.getAll();
        if (res.success) {
          setEvents(res.data);
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

  const addEvent = useCallback(async (form) => {
    if (backendOnline) {
      const res = await eventsService.create(form);
      if (res.success) setEvents((prev) => [...prev, res.data]);
    } else {
      const newEvent = { ...form, id: String(Date.now()), createdAt: new Date().toISOString() };
      setEvents((prev) => [...prev, newEvent]);
    }
  }, [backendOnline]);

  const editEvent = useCallback(async (id, form) => {
    if (backendOnline) {
      const res = await eventsService.update(id, form);
      if (res.success) setEvents((prev) => prev.map((e) => (e.id === id ? res.data : e)));
    } else {
      setEvents((prev) => prev.map((e) => (e.id === id ? { ...e, ...form } : e)));
    }
  }, [backendOnline]);

  const removeEvent = useCallback(async (id) => {
    if (backendOnline) await eventsService.remove(id);
    setEvents((prev) => prev.filter((e) => e.id !== id));
  }, [backendOnline]);

  return { events, loading, backendOnline, addEvent, editEvent, removeEvent };
};

export default useEvents;