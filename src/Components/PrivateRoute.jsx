// src/components/PrivateRoute.jsx
import React from "react";
import { Navigate } from "react-router-dom";

/**
 * Componente de rota privada
 * @param {React.ReactNode} children - O componente que será renderizado se o acesso for permitido
 * @param {boolean} adminOnly - Se true, apenas usuários admin podem acessar
 */
export default function PrivateRoute({ children, adminOnly = false }) {
  // Pega o usuário logado do localStorage
  const usuario = JSON.parse(localStorage.getItem("usuarioLogado"));

  // Se não estiver logado, redireciona para login
  if (!usuario) {
    return <Navigate to="/login" replace />;
  }

  // Se a rota for somente para admin e o usuário não for admin, redireciona para a home do usuário
  if (adminOnly && usuario.email !== "admin1@admin.com") {
    return <Navigate to="/home-usuario" replace />;
  }

  // Se tudo certo, renderiza o componente passado
  return children;
}
