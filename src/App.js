// Importa React (necessário para JSX)
import React from 'react';
// Importa os componentes do React Router para navegação
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Importação das páginas do projeto
import Home from './pages/Home';
import AgendamentoHorario from './pages/AgendamentoHorario';
import AgendamentosMarcados from './pages/AgendamentosMarcados';
import Caixa from './pages/Caixa';
import Login from './pages/Login';
import Perfil from './pages/Perfil'; // Página de informações do usuário

export default function App() {
  return (
    // Router encapsula todas as rotas do projeto
    <Router>
      <Routes>
        {/* Página de login: rota principal de acesso */}
        <Route path="/login" element={<Login />} />

        {/* Página inicial/Home do sistema */}
        <Route path="/" element={<Home />} />

        {/* Página para agendar horário */}
        <Route path="/agendamento" element={<AgendamentoHorario />} />

        {/* Página que lista os agendamentos marcados */}
        <Route path="/agendamentos-marcados" element={<AgendamentosMarcados />} />

        {/* Página de Caixa (restrita ao admin) */}
        <Route path="/caixa" element={<Caixa />} />

        {/* Página de Perfil do usuário: mostra informações do cliente */}
        <Route path="/perfil" element={<Perfil />} />

        {/* Qualquer rota inválida será redirecionada para Home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </Router>
  );
}
