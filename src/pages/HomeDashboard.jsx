import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import courses from '@/data/courses';
import { FaTasks, FaBook, FaTrophy } from 'react-icons/fa';
import { useAuth } from '../contexts/AuthContext';

function gerarIdCurso(titulo) {
  return titulo
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '-');
}

function Dashboard() {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [progresso, setProgresso] = useState({});
  const [error, setError] = useState(null);

  useEffect(() => {
    const savedProgress = localStorage.getItem('progressoCursos');
    if (savedProgress) {
      setProgresso(JSON.parse(savedProgress));
    }
  }, []);

  let cursosMatriculados = [];
  try {
    if (!Array.isArray(courses)) {
      throw new Error('Dados de cursos não estão no formato correto.');
    }
    cursosMatriculados = user && user.role === 'aluno'
      ? courses.filter((curso) => {
          const matriculas = ['educacao-especial-e-inclusao', 'corte-costura-basico'];
          return matriculas.includes(curso.id);
        })
      : [];
  } catch (err) {
    setError('Erro ao carregar os cursos. Verifique os dados mockados.');
  }

  const calcularProgresso = (cursoId) => {
    const curso = courses.find((c) => c.id === cursoId);
    if (!curso || !curso.modules) return 0;

    const alunoProgresso = progresso[user?.id] || {};
    const cursoProgresso = alunoProgresso[cursoId] || {};
    const totalModulos = curso.modules.length;
    const modulosConcluidos = curso.modules.filter((mod) => cursoProgresso[mod.id]?.concluido && (mod.quiz ? cursoProgresso[mod.id]?.quizCorreto : true)).length;
    return Math.round((modulosConcluidos / totalModulos) * 100);
  };

  if (!user) {
    return <div className="text-center text-gray-700 font-montserrat">Carregando...</div>;
  }

  const tarefasPendentesMock = [
    { curso: "Educação Inclusiva", descricao: "Atividade 1 - Leitura crítica", prazo: "05/05/2025" },
    { curso: "Metodologias Ativas", descricao: "Questionário 2", prazo: "08/05/2025" }
  ].filter(t => cursosMatriculados.some(c => c.title === t.curso));

  const feedbackRecenteMock = [
    { tarefa: "Quiz 1 - Educação Inclusiva", nota: "8/10", sugestao: "Revise o módulo 2 para melhorar." },
    { tarefa: "Resumo Reflexivo - Metodologias Ativas", nota: "10/10", sugestao: "Excelente trabalho!" }
  ].filter(f => cursosMatriculados.some(c => f.tarefa.includes(c.title)));

  const conquistasMock = [
    { nome: "Leitor Ávido", descricao: "Completou 5 leituras no curso Educação Inclusiva!" },
    { nome: "Participante Ativo", descricao: "Respondeu a 10 tópicos no fórum." }
  ].filter(c => cursosMatriculados.some(curso => c.descricao.includes(curso.title)));

  return (
    <div className="p-6">
      <h1 className="text-buriti-red font-montserrat font-bold text-4xl text-center mb-8">
        Dashboard do Aluno
      </h1>

      <section className="mb-10">
        <h2 className="text-buriti-red font-merriweather font-bold text-xl mb-4">Progresso nos Cursos</h2>
        {error && <p className="text-red-500 font-montserrat mb-4">{error}</p>}

        {cursosMatriculados.length === 0 ? (
          <p className="text-gray-700 font-inter">Você ainda não está matriculado em nenhum curso.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cursosMatriculados.map((curso) => {
              const progressoCurso = calcularProgresso(curso.id);
              const status = progressoCurso === 100 ? 'Concluído' : 'Em andamento';
              return (
                <div key={curso.id} className="bg-white rounded-lg border shadow-md p-4">
                  <h3 className="font-merriweather font-bold text-buriti-red text-lg mb-1">
                    {curso.title}
                  </h3>
                  <div className="h-2 bg-gray-200 rounded-full overflow-hidden mb-2">
                    <div
                      className="h-full bg-buriti-orange transition-all duration-300"
                      style={{ width: `${progressoCurso}%` }}
                    ></div>
                  </div>
                  <p className="text-sm text-gray-700 font-inter">
                    Progresso: {progressoCurso}% • {status}
                  </p>
                  <p className="text-sm text-gray-700 font-inter mb-2">
                    Tarefas Pendentes: {curso.tasksPending || 0}
                  </p>
                  <button
                    onClick={() => navigate(`/assistir/${gerarIdCurso(curso.title)}`)}
                    className="bg-buriti-orange text-white font-inter font-medium text-sm px-4 py-2 rounded hover:bg-buriti-cyan transition-colors"
                  >
                    Continuar Curso
                  </button>
                </div>
              );
            })}
          </div>
        )}
      </section>

      <section className="mb-10">
        <h2 className="flex items-center gap-2 text-buriti-red font-merriweather font-bold text-xl mb-4">
          <FaTasks /> Tarefas Pendentes
        </h2>
        <div className="bg-white border rounded-lg shadow-md p-4">
          <ul className="list-disc list-inside space-y-2">
            {tarefasPendentesMock.map((tarefa, index) => (
              <li key={index} className="text-gray-700 font-inter text-sm">
                {tarefa.descricao} em <strong>{tarefa.curso}</strong> (Prazo: {tarefa.prazo})
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="flex items-center gap-2 text-buriti-red font-merriweather font-bold text-xl mb-4">
          <FaBook /> Feedback Recente
        </h2>
        <div className="bg-white border rounded-lg shadow-md p-4">
          <ul className="list-disc list-inside space-y-2">
            {feedbackRecenteMock.map((feedback, index) => (
              <li key={index} className="text-gray-700 font-inter text-sm">
                {feedback.tarefa}: <strong>{feedback.nota}</strong> — {feedback.sugestao}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="mb-10">
        <h2 className="flex items-center gap-2 text-buriti-red font-merriweather font-bold text-xl mb-4">
          <FaTrophy /> Suas Conquistas
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {conquistasMock.map((item, index) => (
            <div key={index} className="bg-buriti-cyan text-white rounded-lg p-4 shadow-md">
              <div className="font-inter font-medium text-sm mb-1">🏆 {item.nome}</div>
              <p className="font-inter font-normal text-xs">{item.descricao}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Dashboard;
