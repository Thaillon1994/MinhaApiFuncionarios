// App.jsx
import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

// Páginas
import Login from "./pages/Login";
import Cadastro from "./pages/Cadastro";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Rota de login */}
        <Route path="/login" element={<Login />} />

        {/* Rota de cadastro */}
        <Route path="/cadastro" element={<Cadastro />} />

        {/* Qualquer outra rota redireciona para /login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}
