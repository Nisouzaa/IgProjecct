import React from 'react';

const styles = {
  base: {
    display: 'inline-flex', alignItems: 'center', gap: 6,
    padding: '8px 16px', borderRadius: 8,
    fontSize: 13, fontWeight: 500, fontFamily: 'var(--font-body)',
    cursor: 'pointer', border: '1px solid', transition: 'all 0.15s',
    textDecoration: 'none',
  },
  primary: { background: 'var(--brown)', color: '#FFF', borderColor: 'var(--brown)' },
  ghost: { background: 'transparent', color: 'var(--text)', borderColor: 'var(--border)' },
  gold: { background: 'var(--gold)', color: 'var(--brown)', borderColor: 'var(--gold)', fontWeight: 600 },
  danger: { background: 'var(--danger-bg)', color: 'var(--danger)', borderColor: 'var(--danger)' },
  sm: { padding: '5px 10px', fontSize: 12 },
  icon: { padding: 6, borderRadius: 7 },
};

/**
 * Componente Button reutilizável.
 * @param {'primary'|'ghost'|'gold'|'danger'} variant
 * @param {boolean} sm - tamanho pequeno
 * @param {boolean} icon - botão apenas com ícone
 */
const Button = ({
  children,
  variant = 'ghost',
  sm = false,
  icon = false,
  style: extraStyle = {},
  ...props
}) => {
  const style = {
    ...styles.base,
    ...styles[variant],
    ...(sm ? styles.sm : {}),
    ...(icon ? styles.icon : {}),
    ...extraStyle,
  };
  return (
    <button style={style} {...props}>
      {children}
    </button>
  );
};

export default Button;