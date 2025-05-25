import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

export default function NavAdmin() {
  const { logout } = useAuth();
  const navigate = useNavigate();

  return (
    <nav className="flex flex-col h-full p-6 text-white">
      <h1 className="text-2xl font-bold mb-8">Painel Admin</h1>
      <div className="flex-1">
        <p className="uppercase text-xs mb-2">Administração</p>
        <NavLink to="/admin" className="block py-1 hover:text-buriti-orange">Visão Geral</NavLink>

        <p className="uppercase text-xs mt-4 mb-2">Cursos</p>
        <NavLink to="/admin/cursos" className="block py-1 hover:text-buriti-orange">Gerenciar Cursos</NavLink>
        <NavLink to="/admin/convides" className="block py-1 hover:text-buriti-orange">Gerenciar Convites</NavLink>

        <p className="uppercase text-xs mt-4 mb-2">Alunos</p>
        <NavLink to="/admin/alunos" className="block py-1 hover:text-buriti-orange">Gerenciar Alunos</NavLink>
        <NavLink to="/admin/certificados" className="block py-1 hover:text-buriti-orange">Certificados</NavLink>

        <p className="uppercase text-xs mt-4 mb-2">Avaliação</p>
        <NavLink to="/admin/tarefas" className="block py-1 hover:text-buriti-orange">Tarefas</NavLink>
        <NavLink to="/admin/testes" className="block py-1 hover:text-buriti-orange">Testes</NavLink>

        <p className="uppercase text-xs mt-4 mb-2">Conteúdo</p>
        <NavLink to="/admin/noticias" className="block py-1 hover:text-buriti-orange">Notícias & Artigos</NavLink>

        <p className="uppercase text-xs mt-4 mb-2">Configurações</p>
        <NavLink to="/admin/perfil" className="block py-1 hover:text-buriti-orange">Meu Perfil</NavLink>  {/* <- link adicionado */}
      </div>

      <button
        onClick={() => { logout(); navigate('/entrar'); }}
        className="mt-auto text-left hover:text-buriti-orange"
      >
        Sair
      </button>
    </nav>
);
}

