
import React from 'react';
import { HomeIcon, CalendarIcon, UsersIcon } from '../ui/Icons';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Visão Geral', Icon: HomeIcon },
  { id: 'agenda', label: 'Agenda', Icon: CalendarIcon },
  { id: 'visitantes', label: 'Visitantes', Icon: UsersIcon },
];

/**
 * Sidebar de navegação lateral.
 * @param {string} activePage - página atualmente ativa
 * @param {function} onNavigate - callback para mudar de página
 * @param {boolean} backendOnline - indica se a API está conectada
 */
const Sidebar = ({ activePage, onNavigate, backendOnline }) => (
  <aside style={{
    width: 240, minHeight: '100vh',
    background: 'var(--brown)',
    display: 'flex', flexDirection: 'column',
    position: 'fixed', left: 0, top: 0, bottom: 0, zIndex: 100,
  }}>
    {/* Logo */}
    <div style={{ padding: '28px 24px 20px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
      <span style={{ fontSize: 28, color: 'var(--gold)', marginBottom: 6, display: 'block' }}>✝</span>
      <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 17, fontWeight: 500, color: '#be1212', lineHeight: 1.3 }}>
        Gestão Igreja
      </h1>
      <p style={{ fontSize: 11, color: 'rgba(0, 255, 221, 0.4)', marginTop: 2 }}>Sistema de Gestão</p>
    </div>

    {/* Nav */}
    <nav style={{ flex: 1, padding: '16px 12px' }}>
      <div style={{ fontSize: 10, fontWeight: 500, letterSpacing: '0.08em', color: 'rgba(255, 0, 0, 0.35)', textTransform: 'uppercase', padding: '0 12px', margin: '16px 0 6px' }}>
        Principal
      </div>
      {NAV_ITEMS.map(({ id, label, Icon }) => (
        <button
          key={id}
          onClick={() => onNavigate(id)}
          style={{
            display: 'flex', alignItems: 'center', gap: 10,
            padding: '9px 12px', borderRadius: 8, cursor: 'pointer',
            color: activePage === id ? 'var(--brown)' : 'rgba(22, 61, 233, 0.6)',
            background: activePage === id ? 'var(--gold)' : 'transparent',
            fontWeight: activePage === id ? 500 : 400,
            fontSize: 14, border: 'none', width: '100%', textAlign: 'left',
            fontFamily: 'var(--font-body)', transition: 'all 0.15s',
          }}
        >
          <Icon />
          {label}
        </button>
      ))}
    </nav>

    {/* Status */}
    <div style={{ padding: '16px 24px', borderTop: '1px solid rgba(255,255,255,0.08)', fontSize: 12, color: 'rgba(244, 248, 11, 0.3)' }}>
      {backendOnline
        ? <span style={{ color: '#6BCA77' }}>● API conectada</span>
        : <span>● Modo local (demo)</span>
      }
    </div>
  </aside>
);

export default Sidebar;