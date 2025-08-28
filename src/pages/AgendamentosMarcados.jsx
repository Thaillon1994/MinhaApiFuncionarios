// src/pages/AgendamentosMarcados.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AgendamentosMarcados.css";

export default function AgendamentosMarcados() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [agend, setAgend] = useState([]);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!u) { navigate("/"); return; }
    setUsuario(u);

    const todos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    // se admin, mostra todos; se não, filtra por email do usuário
    if (u.tipo === "admin" || u.email === "admin1@admin.com") setAgend(todos);
    else setAgend(todos.filter(a => a.email === u.email));
  }, [navigate]);

  const excluir = (id) => {
    if (!window.confirm("Confirma exclusão?")) return;
    const todos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    const filtrados = todos.filter(a=>a.id !== id);
    localStorage.setItem("agendamentos", JSON.stringify(filtrados));
    setAgend(prev => prev.filter(a=>a.id !== id));
  };

  return (
    <div className="am-root">
      <div className="am-card">
        <h2>Agendamentos</h2>
        {agend.length === 0 && <p>Nenhum agendamento encontrado.</p>}
        <ul className="ag-list">
          {agend.map(a => (
            <li key={a.id} className="ag-item">
              <div>
                <div><strong>{a.nome}</strong> ({a.email})</div>
                <div>{a.servicos.join(", ")}</div>
                <div>{a.data} — {a.hora}</div>
                <div>R$ {a.valorTotal.toFixed(2)}</div>
              </div>
              <div className="ag-actions">
                {(usuario.tipo === "admin" || usuario.email === "admin1@admin.com") && (
                  <button className="btn-secondary" onClick={()=>alert("Editar (implemente) " + a.id)}>Editar</button>
                )}
                <button className="btn-secondary" onClick={()=>excluir(a.id)}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>

        <button className="btn-primary" onClick={()=>navigate("/home")}>Voltar</button>
      </div>
    </div>
  );
}
