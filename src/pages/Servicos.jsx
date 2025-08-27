import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Servicos.css"; // CSS específico para a página

export default function Servicos() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [agendamentos, setAgendamentos] = useState([]);

  // Ao montar, verifica se há usuário logado
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!user) {
      navigate("/login");
      return;
    }
    setUsuario(user);

    // Apenas admin vê os agendamentos
    if (user.email === "admin1@admin.com") {
      // Exemplo fictício
      setAgendamentos([
        { id: 1, cliente: "Maria", servico: "Corte", data: "2025-08-26", hora: "14:00" },
        { id: 2, cliente: "João", servico: "Escova", data: "2025-08-27", hora: "10:00" },
      ]);
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem("usuarioLogado");
    navigate("/login");
  };

  const handleExcluir = (id) => {
    // Simulação de exclusão
    setAgendamentos(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div
      className="home-container"
      style={{
        backgroundImage: "url('/salaothais.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        color: "white",
        padding: 20,
      }}
    >
      {/* Botões topo */}
      <div style={{ width: "100%", display: "flex", justifyContent: "space-between", marginBottom: 20 }}>
        <button className="btn-secondary" onClick={() => navigate("/")} aria-label="Voltar à Home">
          Home
        </button>
        <button className="btn-secondary" onClick={handleLogout} aria-label="Logout">
          Logout
        </button>
      </div>

      <h1 className="home-title">Agendamentos</h1>

      {usuario?.email !== "admin1@admin.com" && <p>Acesso restrito. Apenas administradores podem visualizar.</p>}

      {usuario?.email === "admin1@admin.com" && (
        <div style={{ display: "flex", flexDirection: "column", gap: 15, marginTop: 20 }}>
          {agendamentos.map((a) => (
            <div key={a.id} className="agendamento-card">
              <div>
                <p><strong>Cliente:</strong> {a.cliente}</p>
                <p><strong>Serviço:</strong> {a.servico}</p>
                <p><strong>Data:</strong> {a.data}</p>
                <p><strong>Hora:</strong> {a.hora}</p>
              </div>
              <div className="agendamento-actions">
                <button className="btn-secondary" onClick={() => alert("Editar agendamento " + a.id)}>Editar</button>
                <button className="btn-secondary" onClick={() => handleExcluir(a.id)}>Excluir</button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Botão adicional para voltar para Home no final da página */}
      <button 
        className="btn-secondary" 
        style={{ marginTop: 30, width: "200px", alignSelf: "center" }}
        onClick={() => navigate("/")}
      >
        Voltar para Home
      </button>
    </div>
  );
}
