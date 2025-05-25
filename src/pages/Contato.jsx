import { useState } from "react";
import Footer from "../components/Footer";

function Contato() {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [mensagem, setMensagem] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!nome.trim() || !email.trim() || !mensagem.trim()) return;
    console.log("Mensagem enviada:", { nome, email, mensagem });
    setEnviado(true);
    setNome("");
    setEmail("");
    setMensagem("");
    setTimeout(() => setEnviado(false), 3000);
  };

  return (
    <div className="bg-buriti-gray min-h-screen flex flex-col justify-between">
      <main className="px-6 py-10 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-buriti-red font-montserrat mb-6">Contato</h1>
        <form onSubmit={handleSubmit} className="space-y-4 font-inter">
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            placeholder="Seu nome"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-buriti-orange"
          />
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Seu e-mail"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-buriti-orange"
          />
          <textarea
            value={mensagem}
            onChange={(e) => setMensagem(e.target.value)}
            placeholder="Sua mensagem"
            className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-buriti-orange"
            rows="4"
          />
          <button
            type="submit"
            className="bg-buriti-orange text-white px-6 py-2 rounded hover:bg-buriti-dark-red transition"
          >
            Enviar
          </button>
          {enviado && (
            <p className="text-green-600 mt-2">Mensagem enviada com sucesso!</p>
          )}
        </form>
      </main>

      <Footer />
    </div>
  );
}

export default Contato;

