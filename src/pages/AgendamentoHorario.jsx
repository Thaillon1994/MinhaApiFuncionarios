// src/pages/AgendamentoHorario.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AgendamentoHorario.css";

// lista de serviços (pode vir do backend mais tarde)
const servicosDisponiveis = [
  { id: 1, nome: "Escova", preco: 40 },
  { id: 2, nome: "Escova + Hidratação", preco: 50 },
  { id: 3, nome: "Corte", preco: 30 },
  { id: 4, nome: "Aplicação de tinta", preco: 25 },
  { id: 5, nome: "Botox", preco: 80 },
];

export default function AgendamentoHorario() {
  const navigate = useNavigate();
  const [nome, setNome] = useState("");
  const [data, setData] = useState("");
  const [hora, setHora] = useState("");
  const [selecionados, setSelecionados] = useState([]);

  // alterna seleção do serviço
  const toggleServico = (id) => {
    setSelecionados(prev => (prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]));
  };

  // calcula total
  const valorTotal = selecionados.reduce((acc, id) => {
    const s = servicosDisponiveis.find(x => x.id === id);
    return s ? acc + s.preco : acc;
  }, 0);
  const adiantamento = (valorTotal * 0.2).toFixed(2);

  const handleConfirmar = () => {
    if (!nome || !data || !hora || selecionados.length === 0) {
      alert("Preencha todos os campos e selecione pelo menos um serviço.");
      return;
    }

    // salva agendamento no localStorage (simulando backend)
    const todos = JSON.parse(localStorage.getItem("agendamentos")) || [];
    // pega email do usuario logado (se existir)
    const user = JSON.parse(localStorage.getItem("usuarioLogado")) || {};
    const novo = {
      id: Date.now(),
      nome,
      email: user.email || "",
      data,
      hora,
      servicos: selecionados.map(id => servicosDisponiveis.find(s => s.id === id).nome),
      valorTotal,
    };
    todos.push(novo);
    localStorage.setItem("agendamentos", JSON.stringify(todos));
    alert(`Agendamento confirmado para ${nome} em ${data} às ${hora}.\nTotal: R$ ${valorTotal.toFixed(2)}\nAdiantamento: R$ ${adiantamento}`);
    navigate("/home");
  };

  return (
    <div className="ag-root">
      <div className="ag-card">
        <h2>Marcar Horário</h2>

        <label>Nome
          <input value={nome} onChange={(e)=>setNome(e.target.value)} placeholder="Nome do cliente" />
        </label>

        <label>Data
          <input type="date" value={data} onChange={(e)=>setData(e.target.value)} />
        </label>

        <label>Hora
          <input type="time" value={hora} onChange={(e)=>setHora(e.target.value)} />
        </label>

        <p style={{ marginTop: 12 }}>Selecione serviços (20% de adiantamento):</p>
        <div className="servicos-grid">
          {servicosDisponiveis.map(s => (
            <div key={s.id} className={`servico-card ${selecionados.includes(s.id) ? "selected" : ""}`} onClick={()=>toggleServico(s.id)}>
              <div>{s.nome}</div>
              <div>R$ {s.preco}</div>
            </div>
          ))}
        </div>

        <div className="valores">
          <div>Valor total: R$ {valorTotal.toFixed(2)}</div>
          <div>Adiantamento (20%): R$ {adiantamento}</div>
        </div>

        <button className="btn-primary" onClick={handleConfirmar}>Confirmar Agendamento</button>
        <button className="btn-secondary" onClick={()=>navigate("/home")}>Voltar</button>
      </div>
    </div>
  );
}
