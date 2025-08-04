import React from 'react';
import { Navigate } from 'react-router-dom';

export default function PrivateRouteAdmin({ children }) {
  const token = localStorage.getItem('token');
  const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

  if (!token || !usuario || usuario.email !== 'admin1@admin.com') {
    alert('Acesso restrito. Apenas administradores podem acessar esta página.');
    return <Navigate to="/home" replace />;
  }

  return children;
}
