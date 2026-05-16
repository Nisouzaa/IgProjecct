import React, { useState } from 'react';
import Button from '../ui/Button';
import { HOW_LABELS, FOLLOW_LABELS, VISITOR_DEFAULTS } from '../../constants';

/**
 * Formulário de cadastro/edição de visitante.
 */
const VisitorForm = ({ initial = {}, onSave, onClose }) => {
  const [form, setForm] = useState({ ...VISITOR_DEFAULTS, ...initial });
  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (!form.name || !form.visitDate) {
      alert('Preencha pelo menos o nome e a data da visita.');
      return;
    }
    onSave(form);
  };

  return (
    <>
      <div className="form-group">
        <label className="form-label">Nome completo *</label>
        <input className="form-control" value={form.name} onChange={(e) => set('name', e.target.value)} placeholder="Nome do visitante" />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Telefone</label>
          <input className="form-control" value={form.phone} onChange={(e) => set('phone', e.target.value)} placeholder="(11) 99999-9999" />
        </div>
        <div className="form-group">
          <label className="form-label">E-mail</label>
          <input type="email" className="form-control" value={form.email} onChange={(e) => set('email', e.target.value)} placeholder="email@exemplo.com" />
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Data da visita *</label>
          <input type="date" className="form-control" value={form.visitDate} onChange={(e) => set('visitDate', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Status</label>
          <select className="form-control" value={form.followUpStatus} onChange={(e) => set('followUpStatus', e.target.value)}>
            {Object.entries(FOLLOW_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Como nos encontrou</label>
        <select className="form-control" value={form.howFoundUs} onChange={(e) => set('howFoundUs', e.target.value)}>
          {Object.entries(HOW_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </div>
      <div className="form-group">
        <label className="form-label">Observações</label>
        <textarea className="form-control" value={form.observations} onChange={(e) => set('observations', e.target.value)} placeholder="Pedidos de oração, interesses, contato futuro..." />
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
        <Button variant="ghost" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit}>Salvar Visitante</Button>
      </div>
    </>
  );
};

export default VisitorForm;