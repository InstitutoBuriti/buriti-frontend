import React, { useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import courses from '@/data/courses';
import articles from '../data/articles';

// componentes carregados sob demanda
const Footer = lazy(() => import('../components/Footer'));
const Player = lazy(() =>
  import('@lottiefiles/react-lottie-player').then(mod => ({
    default: mod.Player
  }))
);
const ImageCarousel = lazy(() => import('../components/ImageCarousel'));

// imagens do carrossel
import imgCorte from '../assets/images/corte-costura-basico.jpg';
import imgInclusao from '../assets/images/educacao-especial-e-inclusao.jpg';
import imgTecEdu from '../assets/images/tecnologia-na-educacao.jpg';

// animações Lottie
import ForumAnimation from '../animations/forum.json';
import VideoaulaAnimation from '../animations/videoaula.json';
import QuizAnimation from '../animations/quiz.json';
import CertificadoAnimation from '../animations/certificado.json';

function Home() {
  const [tooltip, setTooltip] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  const slides = [
    { imageUrl: imgCorte, link: '/cursos/corte-costura-basico', alt: 'Curso de Corte e Costura Básico' },
    { imageUrl: imgInclusao, link: '/cursos/educacao-especial-e-inclusao', alt: 'Curso de Educação Especial e Inclusão Escolar' },
    { imageUrl: imgTecEdu, link: '/cursos/tecnologia-na-educacao', alt: 'Curso de Tecnologia na Educação' },
  ];

  const benefits = [
    { title: 'fóruns de discussão', animation: ForumAnimation, tooltip: 'Participe de debates e tire dúvidas com a comunidade.' },
    { title: 'vídeo aulas interativas', animation: VideoaulaAnimation, tooltip: 'Acesse aulas gravadas e ao vivo.' },
    { title: 'quizzes e avaliações', animation: QuizAnimation, tooltip: 'Teste seus conhecimentos e acompanhe seu progresso.' },
    { title: 'certificado automático', animation: CertificadoAnimation, tooltip: 'Receba seu certificado ao concluir o curso.' },
  ];

  const categories = ['Todos', ...new Set(articles.map(a => a.category))];
  const filteredArticles =
    selectedCategory === 'Todos'
      ? articles
      : articles.filter(a => a.category === selectedCategory);

  return (
    <div className="bg-buriti-gray min-h-screen flex flex-col justify-between">
      <Suspense fallback={<div>Carregando carrossel...</div>}>
        <ImageCarousel slides={slides} />
      </Suspense>

      <section className="py-12 px-4">
        <h2 data-testid="cursos-destaque" className="text-buriti-red font-montserrat font-bold text-4xl text-center mb-10">
          Cursos em Destaque
        </h2>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.slice(0, 3).map(curso => (
            <CourseCard key={curso.id} {...curso} />
          ))}
        </div>
      </section>

      {/* restante do seu Home.jsx segue igual */}
      …
    </div>
  );
}

export default Home;

