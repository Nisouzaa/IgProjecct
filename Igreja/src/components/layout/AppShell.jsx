import React from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';

/**
 * Wrapper da aplicação: combina Sidebar + Topbar + conteúdo da página.
 */
const AppShell = ({ activePage, onNavigate, backendOnline, children }) => (
  <div className="app-shell">
    <Sidebar activePage={activePage} onNavigate={onNavigate} backendOnline={backendOnline} />
    <main className="main-content">
      <Topbar activePage={activePage} />
      <div className="page-content">{children}</div>
    </main>
  </div>
);

export default AppShell;