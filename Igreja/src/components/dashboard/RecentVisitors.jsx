import React from 'react';
import Button from '../ui/Button';
import { FollowUpBadge } from '../ui/Badge';
import EmptyState from '../ui/EmptyState';

const initials = (name) => name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();

/**
 * Lista dos visitantes mais recentes para o dashboard.
 */
const RecentVisitors = ({ visitors, onNavigate }) => {
  const recent = [...visitors]
    .sort((a, b) => new Date(b.visitDate) - new Date(a.visitDate))
    .slice(0, 5);

  return (
    <div className="card">
      <div className="card-header">
        <h3>Visitantes recentes</h3>
        <Button sm variant="ghost" onClick={() => onNavigate('visitantes')}>Ver todos</Button>
      </div>
      <div className="card-body" style={{ padding: '8px 24px' }}>
        {recent.length === 0 ? (
          <EmptyState icon="🙋" title="Nenhum visitante" />
        ) : recent.map((v) => (
          <div key={v.id} className="event-list-item">
            <div className="avatar" style={{ width: 30, height: 30, fontSize: 11 }}>{initials(v.name)}</div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: 13 }}>{v.name}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                {new Date(v.visitDate + 'T12:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })}
              </div>
            </div>
            <FollowUpBadge status={v.followUpStatus} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default RecentVisitors;