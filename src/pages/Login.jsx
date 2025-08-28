// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

/*
  Página de Login:
  - Faz validações simples de formulário
  - Usuário admin fixo: admin1@admin.com / 1234
  - Usuários registrados são lidos do localStorage (chave "usuarios")
  - Ao logar, salva 'usuarioLogado' no localStorage e navega para a home apropriada
*/
export default function Login() {
  const navigate = useNavigate(); // Hook para navegação programática
  const [email, setEmail] = useState(""); // armazena email digitado
  const [senha, setSenha] = useState(""); // armazena senha digitada
  const [erro, setErro] = useState("");   // mensagem de erro exibida na tela

  // Função acionada ao clicar no botão Entrar
  const handleLogin = () => {
    // validação básica: campos obrigatórios
    if (!email || !senha) {
      setErro("Preencha todos os campos!");
      return;
    }

    // login fixo do admin (teste)
    if (email === "admin1@admin.com" && senha === "1234") {
      // salva usuário logado no localStorage com campo tipo: 'admin'
      localStorage.setItem("usuarioLogado", JSON.stringify({ nome: "Admin", email, tipo: "admin" }));
      navigate("/home-admin"); // você pode criar essa rota depois
      return;
    }

    // busca usuários salvos no localStorage (registro via /cadastro)
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioEncontrado = usuarios.find((u) => u.email === email && u.senha === senha);

    if (!usuarioEncontrado) {
      // se não achou, mostra erro
      setErro("Usuário ou senha inválidos!");
      return;
    }

    // se achou, salva e navega para a home do usuário
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
    navigate("/home-usuario"); // crie essa rota/arquivo conforme necessidade
  };

  return (
    <div
      className="login-container"
      // Fundo vindo da pasta public: process.env.PUBLIC_URL garante caminho correto
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
      {/* Overlay rosa translúcido para legibilidade */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          backgroundColor: "rgba(255, 119, 192, 0.36)",
          zIndex: 0,
        }}
      />

      {/* Formulário (estilizado em Login.css) */}
      <div className="login-form" role="form" aria-label="Formulário de login" style={{ zIndex: 1 }}>
        <h2>Salão Thais Machado</h2>

        <label>
          Email:
          <input
            type="email"
            placeholder="Digite seu email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-label="Email"
          />
        </label>

        <label>
          Senha:
          <input
            type="password"
            placeholder="Digite sua senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            aria-label="Senha"
          />
        </label>

        {/* Se tiver erro, mostra mensagem */}
        {erro && <p className="error-message" role="alert">{erro}</p>}

        {/* Botão de ação */}
        <button onClick={handleLogin} aria-label="Entrar">Entrar</button>

        {/* Link para cadastro — navega para /cadastro */}
        <p style={{ marginTop: 15, textAlign: "center" }}>
          Ainda não tem cadastro?{" "}
          <span
            onClick={() => navigate("/cadastro")}
            style={{ color: "#ff77c0", fontWeight: "700", cursor: "pointer" }}
            role="link"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === "Enter") navigate("/cadastro"); }}
          >
            Cadastre-se
          </span>
        </p>
      </div>
    </div>
  );
}
