import React from 'react';
import Button from '../ui/Button';
import { CategoryBadge } from '../ui/Badge';
import EmptyState from '../ui/EmptyState';

/**
 * Lista dos próximos eventos para o dashboard.
 */
const UpcomingEvents = ({ events, onNavigate }) => {
  const today = new Date();
  const upcoming = [...events]
    .filter((e) => new Date(e.date) >= today)
    .sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`))
    .slice(0, 5);

  return (
    <div className="card">
      <div className="card-header">
        <h3>Próximos eventos</h3>
        <Button sm variant="ghost" onClick={() => onNavigate('agenda')}>Ver agenda</Button>
      </div>
      <div className="card-body" style={{ padding: '8px 24px' }}>
        {upcoming.length === 0 ? (
          <EmptyState icon="📅" title="Sem eventos" />
        ) : upcoming.map((ev) => (
          <div key={ev.id} className="event-list-item">
            <div className={`event-dot dot-${ev.category}`} />
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 500, fontSize: 13 }}>{ev.title}</div>
              <div style={{ fontSize: 11, color: 'var(--text-secondary)' }}>
                {new Date(ev.date + 'T12:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' })} · {ev.time}
              </div>
            </div>
            <CategoryBadge category={ev.category} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default UpcomingEvents;