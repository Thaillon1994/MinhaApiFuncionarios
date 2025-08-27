import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!user) {
      navigate("/login");
      return;
    }
    setUsuario(user);
  }, [navigate]);

  const isAdmin = usuario?.tipo === "admin";

  return (
    <div
      style={{
        backgroundColor: "#ffe4e6", // Fundo rose claro
        minHeight: "100vh",
        padding: 20,
        fontFamily: "Segoe UI, Arial, sans-serif"
      }}
    >
      <h1 style={{ textAlign: "center", marginBottom: 30 }}>
        {isAdmin ? "Home Admin" : "Home Usuário"}
      </h1>

      <div style={{ display: "flex", justifyContent: "center", gap: 20 }}>
        {isAdmin && (
          <>
            <button
              onClick={() => navigate("/cadastro-clientes")}
              style={{
                backgroundColor: "#db2777",
                color: "white",
                padding: "12px 20px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                fontWeight: "600"
              }}
            >
              Cadastro de Clientes
            </button>

            <button
              onClick={() => navigate("/caixa")}
              style={{
                backgroundColor: "#db2777",
                color: "white",
                padding: "12px 20px",
                borderRadius: 10,
                border: "none",
                cursor: "pointer",
                fontWeight: "600"
              }}
            >
              Caixa
            </button>
          </>
        )}

        <button
          onClick={() => navigate("/agendamentos")}
          style={{
            backgroundColor: "#f472b6",
            color: "white",
            padding: "12px 20px",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Meus Agendamentos
        </button>

        <button
          onClick={() => {
            localStorage.removeItem("usuarioLogado");
            navigate("/login");
          }}
          style={{
            backgroundColor: "#6b7280",
            color: "white",
            padding: "12px 20px",
            borderRadius: 10,
            border: "none",
            cursor: "pointer",
            fontWeight: "600"
          }}
        >
          Sair
        </button>
      </div>

      {usuario && (
        <div style={{ marginTop: 40, textAlign: "center" }}>
          <p>
            Bem-vindo(a), <strong>{usuario.nome || usuario.email}</strong>!
          </p>
        </div>
      )}
    </div>
  );
}
