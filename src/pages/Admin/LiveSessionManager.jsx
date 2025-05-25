import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

function LiveSessionManager() {
  const { user } = useAuth();
  const [cursos, setCursos] = useState([]);
  const [modulos, setModulos] = useState([]);
  const [selectedCurso, setSelectedCurso] = useState(null);
  const [novaLiveSession, setNovaLiveSession] = useState({
    moduloId: "",
    titulo: "",
    linkJitsi: "",
    dataHora: "",
    senha: "",
  });

  useEffect(() => {
    fetch("http://localhost:4000/api/cursos", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCursos(data))
      .catch((err) => console.error("Erro ao carregar cursos:", err));
  }, []);

  useEffect(() => {
    if (selectedCurso) {
      fetch(`http://localhost:4000/api/cursos/${selectedCurso}/conteudo`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setModulos(data))
        .catch((err) => console.error("Erro ao carregar módulos:", err));
    }
  }, [selectedCurso]);

  const handleNovaLiveSession = (e) => {
    e.preventDefault();
    fetch("http://localhost:4000/api/liveSessions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(novaLiveSession),
    })
      .then((res) => res.json())
      .then((data) => {
        setModulos((prev) =>
          prev.map((modulo) =>
            modulo.id === parseInt(novaLiveSession.moduloId)
              ? { ...modulo, liveSessions: [...(modulo.liveSessions || []), data] }
              : modulo
          )
        );
        setNovaLiveSession({ moduloId: "", titulo: "", linkJitsi: "", dataHora: "", senha: "" });
      })
      .catch((err) => console.error("Erro ao criar live session:", err));
  };

  const handleExcluirLiveSession = (moduloId, liveSessionId) => {
    fetch(`http://localhost:4000/api/liveSessions/${liveSessionId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.status === 204) {
          setModulos((prev) =>
            prev.map((modulo) =>
              modulo.id === moduloId
                ? { ...modulo, liveSessions: modulo.liveSessions.filter((ls) => ls.id !== liveSessionId) }
                : modulo
            )
          );
        }
      })
      .catch((err) => console.error("Erro ao excluir live session:", err));
  };

  if (user.role !== "admin") {
    return <p className="text-center text-gray-600 font-inter">Acesso negado.</p>;
  }

  return (
    <div>
      <h1 className="text-3xl text-center font-montserrat font-bold text-buriti-red mb-6">
        Gerenciar Aulas ao Vivo
      </h1>
      <div className="mb-4">
        <select
          onChange={(e) => setSelectedCurso(e.target.value)}
          className="p-2 border rounded"
        >
          <option value="">Selecione um curso</option>
          {cursos.map((curso) => (
            <option key={curso.id} value={curso.id}>
              {curso.title}
            </option>
          ))}
        </select>
      </div>
      {selectedCurso && (
        <>
          <form onSubmit={handleNovaLiveSession} className="max-w-lg mx-auto space-y-4 mb-6">
            <select
              value={novaLiveSession.moduloId}
              onChange={(e) => setNovaLiveSession({ ...novaLiveSession, moduloId: e.target.value })}
              className="w-full p-2 border rounded"
              required
            >
              <option value="">Selecione um módulo</option>
              {modulos.map((modulo) => (
                <option key={modulo.id} value={modulo.id}>
                  {modulo.titulo}
                </option>
              ))}
            </select>
            <input
              type="text"
              value={novaLiveSession.titulo}
              onChange={(e) => setNovaLiveSession({ ...novaLiveSession, titulo: e.target.value })}
              placeholder="Título"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              value={novaLiveSession.linkJitsi}
              onChange={(e) => setNovaLiveSession({ ...novaLiveSession, linkJitsi: e.target.value })}
              placeholder="Link Jitsi"
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="datetime-local"
              value={novaLiveSession.dataHora}
              onChange={(e) => setNovaLiveSession({ ...novaLiveSession, dataHora: e.target.value })}
              className="w-full p-2 border rounded"
              required
            />
            <input
              type="text"
              value={novaLiveSession.senha}
              onChange={(e) => setNovaLiveSession({ ...novaLiveSession, senha: e.target.value })}
              placeholder="Senha (opcional)"
              className="w-full p-2 border rounded"
            />
            <button
              type="submit"
              className="w-full px-4 py-2 bg-buriti-orange text-white rounded hover:bg-buriti-cyan transition"
            >
              Criar Aula ao Vivo
            </button>
          </form>
          <div className="space-y-4">
            {modulos.map((modulo) => (
              <div key={modulo.id} className="border rounded-lg p-4 shadow-md bg-white">
                <h3 className="text-lg font-semibold font-montserrat text-gray-800">
                  {modulo.titulo}
                </h3>
                {modulo.liveSessions?.length ? (
                  modulo.liveSessions.map((liveSession) => (
                    <div key={liveSession.id} className="mt-2 border-t pt-2">
                      <p className="text-gray-700 font-inter">{liveSession.titulo}</p>
                      <p className="text-gray-700 font-inter">Link: {liveSession.linkJitsi}</p>
                      <p className="text-gray-700 font-inter">
                        Data/Hora: {new Date(liveSession.dataHora).toLocaleString()}
                      </p>
                      <button
                        onClick={() => handleExcluirLiveSession(modulo.id, liveSession.id)}
                        className="mt-2 px-4 py-2 bg-red-500 text-white rounded"
                      >
                        Excluir
                      </button>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-600 font-inter">Nenhuma aula ao vivo cadastrada.</p>
                )}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default LiveSessionManager;
