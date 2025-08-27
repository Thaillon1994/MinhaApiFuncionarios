// Importa React e o hook useState para gerenciar estados do formulário
import React, { useState, useEffect } from 'react';
// Importa o hook para navegar entre páginas
import { useNavigate } from 'react-router-dom';
// Importa CSS (opcional se quiser criar um arquivo separado)
import './AgendamentoHorario.css';

// Lista fixa de serviços disponíveis com id, nome e preço
const servicosDisponiveis = [
  { id: 1, nome: 'Escova', preco: 40 },
  { id: 2, nome: 'Escova + Hidratação', preco: 50 },
  { id: 3, nome: 'Corte', preco: 30 },
  { id: 4, nome: 'Aplicação de tinta', preco: 25 },
  { id: 5, nome: 'Botox', preco: 80 },
  { id: 6, nome: 'Selagem', preco: 120 },
  { id: 7, nome: 'Progressiva', preco: 150 },
  { id: 8, nome: 'Luzes', preco: 400 },
  { id: 9, nome: 'Sobrancelha', preco: 20 },
];

// Componente principal de agendamento
export default function AgendamentoHorario() {
  const navigate = useNavigate(); // Hook para redirecionar usuário
  const [usuario, setUsuario] = useState(null); // Estado do usuário logado
  const [nomeCliente, setNomeCliente] = useState(''); // Nome do cliente
  const [data, setData] = useState(''); // Data selecionada
  const [hora, setHora] = useState(''); // Hora selecionada
  const [servicosSelecionados, setServicosSelecionados] = useState([]); // IDs de serviços selecionados

  // Ao montar, verifica se há usuário logado
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (!user) {
      navigate('/'); // Se não houver usuário, volta para Home
      return;
    }
    setUsuario(user);
  }, [navigate]);

  // Alterna seleção do serviço
  const toggleServico = (id) => {
    if (servicosSelecionados.includes(id)) {
      setServicosSelecionados(servicosSelecionados.filter((sid) => sid !== id));
    } else {
      setServicosSelecionados([...servicosSelecionados, id]);
    }
  };

  // Calcula valor total
  const valorTotal = servicosSelecionados.reduce((total, id) => {
    const servico = servicosDisponiveis.find((s) => s.id === id);
    return servico ? total + servico.preco : total;
  }, 0);

  // Calcula 20% de adiantamento
  const valorAdiantamento = (valorTotal * 0.2).toFixed(2);

  // Função para confirmar agendamento
  const confirmarAgendamento = () => {
    if (!nomeCliente || !data || !hora || servicosSelecionados.length === 0) {
      alert('Preencha todos os campos e selecione pelo menos um serviço.');
      return;
    }

    alert(
      `Agendamento confirmado!\nCliente: ${nomeCliente}\nData: ${data}\nHora: ${hora}\nValor total: R$${valorTotal}\nAdiantamento (20%): R$${valorAdiantamento}`
    );

    // Aqui poderia enviar ao backend via fetch/axios

    // Limpa formulário
    setNomeCliente('');
    setData('');
    setHora('');
    setServicosSelecionados([]);

    // Redireciona para Home
    navigate('/');
  };

  return (
    <div
      style={{
        backgroundImage: "url('/salaothais.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        minHeight: '100vh',
        position: 'relative',
        color: '#fff',
        padding: 20,
      }}
    >
      {/* Overlay escuro */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0,0,0,0.6)',
          zIndex: 0,
        }}
      />
      {/* Container principal */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          maxWidth: 600,
          margin: '0 auto',
          backgroundColor: 'rgba(255,255,255,0.1)',
          borderRadius: 12,
          padding: 20,
        }}
      >
        <h2 style={{ marginBottom: 20, textAlign: 'center' }}>Marque seu horário</h2>

        {/* Campo Nome */}
        <label>
          Nome:
          <input
            type="text"
            value={nomeCliente}
            onChange={(e) => setNomeCliente(e.target.value)}
            style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: 'none' }}
            placeholder="Seu nome completo"
          />
        </label>

        {/* Campo Data */}
        <label style={{ display: 'block', marginTop: 15 }}>
          Data:
          <input
            type="date"
            value={data}
            onChange={(e) => setData(e.target.value)}
            style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: 'none' }}
          />
        </label>

        {/* Campo Hora */}
        <label style={{ display: 'block', marginTop: 15 }}>
          Hora:
          <input
            type="time"
            value={hora}
            onChange={(e) => setHora(e.target.value)}
            style={{ width: '100%', padding: 8, marginTop: 4, borderRadius: 6, border: 'none' }}
          />
        </label>

        {/* Serviços */}
        <div style={{ marginTop: 20 }}>
          <p>Selecione os serviços (20% de adiantamento sobre o valor total):</p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginTop: 10 }}>
            {servicosDisponiveis.map((servico) => (
              <div
                key={servico.id}
                onClick={() => toggleServico(servico.id)}
                style={{
                  cursor: 'pointer',
                  padding: 12,
                  borderRadius: 10,
                  backgroundColor: servicosSelecionados.includes(servico.id)
                    ? '#db2777'
                    : 'rgba(255,255,255,0.15)',
                  flex: '1 0 45%',
                  userSelect: 'none',
                  color: 'white',
                  fontWeight: '600',
                  textAlign: 'center',
                  boxShadow: servicosSelecionados.includes(servico.id)
                    ? '0 0 8px #db2777'
                    : 'none',
                  transition: 'all 0.3s',
                }}
              >
                {servico.nome} - R$ {servico.preco}
              </div>
            ))}
          </div>
        </div>

        {/* Valores */}
        <p style={{ marginTop: 20, fontWeight: 'bold', fontSize: 16 }}>
          Valor Total: R$ {valorTotal.toFixed(2)} <br />
          Valor de Adiantamento (20%): R$ {valorAdiantamento}
        </p>

        {/* Botão Confirmar */}
        <button
          onClick={confirmarAgendamento}
          style={{
            backgroundColor: '#db2777',
            border: 'none',
            color: 'white',
            padding: '12px 20px',
            marginTop: 20,
            width: '100%',
            borderRadius: 10,
            fontWeight: '600',
            cursor: 'pointer',
            fontSize: 16,
          }}
        >
          Confirmar Agendamento
        </button>

        {/* Botão Voltar */}
        <button
          onClick={() => navigate('/')}
          style={{
            marginTop: 15,
            width: '100%',
            padding: 10,
            borderRadius: 10,
            border: 'none',
            backgroundColor: '#b91c65',
            color: 'white',
            cursor: 'pointer',
            fontWeight: '600',
            fontSize: 16,
          }}
        >
          Voltar para Home
        </button>
      </div>
    </div>
  );
}
