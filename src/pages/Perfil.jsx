// Importa o React (necessário para componentes)
import React, { useEffect, useState } from 'react';
// Importa o hook de navegação do React Router
import { useNavigate } from 'react-router-dom';
// Importa o CSS da página Perfil
import './Perfil.css';

// Componente principal da página Perfil
export default function Perfil() {
  const navigate = useNavigate(); // Hook para navegação programática

  // Estado para armazenar os dados do usuário logado
  const [usuario, setUsuario] = useState(null);

  // useEffect: roda quando o componente é montado
  useEffect(() => {
    // Recupera o usuário do localStorage
    const user = JSON.parse(localStorage.getItem('usuarioLogado'));

    if (!user) {
      // Se não houver usuário logado, redireciona para a tela de login
      navigate('/login');
      return;
    }

    // Seta os dados do usuário no estado
    setUsuario(user);
  }, [navigate]);

  // Função para deslogar o usuário
  function handleLogout() {
    localStorage.removeItem('usuarioLogado'); // Remove dados do localStorage
    navigate('/login'); // Redireciona para login
  }

  return (
    <div className="perfil-container">
      {/* Cabeçalho da página */}
      <header className="perfil-header">
        <h1>Meu Perfil</h1>
      </header>

      {/* Informações do usuário */}
      <section className="perfil-info">
        {usuario ? (
          <>
            <p><strong>Nome:</strong> {usuario.nome}</p>
            <p><strong>Email:</strong> {usuario.email}</p>
            <p><strong>CPF:</strong> {usuario.cpf}</p>
            {/* Adicione aqui outras informações do cadastro que deseja mostrar */}
          </>
        ) : (
          <p>Carregando informações...</p>
        )}
      </section>

      {/* Botões de ação */}
      <section className="perfil-buttons">
        {/* Botão para editar perfil (pode abrir modal ou outra página) */}
        <button
          className="btn-primary"
          onClick={() => navigate('/editar-perfil')}
        >
          Editar Perfil
        </button>

        {/* Botão para logout */}
        <button
          className="btn-secondary"
          onClick={handleLogout}
        >
          Logout
        </button>
      </section>
    </div>
  );
}
