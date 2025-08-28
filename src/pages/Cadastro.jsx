// src/pages/Cadastro.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cadastro.css";

/*
  Página de cadastro:
  - Campos: nome, email, senha
  - Salva no localStorage na chave "usuarios" (array)
  - Verifica se email já existe
  - Após cadastro, navega para /login
*/
export default function Cadastro() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleCadastro = () => {
    // validação básica
    if (!nome || !email || !senha) {
      setErro("Preencha todos os campos!");
      setSucesso("");
      return;
    }

    // pega lista atual de usuários
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // verifica duplicidade por email
    const usuarioExistente = usuarios.find((u) => u.email === email);
    if (usuarioExistente) {
      setErro("Este email já está cadastrado!");
      setSucesso("");
      return;
    }

    // cria novo usuário e salva
    const novoUsuario = { nome, email, senha, tipo: "usuario" };
    usuarios.push(novoUsuario);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // feedback e navegação
    setErro("");
    setSucesso("Cadastro realizado com sucesso! Redirecionando para login...");
    // redireciona após pequena pausa para usuário ver a mensagem
    setTimeout(() => navigate("/login"), 900);
  };

  return (
    <div
      className="cadastro-container"
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/salaothais.jpg"})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        position: "relative",
        padding: 20,
        fontFamily: "Segoe UI, Arial, sans-serif",
      }}
    >
      {/* overlay rosa */}
      <div style={{ position: "absolute", inset: 0, backgroundColor: "rgba(255,119,192,0.36)", zIndex: 0 }} />

      <div className="cadastro-form" role="form" aria-label="Formulário de cadastro" style={{ zIndex: 1 }}>
        <h2>Cadastro</h2>

        <label>
          Nome:
          <input type="text" placeholder="Digite seu nome" value={nome} onChange={(e) => setNome(e.target.value)} />
        </label>

        <label>
          Email:
          <input type="email" placeholder="Digite seu email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>

        <label>
          Senha:
          <input type="password" placeholder="Digite sua senha" value={senha} onChange={(e) => setSenha(e.target.value)} />
        </label>

        {erro && <p className="error-message">{erro}</p>}
        {sucesso && <p className="success-message">{sucesso}</p>}

        <button onClick={handleCadastro} aria-label="Cadastrar">Cadastrar</button>

        <p style={{ marginTop: 14, textAlign: "center" }}>
          Já tem cadastro?{" "}
          <span onClick={() => navigate("/login")} style={{ color: "#ff77c0", fontWeight: 700, cursor: "pointer" }}>
            Faça login
          </span>
        </p>
      </div>
    </div>
  );
}
