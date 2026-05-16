import React from 'react';

const PAGE_TITLES = {
  dashboard: 'Visão Geral',
  agenda: 'Agenda',
  visitantes: 'Visitantes',
};

/**
 * Barra superior com título da página atual e data.
 * @param {string} activePage
 */
const Topbar = ({ activePage }) => (
  <header style={{
    background: 'var(--surface)', borderBottom: '1px solid var(--border)',
    padding: '0 32px', height: 60,
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    position: 'sticky', top: 0, zIndex: 50,
  }}>
    <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 20, fontWeight: 500, color: 'var(--brown)' }}>
      {PAGE_TITLES[activePage]}
    </h2>
    <span style={{ fontSize: 12, color: 'var(--text-hint)' }}>
      {new Date().toLocaleDateString('pt-BR', { weekday: 'short', day: '2-digit', month: 'short' })}
    </span>
  </header>
);

export default Topbar;