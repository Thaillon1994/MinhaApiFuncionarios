import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';

import Home from './pages/Home';
import CadastroClientes from './pages/CadastroClientes';
import Agendamento from './pages/Agendamento';
import Caixa from './pages/Caixa';
import Login from './pages/Login';
import Verificacao from './pages/Verificacao';
import PrivateRouteAdmin from './components/PrivateRouteAdmin';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/verificacao" element={<Verificacao />} />
        <Route path="/home" element={<Home />} />
        <Route path="/agendamento" element={<Agendamento />} />

        {/* Rotas protegidas somente para admin */}
        <Route
          path="/cadastro-clientes"
          element={
            <PrivateRouteAdmin>
              <CadastroClientes />
            </PrivateRouteAdmin>
          }
        />
        <Route
          path="/caixa"
          element={
            <PrivateRouteAdmin>
              <Caixa />
            </PrivateRouteAdmin>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
