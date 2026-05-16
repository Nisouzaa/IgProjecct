import React from 'react';

/** Estado vazio padronizado com ícone, título e descrição */
const EmptyState = ({ icon = '📭', title, description }) => (
  <div className="empty">
    <div className="empty-icon">{icon}</div>
    <h4>{title}</h4>
    {description && <p>{description}</p>}
  </div>
);

export default EmptyState;