const courses = [
  {
    id: "educacao-especial-e-inclusao",
    title: "Educação Especial e Inclusão",
    description: "Curso sobre práticas inclusivas na educação.",
    duration: 20,
    price: "R$ 150,00",
    category: "Educação",
    modality: "EAD",
    status: "publicado",
    image: "/images/educacao-inclusiva.jpg",
    modules: [
      {
        id: "modulo-1",
        title: "Introdução à Educação Inclusiva",
        lessons: [
          {
            id: "aula-1-1",
            title: "O que é Educação Inclusiva?",
            videoUrl: "https://example.com/video1",
            materialUrl: "/materials/aula-1-1.pdf",
          },
          {
            id: "aula-1-2",
            title: "História da Inclusão",
            videoUrl: "https://example.com/video2",
            materialUrl: "/materials/aula-1-2.pdf",
          },
        ],
      },
      {
        id: "modulo-2",
        title: "Barreiras e Acessibilidade",
        lessons: [
          {
            id: "aula-2-1",
            title: "Tipos de Barreiras",
            videoUrl: "https://example.com/video3",
            materialUrl: "/materials/aula-2-1.pdf",
          },
          {
            id: "aula-2-2",
            title: "Soluções de Acessibilidade",
            videoUrl: "https://example.com/video4",
            materialUrl: "/materials/aula-2-2.pdf",
          },
        ],
      },
    ],
  },
  {
    id: "corte-costura-basico",
    title: "Corte e Costura Básico",
    description: "Curso introdutório de corte e costura.",
    duration: 15,
    price: "R$ 120,00",
    category: "Capacitação",
    modality: "Presencial",
    status: "publicado",
    image: "/images/corte-costura.jpg",
    modules: [
      {
        id: "modulo-1",
        title: "Introdução ao Corte",
        lessons: [
          {
            id: "aula-1-1",
            title: "Ferramentas de Corte",
            videoUrl: "https://example.com/video5",
            materialUrl: "/materials/aula-1-1.pdf",
          },
          {
            id: "aula-1-2",
            title: "Técnicas Básicas",
            videoUrl: "https://example.com/video6",
            materialUrl: "/materials/aula-1-2.pdf",
          },
        ],
      },
      {
        id: "modulo-2",
        title: "Técnicas Básicas de Costura",
        lessons: [
          {
            id: "aula-2-1",
            title: "Costura à Mão",
            videoUrl: "https://example.com/video7",
            materialUrl: "/materials/aula-2-1.pdf",
          },
          {
            id: "aula-2-2",
            title: "Costura à Máquina",
            videoUrl: "https://example.com/video8",
            materialUrl: "/materials/aula-2-2.pdf",
          },
        ],
      },
    ],
  },
];

export default courses;

