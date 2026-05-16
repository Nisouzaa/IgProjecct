import React from 'react';
import Button from '../ui/Button';
import { CategoryBadge } from '../ui/Badge';
import { EditIcon, TrashIcon } from '../ui/Icons';

/**
 * Item de evento na listagem abaixo do calendário.
 */
const EventListItem = ({ event, onEdit, onDelete }) => {
  const dateLabel = new Date(event.date + 'T12:00').toLocaleDateString('pt-BR', {
    weekday: 'short', day: '2-digit', month: 'short',
  });

  return (
    <div className="event-list-item">
      <div className={`event-dot dot-${event.category}`} />
      <div style={{ flex: 1 }}>
        <div style={{ fontWeight: 500, fontSize: 14 }}>{event.title}</div>
        <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 2 }}>
          {dateLabel} · {event.time}{event.endTime ? ` – ${event.endTime}` : ''}
          {event.location ? ` · ${event.location}` : ''}
        </div>
      </div>
      <div style={{ display: 'flex', gap: 4, alignItems: 'center' }}>
        <CategoryBadge category={event.category} />
        <Button icon sm variant="ghost" onClick={() => onEdit(event)}>
          <EditIcon />
        </Button>
        <Button icon sm variant="ghost" style={{ color: 'var(--danger)' }} onClick={() => onDelete(event.id)}>
          <TrashIcon />
        </Button>
      </div>
    </div>
  );
};

export default EventListItem;