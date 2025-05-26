import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

function Testes() {
  const { token, user } = useAuth();
  const [testes, setTestes] = useState([]);
  const [matriculas, setMatriculas] = useState([]);
  const [respostas, setRespostas] = useState({});
  const [feedbacks, setFeedbacks] = useState({});
  const [notaFinal, setNotaFinal] = useState({});

  useEffect(() => {
    fetch("http://localhost:4000/api/enrollments", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then(setMatriculas)
      .catch((err) => console.error("Erro ao carregar matrículas:", err));
  }, [token]);

  useEffect(() => {
    fetch("http://localhost:4000/api/tests", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => res.json())
      .then((data) => {
        const filtrados = data.filter((teste) =>
          matriculas.some(
            (mat) => mat.curso_id === teste.curso_id && mat.status === "ativo"
          )
        );
        setTestes(filtrados);
      })
      .catch((err) => console.error("Erro ao carregar testes:", err));
  }, [matriculas, token]);

  const responder = (testeId, perguntaId, alternativaSelecionada, alternativaCorreta) => {
    const correto = alternativaSelecionada === alternativaCorreta;
    setRespostas((prev) => ({
      ...prev,
      [testeId]: {
        ...(prev[testeId] || {}),
        [perguntaId]: alternativaSelecionada,
      },
    }));
    setFeedbacks((prev) => ({
      ...prev,
      [testeId]: {
        ...(prev[testeId] || {}),
        [perguntaId]: correto,
      },
    }));
  };

  const enviarNota = (teste) => {
    const feedbackDoTeste = feedbacks[teste.id] || {};
    const acertos = Object.values(feedbackDoTeste).filter(Boolean).length;
    const total = teste.perguntas.length;
    const nota = ((acertos / total) * 10).toFixed(1);

    fetch(`http://localhost:4000/api/tests/${teste.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ status: "concluido", nota }),
    })
      .then((res) => res.json())
      .then((atualizado) => {
        setNotaFinal((prev) => ({ ...prev, [teste.id]: nota }));
        setTestes((prev) => prev.map((t) => (t.id === atualizado.id ? atualizado : t)));
      })
      .catch((err) => console.error("Erro ao enviar nota:", err));
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-montserrat font-bold text-buriti-red mb-6">
        Meus Testes
      </h1>

      {testes.length === 0 ? (
        <p className="text-center text-gray-600 font-inter">Não há testes disponíveis.</p>
      ) : (
        <div className="space-y-6">
          {testes.map((teste) => (
            <div key={teste.id} className="border rounded-lg p-4 bg-white shadow-md">
              <h2 className="text-xl font-bold font-montserrat text-gray-800">{teste.title}</h2>
              <p className="text-gray-700 font-inter mb-4">{teste.description}</p>

              {teste.status === "concluido" ? (
                <p className="text-green-600 font-bold font-inter">
                  Teste concluído – Nota: {teste.nota}
                </p>
              ) : (
                <>
                  {teste.perguntas.map((pergunta) => (
                    <div key={pergunta.id} className="mb-4">
                      <p className="font-semibold text-gray-800 font-inter">{pergunta.texto}</p>
                      <div className="flex flex-col gap-2 mt-2">
                        {pergunta.alternativas.map((alt) => (
                          <button
                            key={alt}
                            onClick={() =>
                              responder(teste.id, pergunta.id, alt, pergunta.resposta_correta)
                            }
                            className={`p-2 rounded border text-left ${
                              respostas[teste.id]?.[pergunta.id] === alt
                                ? feedbacks[teste.id]?.[pergunta.id]
                                  ? "bg-green-100 border-green-400"
                                  : "bg-red-100 border-red-400"
                                : "bg-gray-100 border-gray-300 hover:bg-gray-200"
                            }`}
                          >
                            {alt}
                          </button>
                        ))}
                      </div>
                    </div>
                  ))}

                  <button
                    onClick={() => enviarNota(teste)}
                    className="mt-4 px-4 py-2 bg-buriti-cyan text-white rounded shadow hover:brightness-110 font-semibold font-montserrat"
                  >
                    Enviar Teste
                  </button>

                  {notaFinal[teste.id] && (
                    <p className="mt-2 text-blue-700 font-inter">
                      Nota enviada: {notaFinal[teste.id]}
                    </p>
                  )}
                </>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Testes;

