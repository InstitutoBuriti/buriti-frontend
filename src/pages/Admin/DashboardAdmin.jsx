import { useEffect, useState } from "react";
import { FaBook, FaUserGraduate, FaClipboardList, FaCertificate } from "react-icons/fa";

function DashboardAdmin() {
  const [dados, setDados] = useState({
    cursos: 3,
    alunos: 42,
    tarefas: 12,
    certificados: 27,
  });

  useEffect(() => {
    // Aqui poderia vir um fetch real no futuro
    setDados({
      cursos: 3,
      alunos: 42,
      tarefas: 12,
      certificados: 27,
    });
  }, []);

  const cards = [
    {
      label: "Cursos Ativos",
      value: dados.cursos,
      icon: <FaBook className="text-3xl text-buriti-orange" />,
    },
    {
      label: "Alunos Matriculados",
      value: dados.alunos,
      icon: <FaUserGraduate className="text-3xl text-buriti-orange" />,
    },
    {
      label: "Tarefas Abertas",
      value: dados.tarefas,
      icon: <FaClipboardList className="text-3xl text-buriti-orange" />,
    },
    {
      label: "Certificados Emitidos",
      value: dados.certificados,
      icon: <FaCertificate className="text-3xl text-buriti-orange" />,
    },
  ];

  return (
    <main className="px-6 py-10 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-8 font-montserrat">Painel Administrativo</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, index) => (
          <div key={index} className="bg-white p-6 rounded shadow flex items-center justify-between">
            <div>
              <h2 className="text-sm text-gray-500 font-semibold uppercase">{card.label}</h2>
              <p className="text-2xl font-bold text-gray-800">{card.value}</p>
            </div>
            {card.icon}
          </div>
        ))}
      </div>
    </main>
  );
}

export default DashboardAdmin;

