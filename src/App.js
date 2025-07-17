import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import CadastroClientes from './pages/CadastroClientes';
import Home from './pages/Home';
import Agendamento from './pages/Agendamento';
import Caixa from './pages/Caixa';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/cadastro-clientes" element={<CadastroClientes />} />
        <Route path="/agendamento" element={<Agendamento />} />
        <Route path="/caixa" element={<Caixa />} />
        {/* Se quiser, redireciona qualquer rota desconhecida para Home */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
