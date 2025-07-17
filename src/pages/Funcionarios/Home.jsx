import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div className="min-h-screen bg-pink-50 p-8">
      <h1 className="text-4xl font-bold text-pink-700 mb-8">Salão Thais Machado</h1>
      <p className="mb-6 text-pink-600">Bem-vindo(a)! Escolha uma opção abaixo:</p>

      <nav className="space-y-4 max-w-sm">
        <Link
          to="/cadastro-clientes"
          className="block px-6 py-3 bg-pink-400 text-white rounded hover:bg-pink-500 transition"
        >
          Cadastro de Clientes
        </Link>
        <Link
          to="/agendamento"
          className="block px-6 py-3 bg-pink-400 text-white rounded hover:bg-pink-500 transition"
        >
          Agendamento de Horários
        </Link>
        <Link
          to="/caixa"
          className="block px-6 py-3 bg-pink-400 text-white rounded hover:bg-pink-500 transition"
        >
          Caixa
        </Link>
      </nav>
    </div>
  );
}
