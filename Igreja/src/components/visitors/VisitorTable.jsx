import React from 'react';
import Button from '../ui/Button';
import { FollowUpBadge } from '../ui/Badge';
import { EditIcon, TrashIcon, PhoneIcon, MailIcon } from '../ui/Icons';
import EmptyState from '../ui/EmptyState';
import { HOW_LABELS } from '../../constants';

const initials = (name) => name.split(' ').slice(0, 2).map((n) => n[0]).join('').toUpperCase();

/**
 * Tabela de visitantes com ações de editar, excluir e ver detalhe.
 */
const VisitorTable = ({ visitors, onEdit, onDelete, onDetail, hasFilters }) => {
  if (visitors.length === 0) {
    return (
      <EmptyState
        icon="🙋"
        title="Nenhum visitante encontrado"
        description={hasFilters ? 'Tente ajustar os filtros.' : 'Cadastre o primeiro visitante!'}
      />
    );
  }

  return (
    <div className="table-wrap">
      <table>
        <thead>
          <tr>
            <th>Visitante</th>
            <th>Contato</th>
            <th>Data da Visita</th>
            <th>Como Encontrou</th>
            <th>Status</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {visitors.map((v) => (
            <tr key={v.id}>
              <td onClick={() => onDetail(v)} style={{ cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                  <div className="avatar">{initials(v.name)}</div>
                  <div>
                    <div style={{ fontWeight: 500 }}>{v.name}</div>
                    {v.observations && (
                      <div style={{ fontSize: 11, color: 'var(--text-hint)', maxWidth: 200, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                        {v.observations}
                      </div>
                    )}
                  </div>
                </div>
              </td>
              <td>
                {v.phone && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 13 }}>
                    <PhoneIcon /> {v.phone}
                  </div>
                )}
                {v.email && (
                  <div style={{ display: 'flex', alignItems: 'center', gap: 5, fontSize: 12, color: 'var(--text-secondary)' }}>
                    <MailIcon /> {v.email}
                  </div>
                )}
              </td>
              <td>
                {new Date(v.visitDate + 'T12:00').toLocaleDateString('pt-BR', { day: '2-digit', month: 'short', year: 'numeric' })}
              </td>
              <td style={{ fontSize: 12, color: 'var(--text-secondary)' }}>
                {HOW_LABELS[v.howFoundUs] || v.howFoundUs}
              </td>
              <td><FollowUpBadge status={v.followUpStatus} /></td>
              <td>
                <div style={{ display: 'flex', gap: 4 }}>
                  <Button icon sm variant="ghost" onClick={() => onEdit(v)}>
                    <EditIcon />
                  </Button>
                  <Button icon sm variant="ghost" style={{ color: 'var(--danger)' }} onClick={() => onDelete(v.id)}>
                    <TrashIcon />
                  </Button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default VisitorTable;