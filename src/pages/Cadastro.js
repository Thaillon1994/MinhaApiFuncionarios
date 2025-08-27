import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Cadastro.css";

export default function Cadastro() {
  const navigate = useNavigate();
  
  // Estados para os campos do formulário
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [endereco, setEndereco] = useState("");
  const [rg, setRg] = useState("");
  const [telefone, setTelefone] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Pega lista de usuários já cadastrados do localStorage
    const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

    // Adiciona novo usuário
    usuarios.push({ nome, email, senha, endereco, rg, telefone });
    localStorage.setItem("usuarios", JSON.stringify(usuarios));

    // Mensagem de sucesso
    setSuccessMsg("Cadastro realizado! Redirecionando...");
    
    // Redireciona para HomeUsuario
    setTimeout(() => {
      localStorage.setItem("usuarioLogado", JSON.stringify({ nome, email }));
      navigate("/home-usuario");
    }, 1500);
  };

  return (
    <div className="cadastro-container">
      <form className="cadastro-form" onSubmit={handleSubmit}>
        <h1>Cadastro de Usuário</h1>

        <input
          type="text"
          placeholder="Nome"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          required
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Senha"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Endereço"
          value={endereco}
          onChange={(e) => setEndereco(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="RG"
          value={rg}
          onChange={(e) => setRg(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Telefone"
          value={telefone}
          onChange={(e) => setTelefone(e.target.value)}
          required
        />

        <button type="submit" className="btn-primary">
          Cadastrar
        </button>

        {successMsg && <p className="success-msg">{successMsg}</p>}
      </form>
    </div>
  );
}
