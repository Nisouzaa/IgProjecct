import React from 'react';

/**
 * Card de métrica numérica para o dashboard.
 * @param {React.ReactNode} icon
 * @param {string|number} value
 * @param {string} label
 * @param {string} iconBg - cor de fundo do ícone
 */
const StatCard = ({ icon, value, label, iconBg = 'var(--cream-dark)' }) => (
  <div className="stat-card" style={{
    background: 'var(--surface)', border: '1px solid var(--border)',
    borderRadius: 'var(--radius-lg)', padding: '20px 22px',
    boxShadow: 'var(--shadow-sm)',
  }}>
    <div style={{
      width: 40, height: 40, borderRadius: 10,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      background: iconBg, marginBottom: 12, fontSize: 18,
    }}>
      {icon}
    </div>
    <div style={{ fontFamily: 'var(--font-display)', fontSize: 28, fontWeight: 400, color: 'var(--brown)', lineHeight: 1 }}>
      {value}
    </div>
    <div style={{ fontSize: 12, color: 'var(--text-secondary)', marginTop: 4 }}>
      {label}
    </div>
  </div>
);

export default StatCard;