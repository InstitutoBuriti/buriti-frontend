import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

// Definir a constante API_URL usando a variável de ambiente
const API_URL = import.meta.env.VITE_API_URL;

function Tarefas() {
  const { user, token } = useAuth();
  const [tarefas, setTarefas] = useState([]);
  const [matriculas, setMatriculas] = useState([]);
  const [arquivos, setArquivos] = useState({});
  const [mensagem, setMensagem] = useState({});

  useEffect(() => {
    fetch(`${API_URL}/api/enrollments`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then(setMatriculas)
      .catch((err) => console.error("Erro ao carregar matrículas:", err));
  }, [token]);

  useEffect(() => {
    fetch(`${API_URL}/api/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const filtradas = data.filter((tarefa) =>
          matriculas.some(
            (mat) => mat.curso_id === tarefa.curso_id && mat.status === "ativo"
          )
        );
        setTarefas(filtradas);
      })
      .catch((err) => console.error("Erro ao carregar tarefas:", err));
  }, [matriculas, token]);

  const handleArquivoChange = (e, tarefaId) => {
    setArquivos({ ...arquivos, [tarefaId]: e.target.files[0] });
  };

  const enviarArquivo = (tarefaId) => {
    const arquivo = arquivos[tarefaId];
    if (!arquivo) {
      setMensagem((prev) => ({
        ...prev,
        [tarefaId]: "Selecione um arquivo antes de enviar.",
      }));
      return;
    }

    const formData = new FormData();
    formData.append("arquivo", arquivo);
    formData.append("user_id", user.id);
    formData.append("tarefa_id", tarefaId);

    fetch(`${API_URL}/api/tasks/${tarefaId}/upload`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    })
      .then((res) => res.json())
      .then((data) => {
        setTarefas((prev) =>
          prev.map((t) => (t.id === tarefaId ? data : t))
        );
        setMensagem((prev) => ({
          ...prev,
          [tarefaId]: "Arquivo enviado com sucesso!",
        }));
      })
      .catch((err) => {
        console.error("Erro ao enviar arquivo:", err);
        setMensagem((prev) => ({
          ...prev,
          [tarefaId]: "Erro ao enviar o arquivo.",
        }));
      });
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-montserrat font-bold text-buriti-red mb-6">
        Minhas Tarefas
      </h1>
      {tarefas.length === 0 ? (
        <p className="text-center text-gray-600 font-inter">
          Não há tarefas pendentes.
        </p>
      ) : (
        <div className="space-y-6">
          {tarefas.map((tarefa) => (
            <div
              key={tarefa.id}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              <h3 className="text-lg font-semibold font-montserrat text-gray-800">
                {tarefa.title}
              </h3>
              <p className="text-gray-700 font-inter mb-2">
                {tarefa.description}
              </p>

              {tarefa.status === "concluida" ? (
                <p className="text-green-600 font-bold font-inter">
                  Atividade já enviada.
                </p>
              ) : (
                <>
                  <input
                    type="file"
                    onChange={(e) => handleArquivoChange(e, tarefa.id)}
                    className="mb-2 block"
                  />
                  <button
                    onClick={() => enviarArquivo(tarefa.id)}
                    className="px-4 py-2 bg-buriti-cyan text-white rounded font-montserrat hover:brightness-110"
                  >
                    Enviar Atividade
                  </button>
                  {mensagem[tarefa.id] && (
                    <p className="mt-2 text-sm text-gray-700 font-inter">
                      {mensagem[tarefa.id]}
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

export default Tarefas;
