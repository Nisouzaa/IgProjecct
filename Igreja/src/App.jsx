import React, { useState } from "react";
import "./App.css";

import AppShell from "./components/layout/AppShell";
import ToastContainer from "./components/ui/Toast";

import DashboardPage from "./pages/DashboardPage";
import AgendaPage from "./pages/AgendaPage";
import VisitorsPage from "./pages/VisitorsPage";

import useEvents from "./hooks/useEvents";
import useVisitors from "./hooks/useVisitors";
import useToast from "./hooks/useToast";

/**
 * App.jsx — componente raiz.
 * Gerencia qual página está ativa e distribui dados e handlers via props.
 * Estado global é gerenciado pelos custom hooks (useEvents, useVisitors).
 */
function App() {
  const [activePage, setActivePage] = useState("dashboard");

  const {
    events,
    backendOnline: eventsOnline,
    addEvent,
    editEvent,
    removeEvent,
  } = useEvents();
  const { visitors, addVisitor, editVisitor, removeVisitor } = useVisitors();
  const { toasts, addToast } = useToast();

  const backendOnline = eventsOnline;

  return (
    <>
      <AppShell
        activePage={activePage}
        onNavigate={setActivePage}
        backendOnline={backendOnline}
      >
        {activePage === "dashboard" && (
          <DashboardPage
            events={events}
            visitors={visitors}
            onNavigate={setActivePage}
          />
        )}
        {activePage === "agenda" && (
          <AgendaPage
            events={events}
            onAddEvent={addEvent}
            onEditEvent={editEvent}
            onDeleteEvent={removeEvent}
            addToast={addToast}
          />
        )}
        {activePage === "visitantes" && (
          <VisitorsPage
            visitors={visitors}
            onAddVisitor={addVisitor}
            onEditVisitor={editVisitor}
            onDeleteVisitor={removeVisitor}
            addToast={addToast}
          />
        )}
      </AppShell>

      <ToastContainer toasts={toasts} />
    </>
  );
}

export default App;
