import React, { useEffect, useState } from 'react';

export default function CadastroClientes() {
  const [clientes, setClientes] = useState([]);
  const [clienteEditando, setClienteEditando] = useState(null);
  const [modalAberto, setModalAberto] = useState(false);

  useEffect(() => {
    carregarClientes();
  }, []);

  const carregarClientes = () => {
    const todosUsuarios = Object.keys(localStorage)
      .filter((chave) => {
        try {
          const user = JSON.parse(localStorage.getItem(chave));
          return user && user.role === 'cliente';
        } catch {
          return false;
        }
      })
      .map((chave) => JSON.parse(localStorage.getItem(chave)));

    setClientes(todosUsuarios);
  };

  const handleExcluir = (email) => {
    const confirmacao = window.confirm('Tem certeza que deseja excluir este cliente?');
    if (confirmacao) {
      localStorage.removeItem(email);
      carregarClientes();
    }
  };

  const handleEditar = (cliente) => {
    setClienteEditando({ ...cliente }); // cria uma cópia
    setModalAberto(true);
  };

  const handleSalvarEdicao = () => {
    localStorage.setItem(clienteEditando.email, JSON.stringify(clienteEditando));
    setModalAberto(false);
    carregarClientes();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6 text-center">Clientes Cadastrados</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3">
        {clientes.length === 0 ? (
          <p className="col-span-full text-center text-gray-500">Nenhum cliente cadastrado.</p>
        ) : (
          clientes.map((cliente) => (
            <div key={cliente.email} className="bg-white p-4 rounded-lg shadow space-y-2">
              <h2 className="text-xl font-semibold">{cliente.nome}</h2>
              <p><strong>Email:</strong> {cliente.email}</p>
              <p><strong>Endereço:</strong> {cliente.endereco}</p>
              <div className="flex gap-2 mt-2">
                <button
                  className="bg-yellow-500 text-white px-3 py-1 rounded hover:bg-yellow-600"
                  onClick={() => handleEditar(cliente)}
                >
                  Editar
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700"
                  onClick={() => handleExcluir(cliente.email)}
                >
                  Excluir
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Modal de edição */}
      {modalAberto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Editar Cliente</h2>
            <div className="space-y-3">
              <input
                type="text"
                value={clienteEditando.nome}
                onChange={(e) => setClienteEditando({ ...clienteEditando, nome: e.target.value })}
                className="w-full px-4 py-2 border rounded"
                placeholder="Nome"
              />
              <input
                type="text"
                value={clienteEditando.endereco}
                onChange={(e) => setClienteEditando({ ...clienteEditando, endereco: e.target.value })}
                className="w-full px-4 py-2 border rounded"
                placeholder="Endereço"
              />
              <div className="flex justify-end gap-3 mt-4">
                <button
                  onClick={() => setModalAberto(false)}
                  className="px-4 py-2 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Cancelar
                </button>
                <button
                  onClick={handleSalvarEdicao}
                  className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
                >
                  Salvar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
