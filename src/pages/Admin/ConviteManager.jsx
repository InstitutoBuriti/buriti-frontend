import { useState } from "react";

function ConviteManager() {
  const [convites, setConvites] = useState([
    { id: 1, email: "joao@example.com", codigo: "ABC123", status: "Enviado" },
    { id: 2, email: "maria@example.com", codigo: "DEF456", status: "Usado" },
  ]);
  const [email, setEmail] = useState("");

  const gerarCodigo = () => {
    return Math.random().toString(36).substr(2, 6).toUpperCase();
  };

  const enviarConvite = () => {
    if (!email.trim()) return;
    const novoConvite = {
      id: Date.now(),
      email,
      codigo: gerarCodigo(),
      status: "Enviado",
    };
    setConvites([...convites, novoConvite]);
    setEmail("");
  };

  return (
    <main className="px-6 py-10 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Gerenciar Convites</h1>

      {/* Formulário de envio */}
      <div className="flex gap-4 mb-6">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail do convidado"
          className="flex-1 px-4 py-2 border rounded"
        />
        <button
          onClick={enviarConvite}
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Enviar Convite
        </button>
      </div>

      {/* Lista de Convites */}
      <table className="w-full bg-white border rounded shadow text-left">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-3 border-b">E-mail</th>
            <th className="p-3 border-b">Código</th>
            <th className="p-3 border-b">Status</th>
          </tr>
        </thead>
        <tbody>
          {convites.map((convite) => (
            <tr key={convite.id} className="hover:bg-gray-50">
              <td className="p-3 border-b">{convite.email}</td>
              <td className="p-3 border-b">{convite.codigo}</td>
              <td className="p-3 border-b">{convite.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}

export default ConviteManager;

