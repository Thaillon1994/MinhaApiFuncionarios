import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const servicosFixos = [
  { nome: 'Escova', valor: 40 },
  { nome: 'Escova + hidratação', valor: 50 },
  { nome: 'Corte', valor: 30 },
  { nome: 'Aplicação de tinta', valor: 25 },
  { nome: 'Botox', valor: 80 },
  { nome: 'Selagem', valor: 120 },
  { nome: 'Progressiva', valor: 150 },
  { nome: 'Luzes', valor: 400 },
  { nome: 'Sobrancelha', valor: 20 },
];

export default function Agendamento() {
  const navigate = useNavigate();

  const [agendamentos, setAgendamentos] = useState([]);
  const [data, setData] = useState('');
  const [hora, setHora] = useState('');
  const [servico, setServico] = useState('');
  const [usuario, setUsuario] = useState(null);
  const [editandoId, setEditandoId] = useState(null);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuarioLogado'));
    setUsuario(user);
    const ags = JSON.parse(localStorage.getItem('agendamentos')) || [];
    setAgendamentos(ags);
  }, []);

  const isAdmin = usuario?.email === 'admin1@admin.com';

  const agendamentosVisiveis = isAdmin
    ? agendamentos
    : agendamentos.filter(a => a.cliente === usuario?.nome);

  const limparFormulario = () => {
    setData('');
    setHora('');
    setServico('');
    setEditandoId(null);
  };

  const handleAgendar = (e) => {
    e.preventDefault();
    if (!data || !hora || !servico) {
      alert('Por favor, preencha todos os campos.');
      return;
    }

    const conflito = agendamentos.some(
      (a) => a.id !== editandoId && a.data === data && a.hora === hora
    );
    if (conflito) {
      alert('Este horário já está reservado.');
      return;
    }

    const servicoSelecionado = servicosFixos.find(s => s.nome === servico);
    if (!servicoSelecionado) {
      alert('Serviço inválido.');
      return;
    }

    const taxa = servicoSelecionado.valor * 0.2;
    const total = servicoSelecionado.valor + taxa;

    if (editandoId) {
      // Editar agendamento existente
      const novosAgendamentos = agendamentos.map(a =>
        a.id === editandoId
          ? { ...a, data, hora, servico, valorServico: servicoSelecionado.valor, taxa, total }
          : a
      );
      setAgendamentos(novosAgendamentos);
      localStorage.setItem('agendamentos', JSON.stringify(novosAgendamentos));
      alert('Agendamento atualizado com sucesso!');
    } else {
      // Criar novo agendamento
      const novoAgendamento = {
        id: Date.now(),
        data,
        hora,
        servico,
        valorServico: servicoSelecionado.valor,
        taxa,
        total,
        cliente: usuario?.nome || 'Cliente',
      };

      const novosAgendamentos = [...agendamentos, novoAgendamento];
      setAgendamentos(novosAgendamentos);
      localStorage.setItem('agendamentos', JSON.stringify(novosAgendamentos));
      alert(`Agendamento realizado!\nServiço: ${servico}\nValor: R$${servicoSelecionado.valor.toFixed(2)}\nTaxa (20%): R$${taxa.toFixed(2)}\nTotal: R$${total.toFixed(2)}`);
    }

    limparFormulario();
  };

  const handleExcluir = (id) => {
    if (!window.confirm('Confirma a exclusão deste agendamento?')) return;
    const filtrados = agendamentos.filter(a => a.id !== id);
    setAgendamentos(filtrados);
    localStorage.setItem('agendamentos', JSON.stringify(filtrados));
  };

  const handleEditar = (id) => {
    const agendamento = agendamentos.find(a => a.id === id);
    if (!agendamento) return;

    setData(agendamento.data);
    setHora(agendamento.hora);
    setServico(agendamento.servico);
    setEditandoId(id);
  };

  return (
    <div className="max-w-xl mx-auto bg-white shadow-lg rounded-xl p-8">
      {/* Botão voltar para home */}
      <button
        onClick={() => navigate('/home')}
        className="mb-6 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded inline-flex items-center"
      >
        ← Voltar para Início
      </button>

      <h2 className="text-3xl font-bold text-pink-700 mb-4 text-center">Agendamento de Horário</h2>

      <p className="text-sm text-center text-gray-700 bg-yellow-100 border border-yellow-300 rounded p-3 mb-6">
        Para garantir o compromisso com o horário marcado, é necessário o pagamento antecipado de <strong>20% do valor do serviço</strong>.
      </p>

      <form onSubmit={handleAgendar} className="space-y-4 mb-8">
        <div>
          <label className="block font-semibold mb-1">Data:</label>
          <input
            type="date"
            value={data}
            onChange={e => setData(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Hora:</label>
          <input
            type="time"
            value={hora}
            onChange={e => setHora(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          />
        </div>

        <div>
          <label className="block font-semibold mb-1">Serviço:</label>
          <select
            value={servico}
            onChange={e => setServico(e.target.value)}
            className="w-full border rounded px-3 py-2"
            required
          >
            <option value="">-- Selecione um serviço --</option>
            {servicosFixos.map(s => (
              <option key={s.nome} value={s.nome}>
                {s.nome} - R$ {s.valor}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-pink-600 text-white py-3 rounded hover:bg-pink-700 transition"
        >
          {editandoId ? 'Salvar Alterações' : 'Agendar'}
        </button>
        {editandoId && (
          <button
            type="button"
            onClick={limparFormulario}
            className="w-full mt-2 bg-gray-400 text-white py-2 rounded hover:bg-gray-500 transition"
          >
            Cancelar Edição
          </button>
        )}
      </form>

      <h3 className="text-xl font-bold mb-4 text-pink-700">Agendamentos</h3>
      {agendamentosVisiveis.length === 0 ? (
        <p className="text-center text-gray-600">Nenhum agendamento realizado.</p>
      ) : (
        <ul className="space-y-4">
          {agendamentosVisiveis.map(({ id, data, hora, servico, valorServico, taxa, total, cliente }) => (
            <li
              key={id}
              className="border rounded p-4 shadow-sm bg-pink-50 flex flex-col space-y-1"
            >
              <strong>Cliente:</strong> {cliente}<br />
              <strong>Data:</strong> {data} <strong>Hora:</strong> {hora}<br />
              <strong>Serviço:</strong> {servico} <br />
              <strong>Valor:</strong> R$ {valorServico.toFixed(2)} <br />
              <strong>Taxa (20%):</strong> R$ {taxa.toFixed(2)} <br />
              <strong>Total:</strong> R$ {total.toFixed(2)} <br />
              {isAdmin && (
                <div className="space-x-2 mt-2">
                  <button
                    onClick={() => handleEditar(id)}
                    className="bg-yellow-400 text-white py-1 px-3 rounded hover:bg-yellow-500"
                  >
                    Editar
                  </button>
                  <button
                    onClick={() => handleExcluir(id)}
                    className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
                  >
                    Excluir
                  </button>
                </div>
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
