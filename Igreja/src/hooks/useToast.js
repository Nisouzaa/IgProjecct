import { useState, useCallback, useRef } from 'react';

/**
 * Hook para gerenciar notificações toast.
 * @returns {{ toasts, addToast }}
 */
const useToast = () => {
  const [toasts, setToasts] = useState([]);
  const idRef = useRef(0);

  const addToast = useCallback((message, type = 'success') => {
    const id = ++idRef.current;
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => setToasts((prev) => prev.filter((t) => t.id !== id)), 3000);
  }, []);

  return { toasts, addToast };
};

export default useToast;