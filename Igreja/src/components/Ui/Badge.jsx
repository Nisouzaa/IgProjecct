import React from 'react';
import { CAT_LABELS, FOLLOW_LABELS } from '../../constants';

const badgeStyles = {
  base: {
    display: 'inline-flex', alignItems: 'center', gap: 4,
    fontSize: 11, fontWeight: 500, padding: '3px 8px', borderRadius: 20,
  },
  culto: { background: '#F0DFA0', color: '#8B6914' },
  aula: { background: '#B5D4F4', color: '#0C447C' },
  evento: { background: '#C0DD97', color: '#3B6D11' },
  outro: { background: '#D3D1C7', color: '#2C2C2A' },
  pendente: { background: 'var(--warning-bg)', color: 'var(--warning)' },
  contatado: { background: 'var(--success-bg)', color: 'var(--success)' },
  membro: { background: 'var(--info-bg)', color: 'var(--info)' },
};

/** Badge genérica que aceita um `type` correspondente a categoria ou status */
const Badge = ({ type, label }) => (
  <span style={{ ...badgeStyles.base, ...(badgeStyles[type] || badgeStyles.outro) }}>
    {label || type}
  </span>
);

/** Badge de categoria de evento */
export const CategoryBadge = ({ category }) => (
  <Badge type={category} label={CAT_LABELS[category] || category} />
);

/** Badge de status de acompanhamento */
export const FollowUpBadge = ({ status }) => (
  <Badge type={status} label={FOLLOW_LABELS[status] || status} />
);

export default Badge;