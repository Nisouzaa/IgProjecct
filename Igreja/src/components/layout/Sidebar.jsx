import React, { useCallback } from 'react';
import { HomeIcon, CalendarIcon, UsersIcon } from '../ui/Icons';

// ─── Main component ───────────────────────────────────────────────────────────

/**
 * Sidebar de navegação lateral.
 *
 * @param {object}   props
 * @param {string}   props.activePage    - ID da página atualmente ativa
 * @param {function} props.onNavigate    - Callback chamado com o ID da página escolhida
 * @param {boolean}  props.backendOnline - Indica se a API está acessível
 */
export default function Sidebar({ activePage, onNavigate, backendOnline }) {
  return (
    <aside style={styles.aside} aria-label="Navegação principal">
      <Logo />

      <nav style={styles.nav} aria-label="Menu principal">
        <span style={styles.sectionLabel}>Principal</span>
        {NAV_ITEMS.map(({ id, label, Icon }) => (
          <NavItem
            key={id}
            id={id}
            label={label}
            Icon={Icon}
            isActive={activePage === id}
            onClick={onNavigate}
          />
        ))}
      </nav>

      <StatusBar online={backendOnline} />
    </aside>
  );
}

/** @type {Array<{ id: string, label: string, Icon: React.ComponentType }>} */
const NAV_ITEMS = [
  { id: 'dashboard', label: 'Visão Geral', Icon: HomeIcon },
  { id: 'agenda',    label: 'Agenda',      Icon: CalendarIcon },
  { id: 'visitantes', label: 'Visitantes', Icon: UsersIcon },
];

const styles = {
  aside: {
    width: 240,
    minHeight: '100vh',
    background: 'var(--brown)',
    display: 'flex',
    flexDirection: 'column',
    position: 'fixed',
    left: 0,
    top: 0,
    bottom: 0,
    zIndex: 100,
    borderRight: '1px solid rgba(201,168,76,0.12)',
  },
  logoArea: {
    padding: '28px 20px 22px',
    borderBottom: '1px solid rgba(255,255,255,0.07)',
  },
  logoCross: {
    fontSize: 22,
    color: 'var(--gold)',
    marginBottom: 10,
    display: 'block',
    fontFamily: 'var(--font-display)',
    letterSpacing: 2,
  },
  logoTitle: {
    fontFamily: 'var(--font-display)',
    fontSize: 14,
    fontWeight: 500,
    color: 'var(--gold)',
    letterSpacing: '0.06em',
    lineHeight: 1.4,
  },
  logoSub: {
    fontSize: 10,
    letterSpacing: '0.12em',
    color: 'rgba(255,255,255,0.25)',
    marginTop: 4,
    textTransform: 'uppercase',
  },
  nav: {
    flex: 1,
    padding: '20px 10px',
  },
  sectionLabel: {
    fontSize: 9,
    fontWeight: 400,
    letterSpacing: '0.14em',
    color: 'rgba(201,168,76,0.4)',
    textTransform: 'uppercase',
    padding: '0 10px',
    marginBottom: 8,
    display: 'block',
  },
  statusBar: {
    padding: '14px 20px',
    borderTop: '1px solid rgba(255,255,255,0.07)',
    display: 'flex',
    alignItems: 'center',
    gap: 8,
    fontSize: 11,
  },
};

// ─── Sub-components ──────────────────────────────────────────────────────────

function Logo() {
  return (
    <div style={styles.logoArea}>
      <span style={styles.logoCross}>✝</span>
      <div style={styles.logoTitle}>Gestão Igreja</div>
      <div style={styles.logoSub}>Sistema de Gestão</div>
    </div>
  );
}

function NavItem({ id, label, Icon, isActive, onClick }) {
  const handleClick = useCallback(() => onClick(id), [id, onClick]);

  return (
    <button
      onClick={handleClick}
      aria-current={isActive ? 'page' : undefined}
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: 10,
        padding: '10px 12px',
        borderRadius: 7,
        cursor: 'pointer',
        color: isActive ? 'var(--brown)' : 'rgba(255,255,255,0.55)',
        background: isActive ? 'var(--gold)' : 'transparent',
        fontWeight: 400,
        fontSize: 13,
        letterSpacing: '0.01em',
        border: 'none',
        width: '100%',
        textAlign: 'left',
        fontFamily: 'var(--font-body)',
        transition: 'background 0.18s, color 0.18s, transform 0.12s',
        marginBottom: 2,
      }}
    >
      <Icon style={{ width: 18, height: 18, flexShrink: 0, opacity: isActive ? 1 : 0.7 }} />
      {label}
      {isActive && (
        <span
          aria-hidden="true"
          style={{
            width: 5,
            height: 5,
            borderRadius: '50%',
            background: 'var(--brown)',
            marginLeft: 'auto',
            flexShrink: 0,
          }}
        />
      )}
    </button>
  );
}

function StatusBar({ online }) {
  return (
    <div style={styles.statusBar}>
      <span
        aria-hidden="true"
        style={{
          width: 7,
          height: 7,
          borderRadius: '50%',
          flexShrink: 0,
          background: online ? '#6BCA77' : 'rgba(255,255,255,0.25)',
          boxShadow: online ? '0 0 6px rgba(107,202,119,0.5)' : 'none',
        }}
      />
      <span
        style={{
          fontSize: 11,
          letterSpacing: '0.01em',
          color: online ? 'rgba(107,202,119,0.85)' : 'rgba(255,255,255,0.4)',
        }}
      >
        {online ? 'API conectada' : 'Modo local (demo)'}
      </span>
    </div>
  );
}



export default Sidebar;