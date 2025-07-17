import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [usuario, setUsuario] = useState('');
  const [senha, setSenha] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    if (usuario === 'admin' && senha === '123') {
      localStorage.setItem('token', 'true');
      navigate('/home');
    } else {
      alert('Usuário ou senha inválidos');
    }
  };

  return (
    <div className="min-h-screen bg-pink-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-2xl shadow-lg w-full max-w-md">
        <h1 className="text-3xl font-bold text-center text-pink-700 mb-6">Thais Machado</h1>
        <p className="text-center text-sm text-gray-600 mb-8">
          Bem-vindo(a) ao salão. Faça login para continuar.
        </p>

        <form onSubmit={handleLogin} className="space-y-6">
          <input
            type="text"
            placeholder="Usuário"
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          />

          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-pink-400"
          />
          <button
            type="submit"
            className="w-full bg-pink-500 text-white py-3 rounded hover:bg-pink-600 transition"
          >
            Entrar
          </button>
        </form>
      </div>
    </div>
  );
}

