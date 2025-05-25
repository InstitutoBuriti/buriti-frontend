// src/pages/dashboard/Tarefas.jsx
import { useEffect, useState } from "react";
import DashboardLayout from "../../layouts/DashboardLayout";

const mockTarefasPorAluno = {
  1: [
    {
      curso: "Educação Inclusiva",
      descricao: "Atividade 1 - Leitura crítica",
      prazo: "2025-05-05",
      entregue: false,
    },
    {
      curso: "Educação Inclusiva",
      descricao: "Quiz 1",
      prazo: "2025-05-06",
      entregue: true,
    },
    {
      curso: "Metodologias Ativas",
      descricao: "Questionário 2",
      prazo: "2025-05-08",
      entregue: false,
    },
  ],
  2: [
    {
      curso: "Gestão Escolar",
      descricao: "Estudo de caso 1",
      prazo: "2025-05-04",
      entregue: true,
    },
    {
      curso: "Educação Infantil",
      descricao: "Plano de aula",
      prazo: "2025-05-10",
      entregue: false,
    },
  ],
};

function Tarefas() {
  const [aluno, setAluno] = useState(null);
  const [tarefas, setTarefas] = useState([]);

  useEffect(() => {
    const alunoLogado = localStorage.getItem("alunoLogado");
    if (alunoLogado) {
      const dadosAluno = JSON.parse(alunoLogado);
      setAluno(dadosAluno);
      const listaTarefas = mockTarefasPorAluno[dadosAluno.id] || [];
      setTarefas(listaTarefas);
    }
  }, []);

  return (
    <DashboardLayout>
      <h1 className="text-3xl text-buriti-red font-bold font-montserrat text-center mb-8">
        Tarefas
      </h1>

      {tarefas.length === 0 ? (
        <p className="text-gray-700 font-inter text-center">
          Nenhuma tarefa atribuída no momento.
        </p>
      ) : (
        <div className="space-y-4">
          {tarefas.map((tarefa, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow border p-4 flex flex-col md:flex-row md:justify-between md:items-center"
            >
              <div>
                <p className="font-merriweather text-buriti-red text-lg">
                  {tarefa.descricao}
                </p>
                <p className="text-sm text-gray-700 font-inter">
                  Curso: <strong>{tarefa.curso}</strong>
                </p>
                <p className="text-sm text-gray-700 font-inter">
                  Prazo: <strong>{tarefa.prazo}</strong>
                </p>
              </div>
              <div>
                <span
                  className={`text-xs font-bold px-3 py-1 rounded-full ${
                    tarefa.entregue
                      ? "bg-green-100 text-green-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {tarefa.entregue ? "Entregue" : "Pendente"}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </DashboardLayout>
  );
}

export default Tarefas;

