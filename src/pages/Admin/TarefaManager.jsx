import { useState } from "react";

function TarefaManager() {
  const [tarefas, setTarefas] = useState([
    {
      id: 1,
      titulo: "Atividade de Leitura",
      curso: "Educação Inclusiva",
      status: "Pendente",
    },
    {
      id: 2,
      titulo: "Plano de Aula",
      curso: "Corte e Costura Básico",
      status: "Concluída",
    },
  ]);

  const [form, setForm] = useState({ titulo: "", curso: "" });
  const [mensagem, setMensagem] = useState("");

  const adicionarTarefa = () => {
    if (!form.titulo.trim() || !form.curso.trim()) return;
    const nova = { id: Date.now(), ...form, status: "Pendente" };
    setTarefas([...tarefas, nova]);
    setForm({ titulo: "", curso: "" });
    showMensagem("Tarefa adicionada com sucesso.");
  };

  const removerTarefa = (id) => {
    if (window.confirm("Remover esta tarefa?")) {
      setTarefas(tarefas.filter((t) => t.id !== id));
      showMensagem("Tarefa removida.");
    }
  };

  const alternarStatus = (id) => {
    setTarefas((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "Pendente" ? "Concluída" : "Pendente" }
          : t
      )
    );
  };

  const atualizarForm = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const showMensagem = (msg) => {
    setMensagem(msg);
    setTimeout(() => setMensagem(""), 3000);
  };

  return (
    <main className="px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Gerenciar Tarefas</h1>

      {mensagem && (
        <div className="bg-green-100 text-green-800 p-2 mb-4 rounded">{mensagem}</div>
      )}

      <section className="space-y-3 mb-6 bg-white p-4 rounded shadow">
        <input
          type="text"
          name="titulo"
          value={form.titulo}
          onChange={atualizarForm}
          placeholder="Título da Tarefa"
          className="w-full px-3 py-2 border rounded"
        />
        <input
          type="text"
          name="curso"
          value={form.curso}
          onChange={atualizarForm}
          placeholder="Curso vinculado"
          className="w-full px-3 py-2 border rounded"
        />
        <button
          onClick={adicionarTarefa}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Adicionar Tarefa
        </button>
      </section>

      <table className="w-full text-left bg-white shadow rounded">
        <thead className="bg-gray-100 text-gray-700">
          <tr>
            <th className="p-3 border-b">Título</th>
            <th className="p-3 border-b">Curso</th>
            <th className="p-3 border-b">Status</th>
            <th className="p-3 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {tarefas.map((t) => (
            <tr key={t.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{t.titulo}</td>
              <td className="p-3 border-b">{t.curso}</td>
              <td className="p-3 border-b">{t.status}</td>
              <td className="p-3 border-b space-x-2">
                <button
                  onClick={() => alternarStatus(t.id)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Alternar Status
                </button>
                <button
                  onClick={() => removerTarefa(t.id)}
                  className="text-red-600 hover:underline text-sm"
                >
                  Remover
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default TarefaManager;

