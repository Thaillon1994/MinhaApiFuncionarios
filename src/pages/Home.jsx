import React from 'react';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <div
      className="min-h-screen relative"
      style={{
        backgroundImage: "url('/salaothais.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
      }}
    >
      {/* Overlay escuro para legibilidade */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Conteúdo principal */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8 space-y-8 text-white max-w-md mx-auto text-center">
        <h1 className="text-5xl font-extrabold tracking-wide drop-shadow-lg">
          Salão Thais Machado
        </h1>
        <p className="text-lg font-medium drop-shadow-md">
          Bem-vindo(a)! Escolha uma opção abaixo:
        </p>

        <nav className="w-full space-y-6">
          <Link
            to="/cadastro-clientes"
            className="block w-full px-6 py-3 bg-pink-600 bg-opacity-80 rounded-lg shadow-md hover:bg-pink-700 hover:scale-105 transform transition"
          >
            Cadastro de Clientes
          </Link>
          <Link
            to="/agendamento"
            className="block w-full px-6 py-3 bg-pink-600 bg-opacity-80 rounded-lg shadow-md hover:bg-pink-700 hover:scale-105 transform transition"
          >
            Agendamento de Horários
          </Link>
          <Link
            to="/caixa"
            className="block w-full px-6 py-3 bg-pink-600 bg-opacity-80 rounded-lg shadow-md hover:bg-pink-700 hover:scale-105 transform transition"
          >
            Caixa
          </Link>
        </nav>
      </div>
    </div>
  );
}
