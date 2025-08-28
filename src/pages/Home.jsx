// src/pages/Home.jsx
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Home.css";

/*
  Home.jsx
  - controla a exibição de links conforme o tipo do usuário (admin / usuario)
  - usa loading para evitar "piscar" (abrir e fechar)
*/
export default function Home() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // busca 'usuarioLogado' do localStorage
    const raw = localStorage.getItem("usuarioLogado");
    if (!raw) {
      // se não houver, redireciona para login
      navigate("/");
      setLoading(false);
      return;
    }
    try {
      const u = JSON.parse(raw);
      setUsuario(u);
    } catch (err) {
      // se parse falhar, limpar e redirecionar
      localStorage.removeItem("usuarioLogado");
      navigate("/");
    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // enquanto verifica, mostra carregando
  if (loading) return <div className="loading">Carregando...</div>;

  // se por algum motivo não tem usuário, não renderiza nada
  if (!usuario) return null;

  const isAdmin = usuario.tipo === "admin" || usuario.email === "admin1@admin.com";

  // função de logout
  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/");
  };

  return (
    <div className="home-root">
      <div className="home-overlay" />
      <div className="home-card">
        {/* topo com perfil e logout (ergonomia: botões no canto) */}
        <header className="home-top">
          <div>
            <h1 className="home-title">Thais Machado</h1>
            <p className="home-subtitle">Elegância e cuidado em cada detalhe</p>
          </div>

          <div className="home-top-buttons">
            <Link to="/perfil" className="btn-secondary">Perfil</Link>
            <button className="btn-secondary" onClick={handleLogout}>Logout</button>
          </div>
        </header>

        {/* conteúdo principal com botões alinhados em coluna */}
        <main className="home-main">
          <div className="buttons-column">
            <Link to="/agendamento" className="btn-primary">Marcar Horário</Link>

            {/* Links visíveis apenas para admin */}
            {isAdmin && (
              <>
                <Link to="/cadastro-clientes" className="btn-primary">Cadastro de Clientes</Link>
                <Link to="/servicos" className="btn-primary">Serviços</Link>
                <Link to="/caixa" className="btn-primary">Caixa</Link>
              </>
            )}

            {/* link para ver agendamentos (clientes veem só os seus na página específica) */}
            <Link to="/agendamentos" className="btn-primary outline">Meus Agendamentos</Link>
          </div>

          <section className="home-welcome">
            <h2>Olá, {usuario.nome}</h2>
            <p className="welcome-sub">Bem-vindo ao painel. Use os botões ao lado para navegar.</p>
            {isAdmin && <p className="note-admin">Você está online como administrador — pode editar/excluir.</p>}
          </section>
        </main>

        <footer className="home-footer">
          <div>Todos os direitos reservados © 2025 Salão Thais Machado</div>
          <div className="footer-links">
            <a href="https://m.facebook.com/thais.machado.332413" target="_blank" rel="noreferrer">Facebook</a>
            <a href="https://www.instagram.com/thais_machado_r" target="_blank" rel="noreferrer">Instagram</a>
            <a href="https://wa.me/5511910152441" target="_blank" rel="noreferrer">WhatsApp</a>
          </div>
        </footer>
      </div>
    </div>
  );
}
