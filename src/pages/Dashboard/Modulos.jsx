import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

// Definir a constante API_URL usando a variável de ambiente
const API_URL = import.meta.env.VITE_API_URL;

function Modulos() {
  const { user } = useAuth();
  const [cursos, setCursos] = useState([]);
  const [progresso, setProgresso] = useState([]);
  const [matriculas, setMatriculas] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/enrollments`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMatriculas(data))
      .catch((err) => console.error("Erro ao carregar matrículas:", err));
  }, [user.id]);

  useEffect(() => {
    fetch(`${API_URL}/api/progress/${user.id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setProgresso(data))
      .catch((err) => console.error("Erro ao carregar progresso:", err));
  }, [user.id]);

  useEffect(() => {
    fetch(`${API_URL}/api/cursos`)
      .then((res) => res.json())
      .then((data) => {
        const cursosMatriculados = data.filter((curso) =>
          matriculas.some(
            (matricula) =>
              matricula.curso_id === curso.id && matricula.status === "ativo"
          )
        );
        setCursos(cursosMatriculados);
      })
      .catch((err) => console.error("Erro ao carregar cursos:", err));
  }, [matriculas]);

  const marcarComoAssistida = (cursoId, moduloId, aulaId) => {
    fetch(`${API_URL}/api/progress/${user.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({
        curso_id: cursoId,
        modulo_id: moduloId,
        aula_id: aulaId,
        assistida: true,
      }),
    })
      .then((res) => res.json())
      .then(() => {
        setProgresso((prev) => [
          ...prev,
          { user_id: user.id, curso_id: cursoId, modulo_id: moduloId, aula_id: aulaId, assistida: true },
        ]);
      })
      .catch((err) => console.error("Erro ao atualizar progresso:", err));
  };

  return (
    <div>
      <h1 className="text-3xl text-center font-montserrat font-bold text-buriti-red mb-6">
        Meus Módulos
      </h1>

      {cursos.length === 0 ? (
        <p className="text-center text-gray-600 font-inter">
          Você não está matriculado em nenhum curso.
        </p>
      ) : (
        cursos.map((curso) => {
          const progressoCurso = progresso.filter((p) => p.curso_id === curso.id);
          const totalAulas = curso.modules.reduce(
            (acc, mod) => acc + (mod.lessons?.length || 0),
            0
          );
          const aulasAssistidas = progressoCurso.filter((p) => p.assistida).length;
          const percentualConcluido =
            totalAulas > 0 ? (aulasAssistidas / totalAulas) * 100 : 0;

          return (
            <div key={curso.id} className="mb-8">
              <h2 className="text-xl font-bold text-buriti-dark-red font-merriweather mb-2">
                {curso.title}
              </h2>
              <p className="text-sm font-inter text-gray-700 mb-2">
                Progresso: {percentualConcluido.toFixed(0)}% •{" "}
                {aulasAssistidas}/{totalAulas} aulas concluídas
              </p>
              <div className="w-full bg-gray-200 rounded h-2 mb-4">
                <div
                  className="bg-buriti-orange h-2 rounded"
                  style={{ width: `${percentualConcluido}%` }}
                ></div>
              </div>

              {curso.modules.map((modulo, index) => {
                const moduloAnteriorConcluido =
                  index === 0 ||
                  curso.modules[index - 1].lessons.every((aula) =>
                    progressoCurso.some(
                      (p) =>
                        p.modulo_id === curso.modules[index - 1].id &&
                        p.aula_id === aula.id &&
                        p.assistida
                    )
                  );

                const progressoModulo = progressoCurso.filter(
                  (p) => p.modulo_id === modulo.id
                );
                const moduloConcluido = modulo.lessons.every((aula) =>
                  progressoModulo.some(
                    (p) => p.aula_id === aula.id && p.assistida
                  )
                );

                return (
                  <div
                    key={modulo.id}
                    className={`border rounded-lg p-4 mb-4 ${
                      moduloAnteriorConcluido ? "bg-white" : "bg-gray-100"
                    } shadow-md`}
                  >
                    <h3 className="text-lg font-semibold font-montserrat text-gray-800 mb-2">
                      {modulo.titulo}{" "}
                      {moduloConcluido && (
                        <span className="text-green-600 text-sm">
                          (Concluído)
                        </span>
                      )}
                    </h3>
                    {moduloAnteriorConcluido ? (
                      <div className="space-y-2">
                        {modulo.lessons.map((aula) => {
                          const assistida = progressoModulo.some(
                            (p) => p.aula_id === aula.id && p.assistida
                          );
                          return (
                            <div
                              key={aula.id}
                              className="flex justify-between items-center border-b py-2"
                            >
                              <span className="text-gray-700 font-inter">
                                {aula.title}
                              </span>
                              <div className="flex items-center gap-2">
                                {aula.videoUrl && (
                                  <Link
                                    to={`/assistir/${curso.id}`}
                                    className="text-buriti-orange hover:text-buriti-cyan transition"
                                  >
                                    Assistir Aula
                                  </Link>
                                )}
                                {aula.materialUrl && (
                                  <a
                                    href={aula.materialUrl}
                                    className="text-buriti-orange hover:text-buriti-cyan transition"
                                    download
                                  >
                                    Baixar Material
                                  </a>
                                )}
                                <button
                                  onClick={() =>
                                    marcarComoAssistida(curso.id, modulo.id, aula.id)
                                  }
                                  className={`px-2 py-1 rounded text-sm ${
                                    assistida
                                      ? "bg-green-500 text-white"
                                      : "bg-gray-300 text-gray-700"
                                  }`}
                                  disabled={assistida}
                                >
                                  {assistida ? "Assistida" : "Marcar como Assistida"}
                                </button>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    ) : (
                      <p className="text-gray-500 font-inter italic">
                        Conclua o módulo anterior para desbloquear este conteúdo.
                      </p>
                    )}
                  </div>
                );
              })}
            </div>
          );
        })
      )}
    </div>
  );
}

export default Modulos;
