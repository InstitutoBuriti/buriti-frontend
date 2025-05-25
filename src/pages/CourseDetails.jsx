import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import courses from '@/data/courses';
import Footer from '../components/Footer';

const CourseDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [course, setCourse] = useState(null);

  useEffect(() => {
    const foundCourse = courses.find(c => c.id === id);
    if (foundCourse) {
      setCourse(foundCourse);
    } else {
      navigate('/cursos');
    }
  }, [id, navigate]);

  if (!course) return <div>Carregando...</div>;

  return (
    <div className="bg-buriti-gray min-h-screen flex flex-col justify-between">
      <main className="max-w-4xl mx-auto p-4">
        <button onClick={() => navigate('/cursos')} className="text-blue-500 mb-4">← Voltar</button>
        <img src={course.image} alt={course.title} className="w-full h-64 object-cover rounded-lg mb-4" />
        <h1 className="text-3xl font-bold mb-2 font-montserrat text-buriti-red">{course.title}</h1>
        <p className="text-gray-600 mb-2 font-inter">{course.duration} • {course.price}</p>
        <p className="mb-4 font-inter text-gray-700">{course.description}</p>

        <h2 className="text-2xl font-semibold mb-2 font-montserrat">Módulos:</h2>
        <ul className="list-disc list-inside font-inter text-gray-800">
          {course.modules.map((mod, index) => (
            <li key={index}>{mod.title}</li>
          ))}
        </ul>

        <button className="mt-6 px-4 py-2 bg-buriti-red text-white rounded hover:bg-buriti-orange transition-colors font-montserrat">
          Matricular-se
        </button>
      </main>

      <Footer />
    </div>
  );
};

export default CourseDetails;

