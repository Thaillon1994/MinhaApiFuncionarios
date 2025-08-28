// src/pages/Login.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

/*
  Login.jsx
  - permite login do admin fixo (admin1@admin.com / 1234)
  - valida usuários cadastrados em localStorage (chave "usuarios")
  - salva o usuário logado em localStorage na chave "usuarioLogado"
*/
export default function Login() {
  const navigate = useNavigate();

  // estados controlados para form
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  // função chamada ao submeter o login
  const handleLogin = (e) => {
    e?.preventDefault?.();

    // valida campos
    if (!email || !senha) {
      setErro("Preencha todos os campos!");
      return;
    }

    // login fixo do admin (para testes / permissões)
    if (email === "admin1@admin.com" && senha === "1234") {
      // salva no localStorage um objeto representando o admin
      localStorage.setItem(
        "usuarioLogado",
        JSON.stringify({ nome: "Administrador", email, tipo: "admin" })
      );
      navigate("/home");
      return;
    }

    // busca usuários cadastrados no localStorage (array 'usuarios')
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];
    const usuarioEncontrado = usuarios.find((u) => u.email === email && u.senha === senha);

    if (!usuarioEncontrado) {
      setErro("Usuário ou senha inválidos!");
      return;
    }

    // salva o usuário encontrado e navega para Home
    localStorage.setItem("usuarioLogado", JSON.stringify(usuarioEncontrado));
    navigate("/home");
  };

  return (
    <div
      className="login-root"
      /* background com fallback cor rosa caso imagem falhe */
      style={{
        backgroundImage: `url(${process.env.PUBLIC_URL + "/salaothais.jpg"})`,
      }}
    >
      {/* overlay para contraste */}
      <div className="login-overlay" />

      <form className="login-form" onSubmit={handleLogin} aria-label="form-login">
        <h2>Salão Thais Machado</h2>

        <label>
          Email
          <input
            type="email"
            value={email}
            placeholder="seu@email.com"
            onChange={(e) => setEmail(e.target.value)}
            required
            aria-label="email"
          />
        </label>

        <label>
          Senha
          <input
            type="password"
            value={senha}
            placeholder="sua senha"
            onChange={(e) => setSenha(e.target.value)}
            required
            aria-label="senha"
          />
        </label>

        {erro && <p className="error-message" role="alert">{erro}</p>}

        <button className="btn-primary" type="submit">Entrar</button>

        <p className="small-line">
          Ainda não tem cadastro?{" "}
          <span className="link-like" onClick={() => navigate("/cadastro")} role="link" tabIndex={0}>
            Cadastre-se
          </span>
        </p>
      </form>
    </div>
  );
}
