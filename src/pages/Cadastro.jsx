// src/pages/Cadastro.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cadastro.css";

/*
  Cadastro.jsx
  - cria novo usuário e salva no localStorage em "usuarios" (array)
  - não cria admin — todo cadastro padrão vira 'usuario' (tipo)
*/
export default function Cadastro() {
  const navigate = useNavigate();

  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const [sucesso, setSucesso] = useState("");

  const handleCadastrar = (e) => {
    e?.preventDefault?.();

    // valida
    if (!nome || !email || !senha) {
      setErro("Preencha todos os campos!");
      setSucesso("");
      return;
    }

    // pega array de usuarios ou cria vazio
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // checa duplicidade por email
    if (usuarios.some((u) => u.email === email)) {
      setErro("Email já cadastrado");
      setSucesso("");
      return;
    }

    // cria objeto usuario
    const novo = { nome, email, senha, tipo: "usuario" };
    usuarios.push(novo);
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // feedback e leva ao login
    setErro("");
    setSucesso("Cadastro realizado! Você será redirecionado ao login...");
    setTimeout(() => navigate("/"), 900);
  };

  return (
    <div className="cad-root" style={{ backgroundImage: `url(${process.env.PUBLIC_URL + "/salaothais.jpg"})` }}>
      <div className="cad-overlay" />
      <form className="cad-form" onSubmit={handleCadastrar} aria-label="form-cadastro">
        <h2>Cadastrar Usuário</h2>

        <label>Nome
          <input value={nome} onChange={(e) => setNome(e.target.value)} placeholder="Seu nome completo" required />
        </label>

        <label>Email
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="seu@email.com" required />
        </label>

        <label>Senha
          <input type="password" value={senha} onChange={(e) => setSenha(e.target.value)} placeholder="senha" required />
        </label>

        {erro && <p className="error-message">{erro}</p>}
        {sucesso && <p className="success-message">{sucesso}</p>}

        <button className="btn-primary" type="submit">Cadastrar</button>

        <p style={{ marginTop: 12, textAlign: "center", color: "rgba(255,255,255,0.9)" }}>
          Já tem conta? <span className="link-like" onClick={() => navigate("/")}>Faça login</span>
        </p>
      </form>
    </div>
  );
}
