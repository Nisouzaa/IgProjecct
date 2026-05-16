import React from 'react';
import { CheckIcon } from './Icons';

/** Contêiner de notificações toast */
const ToastContainer = ({ toasts }) => (
  <div className="toast-container">
    {toasts.map((t) => (
      <div key={t.id} className={`toast ${t.type}`}>
        {t.type === 'success' && <CheckIcon />}
        {t.message}
      </div>
    ))}
  </div>
);

export default ToastContainer;