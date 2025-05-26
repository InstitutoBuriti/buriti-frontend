import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

function Notas() {
  const { user } = useAuth();
  const [notas, setNotas] = useState([]);
  const [matriculas, setMatriculas] = useState([]);

  useEffect(() => {
    fetch("http://localhost:4000/api/enrollments", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMatriculas(data))
      .catch((err) => console.error("Erro ao carregar matrículas:", err));
  }, [user.id]);

  useEffect(() => {
    fetch("http://localhost:4000/api/notes", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        const notasFiltradas = data.filter((nota) =>
          matriculas.some(
            (matricula) =>
              matricula.curso_id === nota.curso_id && matricula.status === "ativo"
          )
        );
        setNotas(notasFiltradas);
      })
      .catch((err) => console.error("Erro ao carregar notas:", err));
  }, [matriculas]);

  return (
    <div>
      <h1 className="text-3xl text-center font-montserrat font-bold text-buriti-red mb-6">
        Minhas Notas
      </h1>
      {notas.length === 0 ? (
        <p className="text-center text-gray-600 font-inter">
          Não há notas registradas.
        </p>
      ) : (
        <div className="space-y-4">
          {notas.map((nota) => {
            const curso = {
              id: nota.curso_id,
              title: "Curso Placeholder", // Substituir por chamada ao backend se necessário
            };
            return (
              <div
                key={nota.id}
                className="border rounded-lg p-4 shadow-md bg-white"
              >
                <h3 className="text-lg font-semibold font-montserrat text-gray-800">
                  {curso.title}
                </h3>
                <p className="text-gray-700 font-inter">Nota: {nota.nota}</p>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default Notas;
