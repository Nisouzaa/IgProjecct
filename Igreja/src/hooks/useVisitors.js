import { useMemo } from 'react';
import visitorsService from '../services/visitorsService';
import { MOCK_VISITORS } from '../constants';
import useResource from './useResource';  

/**
 * Hook para gerenciar visitantes.
 * Wrapper fino sobre useResource — toda a lógica genérica fica lá.
 *
 * @returns {{ visitors, loading, backendOnline, addVisitor, editVisitor, removeVisitor }}
 */
const useVisitors = () => {
  const service = useMemo(() => visitorsService, []);

  const {
    items: visitors,
    loading,
    backendOnline,
    addItem: addVisitor,
    editItem: editVisitor,
    removeItem: removeVisitor,
  } = useResource(service, MOCK_VISITORS);

  return { visitors, loading, backendOnline, addVisitor, editVisitor, removeVisitor };
};

export default useVisitors;