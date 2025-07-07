import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

// Definir a constante API_URL usando a variável de ambiente
const API_URL = import.meta.env.VITE_API_URL;

function Foruns() {
  const { user, token } = useAuth();
  const [foruns, setForuns] = useState([]);
  const [mensagens, setMensagens] = useState({});
  const [matriculas, setMatriculas] = useState({});
  const [statusEnvio, setStatusEnvio] = useState({});

  useEffect(() => {
    fetch(`${API_URL}/api/enrollments`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setMatriculas)
      .catch((err) => console.error("Erro ao carregar matrículas:", err));
  }, [token]);

  useEffect(() => {
    fetch(`${API_URL}/api/foruns`, {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const filtrados = data.filter((forum) =>
          matriculas.some(
            (mat) => mat.curso_id === forum.curso_id && mat.status === "ativo"
          )
        );
        setForuns(filtrados);
      })
      .catch((err) => console.error("Erro ao carregar fóruns:", err));
  }, [matriculas, token]);

  const enviarMensagem = (forumId) => {
    const texto = mensagens[forumId];
    if (!texto || !texto.trim()) return;

    setStatusEnvio((prev) => ({ ...prev, [forumId]: "enviando" }));

    fetch(`${API_URL}/api/foruns/${forumId}/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ message: texto }),
    })
      .then((res) => res.json())
      .then((forumAtualizado) => {
        setForuns((prev) =>
          prev.map((f) => (f.id === forumAtualizado.id ? forumAtualizado : f))
        );
        setMensagens((prev) => ({ ...prev, [forumId]: "" }));
        setStatusEnvio((prev) => ({ ...prev, [forumId]: "sucesso" }));
      })
      .catch((err) => {
        console.error("Erro ao enviar mensagem:", err);
        setStatusEnvio((prev) => ({ ...prev, [forumId]: "erro" }));
      });
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-montserrat font-bold text-buriti-red mb-6">
        Fóruns
      </h1>

      {foruns.length === 0 ? (
        <p className="text-center text-gray-600 font-inter">
          Não há fóruns disponíveis.
        </p>
      ) : (
        foruns.map((forum) => (
          <div
            key={forum.id}
            className="border rounded-lg p-4 mb-4 shadow-md bg-white"
          >
            <h3 className="text-lg font-semibold font-montserrat text-gray-800">
              {forum.title}
            </h3>

            <div className="mt-2 space-y-2">
              {forum.messages.map((msg, index) => (
                <div key={index} className="bg-gray-100 p-2 rounded">
                  <p className="font-inter text-gray-700">{msg.message}</p>
                  <p className="text-xs text-gray-500">
                    {msg.user_nome || msg.user_name || "Usuário"} –{" "}
                    {new Date(msg.timestamp).toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4">
              <textarea
                value={mensagens[forum.id] || ""}
                onChange={(e) =>
                  setMensagens((prev) => ({
                    ...prev,
                    [forum.id]: e.target.value,
                  }))
                }
                className="w-full p-2 border rounded font-inter"
                placeholder="Digite sua mensagem..."
              />
              <button
                onClick={() => enviarMensagem(forum.id)}
                className="mt-2 px-4 py-2 bg-buriti-orange text-white rounded hover:bg-buriti-cyan transition font-montserrat"
              >
                Enviar
              </button>

              {statusEnvio[forum.id] === "sucesso" && (
                <p className="text-green-600 text-sm mt-1 font-inter">
                  Mensagem enviada!
                </p>
              )}
              {statusEnvio[forum.id] === "erro" && (
                <p className="text-red-600 text-sm mt-1 font-inter">
                  Erro ao enviar mensagem.
                </p>
              )}
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default Foruns;
