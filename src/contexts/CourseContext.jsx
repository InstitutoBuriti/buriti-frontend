// src/contexts/CourseContext.jsx
import { createContext, useContext, useState } from "react";

const CourseContext = createContext();

export function CourseProvider({ children }) {
  const [cursosMatriculados, setCursosMatriculados] = useState([
    {
      id: "educacao-especial-e-inclusao",
      title: "Educação Especial e Inclusão",
      duration: "40h",
      modulos: [
        {
          id: 1,
          title: "Introdução à Inclusão",
          video: "/videos/video1.mp4",
          assistido: false,
        },
        {
          id: 2,
          title: "Legislação e Políticas Públicas",
          video: "/videos/video2.mp4",
          assistido: false,
          quiz: {
            pergunta: "Qual lei garante a inclusão de alunos com deficiência nas escolas regulares?",
            opcoes: [
              "Lei Maria da Penha",
              "Estatuto da Criança e do Adolescente",
              "Lei Brasileira de Inclusão",
              "Código Civil",
            ],
            respostaCorreta: 2,
            respondido: false,
            correta: null,
          },
        },
      ],
    },
  ]);

  const marcarModuloComoAssistido = (cursoId, moduloId) => {
    setCursosMatriculados((prev) =>
      prev.map((curso) => {
        if (curso.id !== cursoId) return curso;
        const novosModulos = curso.modulos.map((m) =>
          m.id === moduloId ? { ...m, assistido: true } : m
        );
        return { ...curso, modulos: novosModulos };
      })
    );
  };

  const responderQuiz = (cursoId, moduloId, correta) => {
    setCursosMatriculados((prev) =>
      prev.map((curso) => {
        if (curso.id !== cursoId) return curso;
        const novosModulos = curso.modulos.map((m) => {
          if (m.id !== moduloId || !m.quiz) return m;
          return {
            ...m,
            quiz: {
              ...m.quiz,
              respondido: true,
              correta,
            },
          };
        });
        return { ...curso, modulos: novosModulos };
      })
    );
  };

  const calcularProgresso = (curso) => {
    const total = curso.modulos.length;
    let concluido = 0;

    curso.modulos.forEach((m) => {
      const quizOk = m.quiz ? m.quiz.respondido && m.quiz.correta : true;
      if (m.assistido && quizOk) concluido++;
    });

    return Math.floor((concluido / total) * 100);
  };

  const estaMatriculado = (id) => {
    return cursosMatriculados.some((curso) => curso.id === id);
  };

  const cursosComProgresso = cursosMatriculados.map((curso) => ({
    ...curso,
    progress: calcularProgresso(curso),
  }));

  return (
    <CourseContext.Provider
      value={{
        cursosMatriculados: cursosComProgresso,
        marcarModuloComoAssistido,
        responderQuiz,
        estaMatriculado,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  return useContext(CourseContext);
}

