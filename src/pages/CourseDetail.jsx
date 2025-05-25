import { useParams, useNavigate } from "react-router-dom";
import { useCourse } from "../contexts/CourseContext";

function CourseDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { inscrever } = useCourse();

  const cursos = {
    "educacao-especial-e-inclusao": {
      title: "Educação Especial e Inclusão",
      duration: "40h",
      price: "200,00",
      modality: "Tradicional",
      description:
        "Curso completo sobre práticas inclusivas nas escolas públicas e privadas, com base na legislação vigente.",
    },
    "formacao-em-pbl": {
      title: "Formação em PBL",
      duration: "30h",
      price: "180,00",
      modality: "PBL",
      description:
        "Capacitação em Aprendizagem Baseada em Problemas para aplicação em ambientes virtuais e presenciais.",
    },
    "gestao-escolar-para-a-inclusao": {
      title: "Gestão Escolar para a Inclusão",
      duration: "60h",
      price: "250,00",
      modality: "Tradicional",
      description:
        "Curso voltado a gestores escolares para implementação de políticas públicas inclusivas.",
    },
    "neurodiversidade-na-escola": {
      title: "Neurodiversidade na Escola",
      duration: "20h",
      price: "150,00",
      modality: "PBL",
      description:
        "Compreensão das diferentes formas de aprendizagem de estudantes neurodivergentes e como apoiá-los.",
    },
  };

  const curso = cursos[id];

  const handleMatricula = () => {
    if (curso) {
      inscrever({ id, ...curso });
      navigate("/dashboard");
    }
  };

  if (!curso) {
    return (
      <main className="px-6 py-16 text-center">
        <h1 className="text-3xl font-bold text-red-600">Curso não encontrado.</h1>
      </main>
    );
  }

  return (
    <main className="px-6 py-16 max-w-3xl mx-auto">
      <h1 className="text-4xl font-bold text-gray-800 mb-4">{curso.title}</h1>
      <p className="text-gray-700 text-lg mb-6">{curso.description}</p>
      <ul className="mb-6">
        <li><strong>Duração:</strong> {curso.duration}</li>
        <li><strong>Modalidade:</strong> {curso.modality}</li>
        <li><strong>Preço:</strong> R$ {curso.price}</li>
      </ul>
      <button
        onClick={handleMatricula}
        className="bg-green-600 text-white px-6 py-3 rounded hover:bg-green-700 transition"
      >
        Inscrever-se
      </button>
    </main>
  );
}

export default CourseDetail;

