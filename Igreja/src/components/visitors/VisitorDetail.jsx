import React from 'react';
import Modal from '../ui/Modal';
import Button from '../ui/Button';
import { FollowUpBadge } from '../ui/Badge';
import { CalendarIcon, PhoneIcon, MailIcon } from '../ui/Icons';
import { HOW_LABELS } from '../../constants';

const initials = (name) => name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();

/**
 * Modal de detalhe de um visitante.
 */
const VisitorDetail = ({ visitor, onClose, onEdit, onDelete }) => (
  <Modal
    title={visitor.name}
    onClose={onClose}
    footer={
      <>
        <Button sm variant="danger" onClick={() => onDelete(visitor.id)}>Excluir</Button>
        <Button variant="ghost" onClick={onClose}>Fechar</Button>
        <Button variant="primary" onClick={() => onEdit(visitor)}>Editar</Button>
      </>
    }
  >
    <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 20 }}>
      <div className="avatar" style={{ width: 48, height: 48, fontSize: 16 }}>{initials(visitor.name)}</div>
      <div>
        <div style={{ fontWeight: 500, fontSize: 15 }}>{visitor.name}</div>
        <div style={{ marginTop: 4 }}><FollowUpBadge status={visitor.followUpStatus} /></div>
      </div>
    </div>

    <div className="detail-row">
      <span className="detail-label"><CalendarIcon /> Visita</span>
      <span>{new Date(visitor.visitDate + 'T12:00').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}</span>
    </div>
    {visitor.phone && (
      <div className="detail-row">
        <span className="detail-label"><PhoneIcon /> Telefone</span>
        <span>{visitor.phone}</span>
      </div>
    )}
    {visitor.email && (
      <div className="detail-row">
        <span className="detail-label"><MailIcon /> E-mail</span>
        <span>{visitor.email}</span>
      </div>
    )}
    <div className="detail-row">
      <span className="detail-label">Como chegou</span>
      <span>{HOW_LABELS[visitor.howFoundUs] || visitor.howFoundUs}</span>
    </div>
    {visitor.observations && (
      <div className="detail-row" style={{ flexDirection: 'column', gap: 6 }}>
        <span className="detail-label">Observações</span>
        <span style={{ color: 'var(--text-secondary)', lineHeight: 1.6 }}>{visitor.observations}</span>
      </div>
    )}
  </Modal>
);

export default VisitorDetail;