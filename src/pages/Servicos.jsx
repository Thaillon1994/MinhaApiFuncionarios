// src/pages/Servicos.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Servicos.css";

export default function Servicos() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const u = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (!u) { navigate("/"); return; }
    setUsuario(u);

    // Apenas admin vê
    if (u.tipo !== "admin" && u.email !== "admin1@admin.com") return;

    const todos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    setAgendamentos(todos);
  }, [navigate]);

  if (!usuario) return null;
  if (usuario.tipo !== "admin" && usuario.email !== "admin1@admin.com") {
    return <div style={{ padding:20 }}>Acesso restrito. Apenas administradores.</div>;
  }

  return (
    <div className="serv-root">
      <div className="serv-card">
        <h2>Serviços — Agenda (Admin)</h2>
        {agendamentos.length === 0 && <p>Nenhum agendamento.</p>}
        <div className="serv-list">
          {agendamentos.map(a => (
            <div key={a.id} className="serv-item">
              <div>
                <div><strong>{a.servicos.join(", ")}</strong></div>
                <div>{a.nome} — {a.data} {a.hora}</div>
              </div>
              <div>
                <button className="btn-secondary" onClick={()=>alert("Editar " + a.id)}>Editar</button>
                <button className="btn-secondary" onClick={()=>{
                  const todos = JSON.parse(localStorage.getItem("agendamentos")) || [];
                  const filtrados = todos.filter(x=>x.id !== a.id);
                  localStorage.setItem("agendamentos", JSON.stringify(filtrados));
                  setAgendamentos(prev => prev.filter(x=>x.id !== a.id));
                }}>Excluir</button>
              </div>
            </div>
          ))}
        </div>

        <button className="btn-primary" onClick={()=>navigate("/home")}>Voltar</button>
      </div>
    </div>
  );
}
