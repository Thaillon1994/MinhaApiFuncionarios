import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function AgendamentosMarcados() {
  const navigate = useNavigate();
  const [usuario, setUsuario] = useState(null);
  const [agendamentos, setAgendamentos] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('usuarioLogado'));
    if (!user) {
      navigate('/login');
      return;
    }
    setUsuario(user);

    // Exemplo de agendamentos
    const fakeAgendamentos = [
      { id: 1, cliente: 'João', data: '2025-08-15', hora: '14:00', servicos: ['Corte'], valorTotal: 30 },
      { id: 2, cliente: 'Maria', data: '2025-08-16', hora: '10:00', servicos: ['Escova', 'Tintura'], valorTotal: 90 },
    ];
    setAgendamentos(fakeAgendamentos);
  }, [navigate]);

  const isAdmin = usuario?.email === 'admin1@admin.com';

  const handleExcluir = (id) => {
    if(window.confirm('Confirma exclusão do agendamento?')){
      setAgendamentos(prev => prev.filter(a => a.id !== id));
    }
  };

  const handleEditar = (id) => alert(`Editar agendamento id: ${id}`);

  return (
    <div style={{
      minHeight: '100vh',
      backgroundImage: "url('/salaothais.jpg')",
      backgroundSize: 'cover',
      backgroundPosition: 'center',
      color: 'white',
      position: 'relative',
      padding: 20,
    }}>
      <div style={{ position: 'absolute', inset: 0, backgroundColor: 'rgba(0,0,0,0.6)', zIndex: 0 }} />

      <div style={{
        position: 'relative',
        zIndex: 1,
        maxWidth: 600,
        margin: '0 auto',
        backgroundColor: 'rgba(255,255,255,0.1)',
        borderRadius: 12,
        padding: 20,
      }}>
        <h1 style={{ marginBottom: 20, textAlign: 'center' }}>Agendamentos Marcados</h1>

        {agendamentos.length === 0 && <p>Nenhum agendamento encontrado.</p>}

        <ul style={{ listStyle: 'none', padding: 0 }}>
          {agendamentos.map(a => (
            <li key={a.id} style={{ backgroundColor: 'rgba(255,255,255,0.15)', borderRadius: 8, marginBottom: 12, padding: 12, display: 'flex', flexDirection: 'column' }}>
              <strong>Cliente:</strong> {a.cliente}
              <strong>Data:</strong> {a.data} &nbsp; <strong>Hora:</strong> {a.hora}
              <strong>Serviços:</strong> {a.servicos.join(', ')}
              <strong>Valor Total:</strong> R$ {a.valorTotal.toFixed(2)}

              <div style={{ marginTop: 8, display: 'flex', gap: 10 }}>
                {isAdmin && <button onClick={() => handleEditar(a.id)} style={{ flexGrow: 1, backgroundColor: '#db2777', border: 'none', padding: '8px', borderRadius: '8px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Editar</button>}
                <button onClick={() => handleExcluir(a.id)} style={{ flexGrow: 1, backgroundColor: '#f87171', border: 'none', padding: '8px', borderRadius: '8px', color: 'white', fontWeight: 'bold', cursor: 'pointer' }}>Excluir</button>
              </div>
            </li>
          ))}
        </ul>

        <button onClick={() => navigate('/')} style={{ marginTop: 20, width: '100%', backgroundColor: '#db2777', border: 'none', padding: '12px', borderRadius: '10px', color: 'white', fontWeight: 'bold', cursor: 'pointer', fontSize: 16 }}>
          Voltar para Home
        </button>
      </div>
    </div>
  );
}
