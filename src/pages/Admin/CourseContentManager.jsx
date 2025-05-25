import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";

function CourseContentManager() {
  const { id } = useParams();
  const { user } = useAuth();
  const [curso, setCurso] = useState(null);
  const [modulos, setModulos] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/cursos/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setCurso(data))
      .catch((err) => console.error("Erro ao carregar curso:", err));
  }, [id]);

  useEffect(() => {
    fetch(`http://localhost:4000/api/cursos/${id}/conteudo`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setModulos(data))
      .catch((err) => console.error("Erro ao carregar conteúdo:", err));
  }, [id]);

  if (user.role !== "admin" || !curso) {
    return <p className="text-center text-gray-600 font-inter">Acesso negado ou curso não encontrado.</p>;
  }

  return (
    <div>
      <h1 className="text-3xl text-center font-montserrat font-bold text-buriti-red mb-6">
        Gerenciar Conteúdo - {curso.title}
      </h1>
      <div className="space-y-4">
        {modulos.map((modulo) => (
          <div key={modulo.id} className="border rounded-lg p-4 shadow-md bg-white">
            <h3 className="text-lg font-semibold font-montserrat text-gray-800">
              {modulo.titulo}
            </h3>
            <p className="text-gray-700 font-inter">Vídeos, Aulas ao Vivo, Quizzes, Fóruns e Uploads disponíveis aqui.</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CourseContentManager;
