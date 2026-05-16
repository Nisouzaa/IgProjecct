import React, { useEffect } from 'react';
import Button from './Button';
import { XIcon } from './Icons';

/**
 * Modal acessível com overlay, título, corpo e rodapé opcional.
 * Fecha ao pressionar Escape ou clicar no overlay.
 */
const Modal = ({ title, onClose, children, footer }) => {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    document.addEventListener('keydown', handler);
    return () => document.removeEventListener('keydown', handler);
  }, [onClose]);

  return (
    <div
      className="modal-overlay"
      style={{
        position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.45)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        zIndex: 200, padding: 20,
      }}
      onClick={(e) => e.target === e.currentTarget && onClose()}
    >
      <div
        style={{
          background: 'var(--surface)', borderRadius: 'var(--radius-lg)',
          width: '100%', maxWidth: 520, maxHeight: '90vh', overflowY: 'auto',
          boxShadow: '0 20px 60px rgba(0,0,0,0.25)',
        }}
      >
        {/* Header */}
        <div style={{ padding: '20px 24px 16px', borderBottom: '1px solid var(--border)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <h3 style={{ fontFamily: 'var(--font-display)', fontSize: 18, fontWeight: 500 }}>{title}</h3>
          <Button icon variant="ghost" onClick={onClose} aria-label="Fechar modal">
            <XIcon />
          </Button>
        </div>

        {/* Body */}
        <div style={{ padding: '20px 24px' }}>{children}</div>

        {/* Footer */}
        {footer && (
          <div style={{ padding: '16px 24px 20px', borderTop: '1px solid var(--border)', display: 'flex', justifyContent: 'flex-end', gap: 10 }}>
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default Modal;