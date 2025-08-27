import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Caixa.css";

export default function Caixa() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [movimentos, setMovimentos] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!user) {
      navigate("/login");
      return;
    }
    setUsuario(user);

    // Dados simulados
    const fakeMovimentos = [
      { id: 1, cliente: "João", servico: "Corte", valor: 30, data: "2025-08-15" },
      { id: 2, cliente: "Maria", servico: "Escova + Tintura", valor: 90, data: "2025-08-16" },
    ];
    setMovimentos(fakeMovimentos);
  }, [navigate]);

  const isAdmin = usuario?.email === "admin1@admin.com";

  const handleExcluir = (id) => {
    if (window.confirm("Confirma exclusão deste movimento?")) {
      setMovimentos((prev) => prev.filter((m) => m.id !== id));
    }
  };

  const lucroTotal = movimentos.reduce((acc, mov) => acc + mov.valor, 0);

  if (!isAdmin) {
    return (
      <div style={{ padding: 50, textAlign: "center" }}>
        <h2>Acesso negado</h2>
        <p>Somente o administrador pode acessar o Caixa.</p>
        <button className="btn-primary" onClick={() => navigate("/")}>
          Voltar para Home
        </button>
      </div>
    );
  }

  return (
    <div
      style={{
        position: "relative",
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
      {/* Overlay escuro */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(0,0,0,0.6)",
          zIndex: 0,
        }}
      />

      {/* Conteúdo */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          maxWidth: 700,
          width: "100%",
          backgroundColor: "rgba(255,255,255,0.1)",
          borderRadius: 12,
          padding: 20,
        }}
      >
        <h1 style={{ textAlign: "center", marginBottom: 20 }}>Caixa do Salão</h1>
        <h2 style={{ textAlign: "center", marginBottom: 20 }}>
          Lucro Total: R$ {lucroTotal.toFixed(2)}
        </h2>

        {movimentos.length === 0 ? (
          <p style={{ textAlign: "center" }}>Nenhum movimento registrado.</p>
        ) : (
          <ul style={{ listStyle: "none", padding: 0 }}>
            {movimentos.map((mov) => (
              <li
                key={mov.id}
                style={{
                  backgroundColor: "rgba(255,255,255,0.15)",
                  borderRadius: 8,
                  marginBottom: 12,
                  padding: 12,
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <strong>Cliente:</strong> {mov.cliente} <br />
                <strong>Serviço:</strong> {mov.servico} <br />
                <strong>Valor:</strong> R$ {mov.valor.toFixed(2)} <br />
                <strong>Data:</strong> {mov.data} <br />
                <div style={{ display: "flex", gap: 10, marginTop: 10 }}>
                  <button
                    onClick={() => handleExcluir(mov.id)}
                    style={{
                      flexGrow: 1,
                      backgroundColor: "#f87171",
                      border: "none",
                      padding: "8px",
                      borderRadius: "8px",
                      color: "white",
                      fontWeight: "bold",
                      cursor: "pointer",
                    }}
                  >
                    Excluir
                  </button>
                </div>
              </li>
            ))}
          </ul>
        )}

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
