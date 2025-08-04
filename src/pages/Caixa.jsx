import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Caixa() {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const usuario = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (!token || !usuario) {
      alert('Acesso negado! Faça login.');
      navigate('/');
      return;
    }

    if (usuario.email !== 'admin1@admin.com') {
      alert('Acesso permitido apenas para administradores.');
      navigate('/home');
      return;
    }
  }, [navigate]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 p-6">
      <h1 className="text-4xl font-bold mb-6">Caixa - Área Administrativa</h1>
      {/* Aqui você pode colocar o conteúdo do caixa */}
      <p>Conteúdo reservado para o administrador.</p>
    </div>
  );
}
