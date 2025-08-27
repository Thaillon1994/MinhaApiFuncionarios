import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const handleLogin = () => {
    if (!email || !senha) {
      setErro("Preencha todos os campos!");
      return;
    }

    // Login fixo do admin
    if (email === "admin1@admin.com" && senha === "1234") {
      localStorage.setItem(
        "usuarioLogado",
        JSON.stringify({ email, tipo: "admin" })
      );
      navigate("/home-admin");
      return;
    }

    // Login de usuários cadastrados
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioEncontrado = usuarios.find(
      (u) => u.email === email && u.senha === senha
    );

    if (!usuarioEncontrado) {
      setErro("Usuário ou senha inválidos!");
      return;
    }

    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
    navigate("/home-usuario");
  };

  return (
    <div
      className="login-container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/salaothais.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "Segoe UI, Arial, sans-serif",
        position: "relative",
        padding: 20
      }}
    >
      {/* Overlay rosa translúcido */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(255, 119, 192, 0.4)",
          zIndex: 0
        }}
      ></div>

      <div className="login-form">
        <h2>Salão Thais Machado</h2>

        <label>
          Email:
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>

        <label>
          Senha:
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </label>

        {erro && <p className="error-message">{erro}</p>}

        <button
          onClick={handleLogin}
        >
          Entrar
        </button>

        <p style={{ marginTop: 15, textAlign: "center" }}>
          Ainda não tem cadastro?{" "}
          <span
            onClick={() => navigate("/cadastro")}
            style={{ color: "#ff77c0", fontWeight: "bold", cursor: "pointer" }}
          >
            Cadastre-se
          </span>
        </p>
      </div>
    </div>
  );
}
