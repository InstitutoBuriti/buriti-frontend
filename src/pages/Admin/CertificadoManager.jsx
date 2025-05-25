import { useState } from "react";

function CertificadoManager() {
  const [certificados, setCertificados] = useState([
    { id: 1, aluno: "João Silva", curso: "Educação Especial", status: "Emitido" },
    { id: 2, aluno: "Maria Souza", curso: "Tecnologia na Educação", status: "Pendente" },
  ]);

  const alternarStatus = (id) => {
    setCertificados((prev) =>
      prev.map((c) =>
        c.id === id
          ? { ...c, status: c.status === "Emitido" ? "Pendente" : "Emitido" }
          : c
      )
    );
  };

  const removerCertificado = (id) => {
    if (window.confirm("Remover este certificado?")) {
      setCertificados(certificados.filter((c) => c.id !== id));
    }
  };

  return (
    <main className="px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Gerenciar Certificados</h1>

      <table className="w-full bg-white border rounded shadow text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border-b">Aluno</th>
            <th className="p-3 border-b">Curso</th>
            <th className="p-3 border-b">Status</th>
            <th className="p-3 border-b">Ações</th>
          </tr>
        </thead>
        <tbody>
          {certificados.map((c) => (
            <tr key={c.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{c.aluno}</td>
              <td className="p-3 border-b">{c.curso}</td>
              <td className="p-3 border-b">{c.status}</td>
              <td className="p-3 border-b space-x-2">
                <button
                  onClick={() => alternarStatus(c.id)}
                  className="text-blue-600 hover:underline text-sm"
                >
                  Alternar Status
                </button>
                <button
                  onClick={() => removerCertificado(c.id)}
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

export default CertificadoManager;

