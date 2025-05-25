import { useState } from 'react';
import { Link } from 'react-router-dom';
import courses from '@/data/courses';
import Footer from '../components/Footer';

function gerarIdCurso(titulo) {
  return titulo
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/\s+/g, '-');
}

function CourseList() {
  const [filtros, setFiltros] = useState({
    categoria: 'Todos',
    modalidade: 'Todos',
    ordem: 'nenhuma',
  });

  const categorias = ['Todos', ...new Set(courses.map((c) => c.category))];
  const modalidades = ['Todos', ...new Set(courses.map((c) => c.modality))];

  const cursosFiltrados = courses
    .filter((c) => c.status === 'publicado')
    .filter((c) => filtros.categoria === 'Todos' || c.category === filtros.categoria)
    .filter((c) => filtros.modalidade === 'Todos' || c.modality === filtros.modalidade)
    .sort((a, b) => {
      if (filtros.ordem === 'crescente') return a.duration - b.duration;
      if (filtros.ordem === 'decrescente') return b.duration - a.duration;
      return 0;
    });

  return (
    <div className="bg-buriti-gray min-h-screen flex flex-col justify-between">
      <main className="max-w-6xl mx-auto p-6">
        <h1 className="text-3xl font-montserrat font-bold text-buriti-red mb-8 text-center">
          Nossos Cursos
        </h1>

        {/* Filtros */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
          <select
            value={filtros.categoria}
            onChange={(e) => setFiltros({ ...filtros, categoria: e.target.value })}
            className="p-2 rounded border font-inter text-sm"
          >
            {categorias.map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          <select
            value={filtros.modalidade}
            onChange={(e) => setFiltros({ ...filtros, modalidade: e.target.value })}
            className="p-2 rounded border font-inter text-sm"
          >
            {modalidades.map((mod) => (
              <option key={mod} value={mod}>{mod}</option>
            ))}
          </select>

          <select
            value={filtros.ordem}
            onChange={(e) => setFiltros({ ...filtros, ordem: e.target.value })}
            className="p-2 rounded border font-inter text-sm"
          >
            <option value="nenhuma">Ordenar por duração</option>
            <option value="crescente">Menor duração</option>
            <option value="decrescente">Maior duração</option>
          </select>
        </div>

        {/* Lista de Cursos */}
        {cursosFiltrados.length === 0 ? (
          <p className="text-center text-gray-700 font-inter">Nenhum curso encontrado com os filtros selecionados.</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {cursosFiltrados.map((curso) => (
              <div key={curso.id} className="bg-white rounded-lg shadow p-4">
                <h2 className="text-xl font-montserrat font-bold text-buriti-red mb-2">
                  {curso.title}
                </h2>
                <p className="text-gray-700 font-inter mb-1">{curso.duration} horas</p>
                <p className="text-buriti-orange font-bold font-inter mb-2">{curso.price}</p>
                <Link
                  to={`/cursos/${gerarIdCurso(curso.title)}`}
                  className="bg-buriti-red text-white px-4 py-2 rounded-lg hover:bg-buriti-red-light transition-colors duration-200 font-montserrat"
                >
                  Ver Detalhes
                </Link>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

export default CourseList;

