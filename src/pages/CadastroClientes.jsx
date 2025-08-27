// Importa React e hooks necessários
import React, { useEffect, useState } from "react";
// Importa hook para navegação entre páginas
import { useNavigate } from "react-router-dom";
// Importa CSS específico da página
import "./CadastroClientes.css";
import "./Home.css";
import "./Cadastro.css";


export default function CadastroClientes() {
  const navigate = useNavigate();               // Hook para navegação
  const [usuario, setUsuario] = useState(null); // Estado do usuário logado
  const [clientes, setClientes] = useState([]); // Estado para lista de clientes

  // useEffect executa quando a página monta
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!user) {
      navigate("/login"); // Redireciona caso não haja usuário
      return;
    }
    setUsuario(user);

    // Simulação de dados de clientes (substituir pela API real)
    const fakeClientes = [
      { id: 1, nome: "João Silva", email: "joao@email.com", telefone: "11999999999" },
      { id: 2, nome: "Maria Oliveira", email: "maria@email.com", telefone: "11988888888" },
    ];
    setClientes(fakeClientes);
  }, [navigate]);

  // Verifica se o usuário é admin
  const isAdmin = usuario?.email === "admin1@admin.com";

  // Função para excluir cliente
  function handleExcluir(id) {
    if (window.confirm("Deseja realmente excluir este cliente?")) {
      setClientes((prev) => prev.filter(c => c.id !== id));
      // Aqui chamaria API para excluir no backend
    }
  }

  // Função para editar cliente
  function handleEditar(id) {
    alert(`Editar cliente id: ${id}`);
    // Aqui poderia abrir modal ou redirecionar para página de edição
  }

  return (
    <div
      className="cadastro-container"
      style={{
        minHeight: "100vh",
        backgroundImage: "url('/salaothais.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        color: "white",
        padding: 20,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* Overlay para escurecer fundo */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 0,
        }}
      />

      {/* Conteúdo principal */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 600,
          width: "100%",
          margin: "0 auto",
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: 12,
          padding: 20,
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: 20 }}>Clientes Cadastrados</h1>

        {/* Lista de clientes */}
        {clientes.length === 0 ? (
          <p style={{ textAlign: "center" }}>Nenhum cliente cadastrado.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {clientes.map((c) => (
              <li
                key={c.id}
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  borderRadius: 8,
                  marginBottom: 12,
                  padding: 12,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <strong>Nome:</strong> {c.nome}
                <strong>Email:</strong> {c.email}
                <strong>Telefone:</strong> {c.telefone}

                {/* Botões apenas para admin */}
                {isAdmin && (
                  <div style={{ marginTop: 8, display: "flex", gap: 10 }}>
                    <button
                      onClick={() => handleEditar(c.id)}
                      className="btn-primary"
                    >
                      Editar
                    </button>
                    <button
                      onClick={() => handleExcluir(c.id)}
                      className="btn-primary"
                      style={{ backgroundColor: "#f87171" }}
                    >
                      Excluir
                    </button>
                  </div>
                )}
              </li>
            ))}
          </ul>
        )}

        {/* Botão para voltar à Home */}
        <button
          onClick={() => navigate("/")}
          className="btn-primary"
          style={{ marginTop: 20 }}
        >
          Voltar para Home
        </button>
      </div>
    </div>
  );
}
