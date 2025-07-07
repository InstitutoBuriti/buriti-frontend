import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './contexts/AuthContext';

// Definir a constante API_URL usando a variável de ambiente
const API_URL = import.meta.env.VITE_API_URL;

function Navbar() {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const debounceTimeout = useRef(null);
  const containerRef = useRef(null);
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  // Fetch com debounce sempre que o query mudar
  useEffect(() => {
    if (query.trim() === '') {
      setSuggestions([]);
      return;
    }
    clearTimeout(debounceTimeout.current);
    debounceTimeout.current = setTimeout(async () => {
      try {
        const res = await fetch(
          `${API_URL}/api/cursos?search=${encodeURIComponent(query)}`
        );
        const data = await res.json();
        setSuggestions(data);
        setIsOpen(true);
      } catch (err) {
        console.error('Erro na busca:', err);
      }
    }, 300);
    return () => clearTimeout(debounceTimeout.current);
  }, [query]);

  // Fecha o dropdown ao clicar fora
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSelect = (cursoId) => {
    navigate(`/cursos/${cursoId}`);
    setQuery('');
    setIsOpen(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/entrar');
  };

  return (
    <nav className="bg-buriti-red text-white py-4">
      <div
        className="max-w-6xl mx-auto px-4 flex items-center justify-between relative"
        ref={containerRef}
      >
        <Link to="/" className="text-xl font-montserrat font-bold">
          Instituto Buriti
        </Link>

        {/* Campo de busca */}
        <div className="flex-1 mx-4">
          <input
            type="text"
            value={query}
            onChange={handleChange}
            onFocus={() => suggestions.length && setIsOpen(true)}
            placeholder="Buscar cursos..."
            className="w-full px-3 py-2 rounded text-black"
          />
          {isOpen && suggestions.length > 0 && (
            <ul className="absolute bg-white text-black w-full mt-1 max-h-60 overflow-auto rounded shadow-lg z-10">
              {suggestions.map((curso) => (
                <li
                  key={curso.id}
                  className="px-3 py-2 hover:bg-gray-200 cursor-pointer"
                >
                  <Link
                    to={`/cursos/${curso.id}`}
                    onClick={() => handleSelect(curso.id)}
                    className="block"
                  >
                    {curso.title}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Links estáticos e dinâmicos */}
        <div className="flex space-x-4 font-montserrat">
          <Link to="/cursos" className="hover:text-buriti-orange">
            Cursos
          </Link>
          <Link to="/sobre" className="hover:text-buriti-orange">
            Sobre
          </Link>
          <Link to="/contato" className="hover:text-buriti-orange">
            Contato
          </Link>
          {user ? (
            <button onClick={handleLogout} className="hover:text-buriti-orange">
              Sair
            </button>
          ) : (
            <Link to="/entrar" className="hover:text-buriti-orange">
              Entrar
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
