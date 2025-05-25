import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

function AlunoManager() {
  const { user } = useAuth();
  const [alunos, setAlunos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [matriculas, setMatriculas] = useState([]);
  const [progresso, setProgresso] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState(null);

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
    fetch("http://localhost:4000/api/enrollments", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMatriculas(data))
      .catch((err) => console.error("Erro ao carregar matrículas:", err));
  }, []);

  useEffect(() => {
    if (selectedCourse) {
      fetch(`http://localhost:4000/api/aluno/progresso/admin?courseId=${selectedCourse}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setProgresso(data))
        .catch((err) => console.error("Erro ao carregar progresso:", err));
    }
  }, [selectedCourse]);

  useEffect(() => {
    fetch("http://localhost:4000/api/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const alunosFiltrados = data.filter((u) => u.role === "aluno");
        setAlunos(alunosFiltrados);
      })
      .catch((err) => console.error("Erro ao carregar alunos:", err));
  }, []);

  const handleMatricular = (userId, cursoId) => {
    fetch("http://localhost:4000/api/enrollments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ user_id: userId, curso_id: cursoId, status: "ativo" }),
    })
      .then((res) => res.json())
      .then((data) => setMatriculas((prev) => [...prev, data]))
      .catch((err) => console.error("Erro ao matricular:", err));
  };

  const handleDesmatricular = (matriculaId) => {
    fetch(`http://localhost:4000/api/enrollments/${matriculaId}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.status === 204) {
          setMatriculas((prev) => prev.filter((m) => m.id !== matriculaId));
        }
      })
      .catch((err) => console.error("Erro ao desmatricular:", err));
  };

  if (user.role !== "admin") {
    return <p className="text-center text-gray-600 font-inter">Acesso negado.</p>;
  }

  return (
    <div>
      <h1 className="text-3xl text-center font-montserrat font-bold text-buriti-red mb-6">
        Gerenciar Alunos
      </h1>
      <div className="mb-4">
        <select
          onChange={(e) => setSelectedCourse(e.target.value)}
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
      {selectedCourse ? (
        <div>
          <h2 className="text-xl font-bold text-buriti-dark-red font-merriweather mb-2">
            Progresso no Curso Selecionado
          </h2>
          {progresso.length === 0 ? (
            <p className="text-gray-600 font-inter">Nenhum progresso registrado.</p>
          ) : (
            <div className="space-y-4">
              {progresso.map((aluno) => (
                <div key={aluno.id} className="border rounded-lg p-4 shadow-md bg-white">
                  <p className="text-gray-700 font-inter">
                    {aluno.name}: {aluno.progress}% concluído
                  </p>
                </div>
              ))}
            </div>
          )}
        </div>
      ) : null}
      <h2 className="text-xl font-bold text-buriti-dark-red font-merriweather mb-2 mt-6">
        Lista de Alunos
      </h2>
      {alunos.length === 0 ? (
        <p className="text-gray-600 font-inter">Nenhum aluno encontrado.</p>
      ) : (
        <div className="space-y-4">
          {alunos.map((aluno) => {
            const alunoMatriculas = matriculas.filter((m) => m.user_id === aluno.id);
            return (
              <div key={aluno.id} className="border rounded-lg p-4 shadow-md bg-white">
                <p className="text-gray-700 font-inter">{aluno.name} ({aluno.email})</p>
                <p className="text-gray-700 font-inter">
                  Cursos: {alunoMatriculas.map((m) => cursos.find((c) => c.id === m.curso_id)?.title).join(", ") || "Nenhum"}
                </p>
                <div className="mt-2">
                  <select
                    onChange={(e) => handleMatricular(aluno.id, e.target.value)}
                    className="p-2 border rounded mr-2"
                  >
                    <option value="">Matricular em...</option>
                    {cursos.map((curso) => (
                      <option key={curso.id} value={curso.id}>
                        {curso.title}
                      </option>
                    ))}
                  </select>
                  {alunoMatriculas.map((matricula) => (
                    <button
                      key={matricula.id}
                      onClick={() => handleDesmatricular(matricula.id)}
                      className="px-4 py-2 bg-red-500 text-white rounded mr-2"
                    >
                      Desmatricular de {cursos.find((c) => c.id === matricula.curso_id)?.title}
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default AlunoManager;
