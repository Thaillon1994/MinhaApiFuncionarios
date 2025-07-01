import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../../components/Input'; // corrigido aqui
import Botao from '../../components/Botao'; // corrigido aqui

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
    <form onSubmit={handleLogin} style={{ maxWidth: '300px', margin: '2rem auto' }}>
      <h2>Login</h2>
      <Input label="Usuário" valor={usuario} onChange={setUsuario} />
      <Input label="Senha" valor={senha} onChange={setSenha} tipo="password" />
      <Botao texto="Entrar" />
    </form>
  );
}
