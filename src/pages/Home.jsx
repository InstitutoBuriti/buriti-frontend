// src/pages/Home.jsx
import React, { useState, lazy, Suspense } from 'react';
import { Link } from 'react-router-dom';
import CourseCard from '../components/CourseCard';
import courses from '@/data/courses';
import articles from '../data/articles';

// dinamicamente carregados
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

// animações Lottie corretas
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

  // usa as animações importadas
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
        <h2 className="text-buriti-red font-montserrat font-bold text-4xl text-center mb-10">
          Cursos em Destaque
        </h2>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {courses.slice(0, 3).map(curso => (
            <CourseCard key={curso.id} {...curso} />
          ))}
        </div>
      </section>

      <section className="bg-buriti-orange py-16 px-4">
        <h2 className="text-white font-montserrat font-bold text-4xl text-center mb-12">
          Sua experiência em primeiro lugar
        </h2>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {benefits.map((b, i) => (
            <div
              key={b.title}
              className="relative flex flex-col items-center text-center opacity-0 animate-fadeIn"
              style={{ animationDelay: `${i * 0.2}s` }}
            >
              <button
                onClick={() => setTooltip(tooltip === b.title ? null : b.title)}
                className="focus:outline-none focus:ring-2 focus:ring-white rounded-full"
                aria-label={`Mais informações sobre ${b.title}`}
              >
                <Suspense fallback={<div>...</div>}>
                  <Player
                    autoplay
                    loop
                    src={b.animation}
                    style={{ width: '140px', height: '140px' }}
                    className="rounded-full border border-buriti-brown"
                  />
                </Suspense>
              </button>
              {tooltip === b.title && (
                <div className="absolute top-[-90px] bg-white text-gray-700 font-inter text-sm p-2 rounded-md shadow-md w-60 z-10">
                  {b.tooltip}
                </div>
              )}
              <p className="text-white font-inter text-base mt-4">{b.title}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="py-16 bg-white px-4">
        <h2 className="text-buriti-red font-montserrat font-bold text-4xl text-center mb-10">
          Notícias & Artigos Científicos
        </h2>
        <div className="flex justify-center mb-8">
          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="font-inter text-sm text-gray-700 bg-white border rounded-lg py-2 px-4 focus:ring-2 focus:ring-buriti-orange"
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
        <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredArticles.map(article => (
            <div
              key={article.id}
              className="flex flex-col md:flex-row border rounded-lg overflow-hidden shadow-lg"
            >
              <img
                src={
                  article.image?.startsWith('/images')
                    ? article.image
                    : `https://via.placeholder.com/300x200.png?text=Artigo+${article.id}`
                }
                alt={`Imagem do artigo ${article.title}`}
                className="w-full md:w-1/3 h-48 object-cover"
                loading="lazy"
              />
              <div className="p-4 flex flex-col justify-between md:w-2/3">
                <span className="font-inter text-xs text-buriti-orange uppercase">
                  {article.category}
                </span>
                <h3 className="font-merriweather text-lg text-buriti-red mt-2">
                  {article.title}
                </h3>
                <p className="font-inter text-sm text-gray-700 mt-2">
                  {article.summary}
                </p>
                <button className="mt-4 font-inter text-sm bg-buriti-orange text-white py-2 px-4 rounded hover:bg-buriti-dark-red">
                  Ler Mais
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <Suspense fallback={<div>Carregando rodapé...</div>}>
        <Footer />
      </Suspense>
    </div>
  );
}

export default Home;

