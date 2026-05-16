import React from 'react';
import StatCard from '../components/dashboard/StatCard';
import UpcomingEvents from '../components/dashboard/UpcomingEvents';
import RecentVisitors from '../components/dashboard/RecentVisitors';
import { CategoryBadge } from '../components/ui/Badge';
import { UsersIcon, MailIcon, CalendarIcon } from '../components/ui/Icons';

/**
 * Página de Dashboard — visão geral da semana/mês.
 */
const DashboardPage = ({ events, visitors, onNavigate }) => {
  const today = new Date();

  const thisMonth = visitors.filter((v) => {
    const d = new Date(v.visitDate);
    return d.getMonth() === today.getMonth() && d.getFullYear() === today.getFullYear();
  });

  const pending = visitors.filter((v) => v.followUpStatus === 'pendente');
  const todayEvents = events.filter((e) => e.date === today.toISOString().split('T')[0]);

  return (
    <div>
      <div style={{ marginBottom: 28 }}>
        <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500 }}>Dashboard</h2>
        <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>
          {today.toLocaleDateString('pt-BR', { weekday: 'long', day: '2-digit', month: 'long', year: 'numeric' })}
        </p>
      </div>

      {/* Stats */}
      <div className="stats-grid">
        <StatCard icon={<UsersIcon />} value={visitors.length} label="Total de visitantes" iconBg="var(--cream-dark)" />
        <StatCard icon={<UsersIcon />} value={thisMonth.length} label="Visitantes este mês" iconBg="#FFF4E0" />
        <StatCard icon={<MailIcon />} value={pending.length} label="Acompanhamentos pendentes" iconBg="#FEF0EE" />
        <StatCard icon={<CalendarIcon />} value={events.length} label="Eventos cadastrados" iconBg="#EAF5EC" />
      </div>

      {/* Eventos de hoje */}
      {todayEvents.length > 0 && (
        <div className="card" style={{ marginBottom: 20, borderLeft: '3px solid var(--gold)' }}>
          <div className="card-header">
            <h3>✝ Hoje — {today.toLocaleDateString('pt-BR', { day: '2-digit', month: 'long' })}</h3>
          </div>
          <div className="card-body" style={{ padding: '10px 24px' }}>
            {todayEvents.map((ev) => (
              <div key={ev.id} className="event-list-item">
                <div className={`event-dot dot-${ev.category}`} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 500, fontSize: 14 }}>{ev.title}</div>
                  <div style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                    {ev.time}{ev.endTime ? ` – ${ev.endTime}` : ''}
                    {ev.location ? ` · ${ev.location}` : ''}
                  </div>
                </div>
                <CategoryBadge category={ev.category} />
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Grid */}
      <div className="grid-2">
        <UpcomingEvents events={events} onNavigate={onNavigate} />
        <RecentVisitors visitors={visitors} onNavigate={onNavigate} />
      </div>
    </div>
  );
};

export default DashboardPage;