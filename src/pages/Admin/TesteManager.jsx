import { useState } from "react";

function TesteManager() {
  const [testes, setTestes] = useState([
    { id: 1, titulo: "Quiz de Inclusão", curso: "Educação Especial", status: "Publicado" },
    { id: 2, titulo: "Autoavaliação", curso: "Tecnologia na Educação", status: "Rascunho" },
  ]);

  const alternarStatus = (id) => {
    setTestes((prev) =>
      prev.map((t) =>
        t.id === id
          ? { ...t, status: t.status === "Publicado" ? "Rascunho" : "Publicado" }
          : t
      )
    );
  };

  const removerTeste = (id) => {
    if (window.confirm("Deseja remover este teste?")) {
      setTestes(testes.filter((t) => t.id !== id));
    }
  };

  return (
    <main className="px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Gerenciar Testes</h1>

      <table className="w-full bg-white border rounded shadow text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border-b">Título</th>
            <th className="p-3 border-b">Curso</th>
            <th className="p-3 border-b">Status</th>
            <th className="p-3 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {testes.map((t) => (
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
                  onClick={() => removerTeste(t.id)}
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

export default TesteManager;

