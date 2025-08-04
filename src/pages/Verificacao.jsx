import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Botao from '../components/Botao';

export default function Verificacao() {
  const [codigo, setCodigo] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (location.state?.email) {
      setEmail(location.state.email);
    } else {
      alert('Email não encontrado. Retorne à tela de login.');
      navigate('/');
    }
  }, [location, navigate]);

  const handleVerificacao = (e) => {
    e.preventDefault();

    const usuario = JSON.parse(localStorage.getItem(email));

    if (usuario && parseInt(codigo) === usuario.codigoVerificacao) {
      usuario.verificado = true;
      localStorage.setItem(email, JSON.stringify(usuario));
      alert('E-mail verificado com sucesso!');
      navigate('/home');
    } else {
      alert('Código inválido. Tente novamente.');
    }
  };

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
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white bg-opacity-90 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-pink-600">Verificação de E-mail</h1>
            <p className="text-sm text-gray-700">
              Insira o código enviado para <strong>{email}</strong>
            </p>
          </div>

          <form onSubmit={handleVerificacao} className="space-y-4">
            <Input
              label="Código de Verificação"
              valor={codigo}
              onChange={setCodigo}
              tipo="number"
            />
            <Botao texto="Verificar" type="submit" />
          </form>
        </div>
      </div>
    </div>
  );
}
