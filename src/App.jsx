// src/App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Páginas principais (coloque os arquivos abaixo em src/pages/)
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";
import Home from "./pages/Home";
import Perfil from "./pages/Perfil";
import AgendamentoHorario from "./pages/AgendamentoHorario";
import AgendamentosMarcados from "./pages/AgendamentosMarcados";
import Servicos from "./pages/Servicos";

/*
  App.jsx - define as rotas do app.
  - "/" -> Login
  - "/cadastro" -> Cadastro de usuário
  - "/home" -> Home (tanto admin quanto usuário)
  - "/perfil", "/agendamento", "/agendamentos", "/servicos" -> páginas respectivas
*/
export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
        <Route path="/home" element={<Home />} />
        <Route path="/perfil" element={<Perfil />} />
        <Route path="/agendamento" element={<AgendamentoHorario />} />
        <Route path="/agendamentos" element={<AgendamentosMarcados />} />
        <Route path="/servicos" element={<Servicos />} />

        {/* qualquer rota não mapeada volta pro login */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
