import { useMemo } from 'react';
import useResource from './useResource';
import eventsService from '../services/eventsService';
import { MOCK_EVENTS } from '../constants';

/**
 * Hook para gerenciar eventos.
 * Wrapper fino sobre useResource — toda a lógica genérica fica lá.
 *
 * @returns {{ events, loading, backendOnline, addEvent, editEvent, removeEvent }}
 */
const useEvents = () => {
  // Estabiliza a referência do service para não re-executar o useEffect do useResource
  const service = useMemo(() => eventsService, []);

  const {
    items: events,
    loading,
    backendOnline,
    addItem: addEvent,
    editItem: editEvent,
    removeItem: removeEvent,
  } = useResource(service, MOCK_EVENTS);

  return { events, loading, backendOnline, addEvent, editEvent, removeEvent };
};

export default useEvents;