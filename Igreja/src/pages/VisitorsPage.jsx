import React, { useState } from 'react';
import VisitorTable from '../components/visitors/VisitorTable';
import VisitorForm from '../components/visitors/VisitorForm';
import VisitorDetail from '../components/visitors/VisitorDetail';
import Modal from '../components/ui/Modal';
import Button from '../components/ui/Button';
import { PlusIcon, SearchIcon } from '../components/ui/Icons';
import { FOLLOW_LABELS } from '../constants';

/**
 * Página de Visitantes — listagem com busca, filtro e CRUD.
 */
const VisitorsPage = ({ visitors, onAddVisitor, onEditVisitor, onDeleteVisitor, addToast }) => {
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('todos');
  const [modal, setModal] = useState(null); // null | { mode: 'add'|'edit', visitor? }
  const [detailVisitor, setDetailVisitor] = useState(null);

  // Filtragem local (para responsividade imediata)
  const filtered = visitors.filter((v) => {
    const q = search.toLowerCase();
    const matchSearch = !q || v.name.toLowerCase().includes(q) || v.phone.includes(q) || v.email.toLowerCase().includes(q);
    const matchStatus = statusFilter === 'todos' || v.followUpStatus === statusFilter;
    return matchSearch && matchStatus;
  });

  const handleSave = async (form) => {
    if (modal.mode === 'edit') {
      await onEditVisitor(modal.visitor.id, form);
      addToast('Visitante atualizado!', 'success');
    } else {
      await onAddVisitor(form);
      addToast('Visitante cadastrado!', 'success');
    }
    setModal(null);
  };

  const handleDelete = async (id) => {
    if (!confirm('Remover este visitante?')) return;
    await onDeleteVisitor(id);
    addToast('Visitante removido.', 'success');
    setDetailVisitor(null);
  };

  const openEdit = (visitor) => {
    setDetailVisitor(null);
    setModal({ mode: 'edit', visitor });
  };

  return (
    <div>
      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 24 }}>
        <div>
          <h2 style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 500 }}>Visitantes</h2>
          <p style={{ fontSize: 13, color: 'var(--text-secondary)', marginTop: 2 }}>Cadastro e acompanhamento de visitantes</p>
        </div>
        <Button variant="primary" onClick={() => setModal({ mode: 'add' })}>
          <PlusIcon /> Cadastrar Visitante
        </Button>
      </div>

      {/* Toolbar: busca + filtro */}
      <div className="toolbar">
        <div className="search-wrapper" style={{ flex: 1, minWidth: 200 }}>
          <div className="search-icon"><SearchIcon /></div>
          <input
            className="form-control search-input"
            placeholder="Buscar por nome, telefone ou e-mail..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <select
          className="form-control"
          style={{ width: 'auto' }}
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="todos">Todos os status</option>
          {Object.entries(FOLLOW_LABELS).map(([v, l]) => <option key={v} value={v}>{l}</option>)}
        </select>
      </div>

      {/* Tabela */}
      <div className="card">
        <div className="card-header">
          <h3>Lista de Visitantes</h3>
          <span style={{ fontSize: 12, color: 'var(--text-hint)' }}>{filtered.length} de {visitors.length}</span>
        </div>
        <VisitorTable
          visitors={filtered}
          onEdit={openEdit}
          onDelete={handleDelete}
          onDetail={setDetailVisitor}
          hasFilters={!!(search || statusFilter !== 'todos')}
        />
      </div>

      {/* Modal add/edit */}
      {modal && (
        <Modal title={modal.mode === 'edit' ? 'Editar Visitante' : 'Cadastrar Visitante'} onClose={() => setModal(null)}>
          <VisitorForm initial={modal.visitor} onSave={handleSave} onClose={() => setModal(null)} />
        </Modal>
      )}

      {/* Modal detalhe */}
      {detailVisitor && (
        <VisitorDetail
          visitor={detailVisitor}
          onClose={() => setDetailVisitor(null)}
          onEdit={openEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
};

export default VisitorsPage;