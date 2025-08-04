import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '../components/Input';
import Botao from '../components/Botao';

export default function Login() {
  const [modoCadastro, setModoCadastro] = useState(false);
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [endereco, setEndereco] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const user = JSON.parse(localStorage.getItem(email));

    if (user && user.senha === senha) {
      if (!user.verificado) {
        alert('Seu e-mail ainda não foi verificado.');
        navigate('/verificacao', { state: { email } });
      } else {
        localStorage.setItem('token', 'true');
        localStorage.setItem('usuarioLogado', JSON.stringify(user));
        navigate('/home');
      }
    } else {
      alert('Email ou senha inválidos.');
    }
  };

  const handleCadastro = (e) => {
    e.preventDefault();

    if (localStorage.getItem(email)) {
      alert('Esse e-mail já está cadastrado.');
      return;
    }

    const codigoVerificacao = Math.floor(100000 + Math.random() * 900000);

    const novoUsuario = {
      nome,
      email,
      senha,
      endereco,
      role: email === 'admin@admin.com' ? 'admin' : 'cliente',
      verificado: false,
      codigoVerificacao,
    };

    localStorage.setItem(email, JSON.stringify(novoUsuario));
    console.log(`Código de verificação enviado para o e-mail: ${codigoVerificacao}`);
    alert('Código enviado! Confira seu e-mail (simulado).');
    navigate('/verificacao', { state: { email } });
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
      {/* Overlay escura para contraste */}
      <div className="absolute inset-0 bg-black opacity-60"></div>

      <div className="relative z-10 flex items-center justify-center min-h-screen px-4">
        <div className="w-full max-w-md bg-white bg-opacity-90 rounded-2xl shadow-xl p-8">
          <div className="text-center mb-6">
            <h1 className="text-3xl font-bold text-pink-600">Salão Thais Machado</h1>
            <p className="text-sm text-gray-700">
              {modoCadastro ? 'Cadastre-se para agendar seu horário' : 'Acesse sua conta'}
            </p>
          </div>

          <form
            onSubmit={modoCadastro ? handleCadastro : handleLogin}
            className="space-y-4"
          >
            {modoCadastro && (
              <>
                <Input label="Nome" valor={nome} onChange={setNome} />
                <Input label="Endereço" valor={endereco} onChange={setEndereco} />
              </>
            )}
            <Input label="Email" valor={email} onChange={setEmail} tipo="email" />
            <Input label="Senha" valor={senha} onChange={setSenha} tipo="password" />
            <Botao texto={modoCadastro ? 'Cadastrar' : 'Entrar'} type="submit" />
          </form>

          <div className="text-center mt-4">
            <button
              type="button"
              onClick={() => setModoCadastro(!modoCadastro)}
              className="text-sm text-pink-600 hover:underline"
            >
              {modoCadastro
                ? 'Já tem uma conta? Faça login'
                : 'Novo por aqui? Cadastre-se'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
