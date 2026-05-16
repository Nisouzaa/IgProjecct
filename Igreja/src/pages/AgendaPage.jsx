import React, { useState } from 'react';
import CalendarGrid from '../components/calendar/CalendarGrid';
import EventForm from '../components/calendar/EventForm';
import EventListItem from '../components/calendar/EventListItem';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import EmptyState from '../components/ui/EmptyState';
import { CategoryBadge } from '../components/ui/Badge';
import { ChevronLeftIcon, ChevronRightIcon, PlusIcon, EditIcon, TrashIcon, ClockIcon, MapPinIcon, CalendarIcon } from '../components/ui/Icons';
import { MONTHS, CAT_LABELS } from '../constants';

/**
 * Página de Agenda — calendário mensal + lista de eventos.
 */
const AgendaPage = ({ events, onAddEvent, onEditEvent, onDeleteEvent, addToast }) => {
  const today = new Date();
  const [current, setCurrent] = useState({ year: today.getFullYear(), month: today.getMonth() });
  const [catFilter, setCatFilter] = useState('todos');
  const [modal, setModal] = useState(null); // null | { mode: 'add'|'edit'|'view', event?, date? }

  const prevMonth = () => setCurrent((c) => c.month === 0 ? { year: c.year - 1, month: 11 } : { ...c, month: c.month - 1 });
  const nextMonth = () => setCurrent((c) => c.month === 11 ? { year: c.year + 1, month: 0 } : { ...c, month: c.month + 1 });

  const filteredEvents = events.filter((e) => catFilter === 'todos' || e.category === catFilter);

  const monthEvents = filteredEvents.filter((e) => {
    const d = new Date(e.date);
    return d.getMonth() === current.month && d.getFullYear() === current.year;
  }).sort((a, b) => new Date(`${a.date}T${a.time}`) - new Date(`${b.date}T${b.time}`));

  const handleSave = async (form) => {
    if (modal.mode === 'edit') {
      await onEditEvent(modal.event.id, form);
      addToast('Evento atualizado!', 'success');
    } else {
      await onAddEvent(form);
      addToast('Evento criado!', 'success');
    }
    setModal(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Remover este evento?')) return;
    await onDeleteEvent(id);
    addToast('Evento removido.', 'success');
    setModal(null);
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500 }}>Agenda</h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>Gerencie cultos, aulas e eventos</p>
        </div>
        <Button variant="primary" onClick={() => setModal({ mode: 'add', date: today.toISOString().split('T')[0] })}>
          <PlusIcon /> Novo Evento
        </Button>
      </div>

      {/* Filtros por categoria */}
      <div className="tabs" style={{ marginBottom: 16 }}>
        {['todos', 'culto', 'aula', 'evento', 'outro'].map((c) => (
          <button key={c} className={`tab ${catFilter === c ? 'active' : ''}`} onClick={() => setCatFilter(c)}>
            {c === 'todos' ? 'Todos' : CAT_LABELS[c]}
          </button>
        ))}
      </div>

      {/* Calendário */}
      <div className="card" style={{ marginBottom: 20 }}>
        <div className="card-body">
          <div className="cal-nav">
            <h3>{MONTHS[current.month]} {current.year}</h3>
            <div className="cal-nav-btns">
              <Button icon variant="ghost" onClick={prevMonth}><ChevronLeftIcon /></Button>
              <Button sm variant="ghost" onClick={() => setCurrent({ year: today.getFullYear(), month: today.getMonth() })}>Hoje</Button>
              <Button icon variant="ghost" onClick={nextMonth}><ChevronRightIcon /></Button>
            </div>
          </div>
          <CalendarGrid
            year={current.year}
            month={current.month}
            events={filteredEvents}
            onDayClick={(date) => setModal({ mode: 'add', date })}
            onEventClick={(ev) => setModal({ mode: 'view', event: ev })}
          />
        </div>
      </div>

      {/* Lista do mês */}
      <div className="card">
        <div className="card-header">
          <h3>Eventos do mês</h3>
          <span style={{ fontSize: 12, color: 'var(--text-hint)' }}>{monthEvents.length} evento{monthEvents.length !== 1 ? 's' : ''}</span>
        </div>
        <div className="card-body" style={{ padding: '8px 24px' }}>
          {monthEvents.length === 0 ? (
            <EmptyState icon="📅" title="Nenhum evento neste mês" description='Clique em um dia ou no botão "Novo Evento".' />
          ) : monthEvents.map((ev) => (
            <EventListItem
              key={ev.id}
              event={ev}
              onEdit={(e) => setModal({ mode: 'edit', event: e })}
              onDelete={handleDelete}
            />
          ))}
        </div>
      </div>

      {/* Modal: Novo evento */}
      {modal?.mode === 'add' && (
        <Modal title="Novo Evento" onClose={() => setModal(null)}>
          <EventForm initial={{ date: modal.date }} onSave={handleSave} onClose={() => setModal(null)} />
        </Modal>
      )}

      {/* Modal: Editar evento */}
      {modal?.mode === 'edit' && (
        <Modal title="Editar Evento" onClose={() => setModal(null)}>
          <EventForm initial={modal.event} onSave={handleSave} onClose={() => setModal(null)} />
        </Modal>
      )}

      {/* Modal: Ver detalhe do evento */}
      {modal?.mode === 'view' && (
        <Modal
          title={modal.event.title}
          onClose={() => setModal(null)}
          footer={
            <>
              <Button sm variant="danger" onClick={() => handleDelete(modal.event.id)}>Excluir</Button>
              <Button variant="ghost" onClick={() => setModal(null)}>Fechar</Button>
              <Button variant="primary" onClick={() => setModal({ mode: 'edit', event: modal.event })}>Editar</Button>
            </>
          }
        >
          <CategoryBadge category={modal.event.category} />
          <div style={{ marginTop: 16 }}>
            <div className="detail-row">
              <span className="detail-label"><CalendarIcon /> Data</span>
              <span>{new Date(modal.event.date + 'T12:00').toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}</span>
            </div>
            <div className="detail-row">
              <span className="detail-label"><ClockIcon /> Horário</span>
              <span>{modal.event.time}{modal.event.endTime ? ` – ${modal.event.endTime}` : ''}</span>
            </div>
            {modal.event.location && (
              <div className="detail-row">
                <span className="detail-label"><MapPinIcon /> Local</span>
                <span>{modal.event.location}</span>
              </div>
            )}
            {modal.event.description && (
              <div className="detail-row" style={{ flexDirection: 'column', gap: 4 }}>
                <span className="detail-label">Descrição</span>
                <span style={{ color: 'var(--text-secondary)' }}>{modal.event.description}</span>
              </div>
            )}
            {modal.event.recurring && (
              <div className="detail-row">
                <span className="detail-label">Recorrência</span>
                <span>{{ weekly: 'Semanal', biweekly: 'Quinzenal', monthly: 'Mensal' }[modal.event.recurrence]}</span>
              </div>
            )}
          </div>
        </Modal>
      )}
    </div>
  );
};

export default AgendaPage;