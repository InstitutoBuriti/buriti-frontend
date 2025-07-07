import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

// Definir a constante API_URL usando a variável de ambiente
const API_URL = import.meta.env.VITE_API_URL;

function CourseManager() {
  const { user } = useAuth();
  const [cursos, setCursos] = useState([]);

  useEffect(() => {
    fetch(`${API_URL}/api/cursos`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCursos(data))
      .catch((err) => console.error("Erro ao carregar cursos:", err));
  }, []);

  const excluirCurso = (id) => {
    fetch(`${API_URL}/api/cursos/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.status === 204) setCursos((prev) => prev.filter((c) => c.id !== id));
      })
      .catch((err) => console.error("Erro ao excluir curso:", err));
  };

  if (user.role !== "admin") {
    return <p className="text-center text-gray-600 font-inter">Acesso negado.</p>;
  }

  return (
    <div>
      <h1 className="text-3xl text-center font-montserrat font-bold text-buriti-red mb-6">
        Gerenciar Cursos
      </h1>
      <Link
        to="/admin/novo-curso"
        className="mb-4 px-4 py-2 bg-buriti-orange text-white rounded hover:bg-buriti-cyan transition"
      >
        Novo Curso
      </Link>
      {cursos.length === 0 ? (
        <p className="text-center text-gray-600 font-inter">
          Não há cursos cadastrados.
        </p>
      ) : (
        <div className="space-y-4">
          {cursos.map((curso) => (
            <div
              key={curso.id}
              className="border rounded-lg p-4 shadow-md bg-white flex justify-between items-center"
            >
              <div>
                <h3 className="text-lg font-semibold font-montserrat text-gray-800">
                  {curso.title}
                </h3>
                <p className="text-gray-700 font-inter">{curso.descricao}</p>
              </div>
              <div>
                <Link
                  to={`/admin/editar-curso/${curso.id}`}
                  className="px-4 py-2 bg-buriti-cyan text-white rounded mr-2"
                >
                  Editar
                </Link>
                <button
                  onClick={() => excluirCurso(curso.id)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Excluir
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default CourseManager;
