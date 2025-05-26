import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

function Pessoas() {
  const { user } = useAuth();
  const [pessoas, setPessoas] = useState([]);
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
    fetch("http://localhost:4000/api/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setPessoas(data))
      .catch((err) => console.error("Erro ao carregar pessoas:", err));
  }, [matriculas]);

  return (
    <div>
      <h1 className="text-3xl text-center font-montserrat font-bold text-buriti-red mb-6">
        Pessoas
      </h1>
      {pessoas.length === 0 ? (
        <p className="text-center text-gray-600 font-inter">
          Não há pessoas para exibir.
        </p>
      ) : (
        <div className="space-y-4">
          {pessoas.map((pessoa) => (
            <div
              key={pessoa.id}
              className="border rounded-lg p-4 shadow-md bg-white"
            >
              <h3 className="text-lg font-semibold font-montserrat text-gray-800">
                {pessoa.name}
              </h3>
              <p className="text-gray-700 font-inter">
                Cursos em comum: {pessoa.cursos.join(", ")}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Pessoas;
