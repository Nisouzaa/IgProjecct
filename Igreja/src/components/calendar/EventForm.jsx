import React, { useState } from 'react';
import Button from '../ui/Button';
import { CAT_LABELS, EVENT_DEFAULTS } from '../../constants';

/**
 * Formulário de criação/edição de evento.
 * @param {object} initial - dados iniciais (para edição)
 * @param {function} onSave - callback com os dados do formulário
 * @param {function} onClose - callback para fechar o modal
 */
const EventForm = ({ initial = {}, onSave, onClose }) => {
  const [form, setForm] = useState({ ...EVENT_DEFAULTS, ...initial });
  const set = (key, value) => setForm((prev) => ({ ...prev, [key]: value }));

  const handleSubmit = () => {
    if (!form.title || !form.date || !form.time || !form.category) {
      alert('Preencha os campos obrigatórios: título, data, hora e categoria.');
      return;
    }
    onSave(form);
  };

  return (
    <>
      <div className="form-group">
        <label className="form-label">Título *</label>
        <input className="form-control" value={form.title} onChange={(e) => set('title', e.target.value)} placeholder="Nome do evento" />
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Data *</label>
          <input type="date" className="form-control" value={form.date} onChange={(e) => set('date', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Categoria *</label>
          <select className="form-control" value={form.category} onChange={(e) => set('category', e.target.value)}>
            {Object.entries(CAT_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Início *</label>
          <input type="time" className="form-control" value={form.time} onChange={(e) => set('time', e.target.value)} />
        </div>
        <div className="form-group">
          <label className="form-label">Término</label>
          <input type="time" className="form-control" value={form.endTime} onChange={(e) => set('endTime', e.target.value)} />
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Local</label>
        <input className="form-control" value={form.location} onChange={(e) => set('location', e.target.value)} placeholder="Ex: Templo Principal, Sala 01..." />
      </div>
      <div className="form-group">
        <label className="form-label">Descrição</label>
        <textarea className="form-control" value={form.description} onChange={(e) => set('description', e.target.value)} placeholder="Detalhes sobre o evento..." />
      </div>
      <div className="form-group">
        <label style={{ display: 'flex', alignItems: 'center', gap: 8, fontSize: 13, cursor: 'pointer' }}>
          <input type="checkbox" checked={form.recurring} onChange={(e) => set('recurring', e.target.checked)} />
          Evento recorrente
        </label>
        {form.recurring && (
          <select className="form-control" style={{ marginTop: 8 }} value={form.recurrence} onChange={(e) => set('recurrence', e.target.value)}>
            <option value="weekly">Semanal</option>
            <option value="biweekly">Quinzenal</option>
            <option value="monthly">Mensal</option>
          </select>
        )}
      </div>

      <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 10, marginTop: 8 }}>
        <Button variant="ghost" onClick={onClose}>Cancelar</Button>
        <Button variant="primary" onClick={handleSubmit}>Salvar Evento</Button>
      </div>
    </>
  );
};

export default EventForm;