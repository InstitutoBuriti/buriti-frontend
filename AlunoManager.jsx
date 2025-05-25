import { useState } from "react";

function AlunoManager() {
  const [alunos, setAlunos] = useState([
    { id: 1, nome: "João Silva", status: "Ativo" },
    { id: 2, nome: "Maria Souza", status: "Inativo" },
    { id: 3, nome: "Carlos Oliveira", status: "Ativo" },
  ]);

  const toggleStatus = (id) => {
    setAlunos((prev) =>
      prev.map((a) =>
        a.id === id ? { ...a, status: a.status === "Ativo" ? "Inativo" : "Ativo" } : a
      )
    );
  };

  const removerAluno = (id) => {
    const confirm = window.confirm("Deseja remover este aluno?");
    if (confirm) {
      setAlunos(alunos.filter((a) => a.id !== id));
    }
  };

  return (
    <main className="px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Gerenciar Alunos</h1>

      <table className="w-full bg-white border rounded shadow text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border-b">Nome</th>
            <th className="p-3 border-b">Status</th>
            <th className="p-3 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {alunos.map((aluno) => (
            <tr key={aluno.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{aluno.nome}</td>
              <td className="p-3 border-b">{aluno.status}</td>
              <td className="p-3 border-b space-x-2">
                <button
                  onClick={() => toggleStatus(aluno.id)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Alterar Status
                </button>
                <button
                  onClick={() => removerAluno(aluno.id)}
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

export default AlunoManager;

