import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import courses from '@/data/courses';
import jsPDF from 'jspdf';

function CoursePlayer() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aluno, setAluno] = useState(null);
  const [progresso, setProgresso] = useState({});
  const [curso, setCurso] = useState(null);

  function gerarIdCurso(titulo) {
    return titulo
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .toLowerCase()
      .replace(/\s+/g, '-');
  }

  const alunoTemAcessoAoCurso = (cursoId) => {
    if (!aluno) return false;
    const cursosPermitidos = ['educacao-especial-e-inclusao', 'corte-costura-basico'];
    return cursosPermitidos.includes(cursoId);
  };

  useEffect(() => {
    const alunoLogado = localStorage.getItem('alunoLogado');
    if (alunoLogado) {
      setAluno(JSON.parse(alunoLogado));
    }

    const savedProgress = localStorage.getItem('progressoCursos');
    if (savedProgress) {
      setProgresso(JSON.parse(savedProgress));
    }
  }, []);

  useEffect(() => {
    const cursoEncontrado = courses.find((c) => gerarIdCurso(c.title) === id);
    if (cursoEncontrado) {
      if (!alunoTemAcessoAoCurso(cursoEncontrado.id)) {
        alert("Você não tem acesso a este curso.");
        navigate("/dashboard");
        return;
      }
      setCurso(cursoEncontrado);
    }
  }, [id, aluno]);

  const marcarModuloComoAssistido = (moduloId) => {
    const novoProgresso = { ...progresso };
    if (!novoProgresso[aluno.id]) novoProgresso[aluno.id] = {};
    if (!novoProgresso[aluno.id][curso.id]) novoProgresso[aluno.id][curso.id] = {};
    novoProgresso[aluno.id][curso.id][moduloId] = {
      ...novoProgresso[aluno.id][curso.id][moduloId],
      concluido: true,
    };
    setProgresso(novoProgresso);
    localStorage.setItem('progressoCursos', JSON.stringify(novoProgresso));
  };

  const responderQuiz = (moduloId, acertou) => {
    const novoProgresso = { ...progresso };
    if (!novoProgresso[aluno.id]) novoProgresso[aluno.id] = {};
    if (!novoProgresso[aluno.id][curso.id]) novoProgresso[aluno.id][curso.id] = {};
    novoProgresso[aluno.id][curso.id][moduloId] = {
      ...novoProgresso[aluno.id][curso.id][moduloId],
      quizRespondido: true,
      quizCorreto: acertou,
    };
    setProgresso(novoProgresso);
    localStorage.setItem('progressoCursos', JSON.stringify(novoProgresso));
  };

  const moduloDesbloqueado = (index) => {
    if (index === 0) return true;
    const alunoProgresso = progresso[aluno?.id] || {};
    const cursoProgresso = alunoProgresso[curso?.id] || {};
    const anterior = curso.modules[index - 1];
    const quizValidado = anterior.quiz
      ? cursoProgresso[anterior.id]?.quizRespondido && cursoProgresso[anterior.id]?.quizCorreto
      : true;
    return cursoProgresso[anterior.id]?.concluido && quizValidado;
  };

  const cursoCompleto = () => {
    if (!curso || !aluno) return false;
    const alunoProgresso = progresso[aluno.id] || {};
    const cursoProgresso = alunoProgresso[curso.id] || {};
    return curso.modules.every((mod) => {
      const quizOk = mod.quiz
        ? cursoProgresso[mod.id]?.quizRespondido && cursoProgresso[mod.id]?.quizCorreto
        : true;
      return cursoProgresso[mod.id]?.concluido && quizOk;
    });
  };

  const gerarCertificado = () => {
    const doc = new jsPDF();
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(22);
    doc.text('Certificado de Conclusão', 105, 30, null, null, 'center');

    doc.setFontSize(14);
    doc.setFont('helvetica', 'normal');
    doc.text(`Certificamos que o(a) aluno(a) ${aluno.email} concluiu o curso:`, 20, 50);
    doc.setFont('helvetica', 'bold');
    doc.text(curso.title, 20, 60);

    doc.setFont('helvetica', 'normal');
    doc.text(`Carga horária: ${curso.duration}`, 20, 75);
    doc.text(`Data de conclusão: ${new Date().toLocaleDateString()}`, 20, 85);

    doc.setFontSize(12);
    doc.text('Instituto Buriti', 20, 120);
    doc.line(20, 122, 80, 122);

    doc.save(`certificado-${gerarIdCurso(curso.title)}.pdf`);
  };

  const downloadMaterial = (material) => {
    const link = document.createElement('a');
    link.href = material || 'data:text/plain;base64,SGVsbG8gU2FtcGxl'; // Simula um arquivo
    link.download = material || 'material_exemplo.pdf';
    link.click();
  };

  if (!aluno) {
    return <div>Carregando dados do aluno...</div>;
  }

  if (!curso) {
    return (
      <main className="px-6 py-16 text-center">
        <h1 className="text-2xl font-bold text-red-600">
          Curso não encontrado.
        </h1>
        <button
          onClick={() => navigate('/dashboard')}
          className="mt-4 text-blue-600"
        >
          ← Voltar ao Dashboard
        </button>
      </main>
    );
  }

  return (
    <main className="px-6 py-16 max-w-4xl mx-auto">
      <button
        onClick={() => navigate('/dashboard')}
        className="text-blue-600 mb-4"
      >
        ← Voltar ao Dashboard
      </button>

      <h1 className="text-3xl font-bold text-gray-800 mb-4">{curso.title}</h1>
      <p className="text-gray-600 mb-6">{curso.duration} • {curso.price}</p>

      {curso.modules.map((modulo, index) => {
        const desbloqueado = moduloDesbloqueado(index);
        const alunoProgresso = progresso[aluno.id] || {};
        const cursoProgresso = alunoProgresso[curso.id] || {};
        const moduloProgresso = cursoProgresso[modulo.id] || {};

        return (
          <div
            key={modulo.id}
            className={`mb-10 p-6 border rounded-xl shadow ${
              desbloqueado
                ? 'bg-white'
                : 'bg-gray-100 opacity-50 pointer-events-none'
            }`}
          >
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              {modulo.title}
            </h2>

            <iframe
              width="100%"
              height="400"
              src={modulo.video}
              title={modulo.title}
              frameBorder="0"
              allowFullScreen
              className="rounded-lg mb-4"
              onLoad={() => {
                if (!moduloProgresso.concluido) {
                  setTimeout(() => marcarModuloComoAssistido(modulo.id), 5000);
                }
              }}
            ></iframe>

            <p
              className={`text-sm font-medium mb-4 ${
                moduloProgresso.concluido ? 'text-green-600' : 'text-gray-500'
              }`}
            >
              {moduloProgresso.concluido ? 'Aula concluída ✅' : 'Assista para avançar'}
            </p>

            {modulo.material && (
              <button
                onClick={() => downloadMaterial(modulo.material)}
                className="bg-buriti-orange text-white px-4 py-2 rounded hover:bg-buriti-cyan mb-4"
              >
                Baixar Material
              </button>
            )}

            {modulo.quiz && moduloProgresso.concluido && !moduloProgresso.quizRespondido && (
              <div className="mt-4">
                <p className="font-medium text-gray-700 mb-2">
                  {modulo.quiz.pergunta}
                </p>
                <ul className="space-y-2">
                  {modulo.quiz.opcoes.map((opcao, i) => (
                    <li key={i}>
                      <button
                        onClick={() =>
                          responderQuiz(modulo.id, i === modulo.quiz.respostaCorreta)
                        }
                        className="w-full text-left bg-indigo-50 hover:bg-indigo-100 px-4 py-2 rounded"
                      >
                        {opcao}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {moduloProgresso.quizRespondido && (
              <p
                className={`text-sm mt-2 font-medium ${
                  moduloProgresso.quizCorreto ? 'text-green-600' : 'text-red-500'
                }`}
              >
                {moduloProgresso.quizCorreto
                  ? '✅ Quiz aprovado!'
                  : '❌ Você precisa acertar para desbloquear o próximo módulo.'}
              </p>
            )}
          </div>
        );
      })}

      {cursoCompleto() && (
        <div className="text-center mt-10">
          <button
            onClick={gerarCertificado}
            className="bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700"
          >
            Gerar Certificado 📄
          </button>
        </div>
      )}
    </main>
  );
}

export default CoursePlayer;
