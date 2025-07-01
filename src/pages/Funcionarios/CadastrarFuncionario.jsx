import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../services/api';
import Input from '../../components/Input';
import Botao from '../../components/Botao';


export default function CadastrarFuncionario() {
  const [nome, setNome] = useState('');
  const [cpf, setCpf] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  const handleCadastrar = async (e) => {
    e.preventDefault();

    try {
      await api.post('/Funcionarios', { nome, cpf, email });
      alert('Funcionário cadastrado com sucesso!');
      navigate('/home');
    } catch {
      alert('Erro ao cadastrar funcionário.');
    }
  };

  return (
    <form onSubmit={handleCadastrar} style={{ maxWidth: '400px', margin: '2rem auto' }}>
      <h2>Cadastrar Funcionário</h2>
      <Input label="Nome" valor={nome} onChange={setNome} />
      <Input label="CPF" valor={cpf} onChange={setCpf} />
      <Input label="Email" valor={email} onChange={setEmail} tipo="email" />
      <Botao texto="Cadastrar" type="submit" />
    </form>
  );
}
