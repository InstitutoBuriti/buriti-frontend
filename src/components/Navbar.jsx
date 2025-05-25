import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import Logo from "../assets/Logo.png";

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/entrar");
  };

  return (
    <nav className="bg-buriti-red text-buriti-white py-4 shadow-md" role="navigation" aria-label="Menu principal">
      <div className="container mx-auto flex items-center justify-between px-4">
        {/* Logo */}
        <Link to="/" className="flex items-center" aria-label="Página inicial do Instituto Buriti">
          <img src={Logo} alt="Logotipo do Instituto Buriti" className="h-10" />
        </Link>

        {/* Campo de Busca */}
        <div className="hidden md:flex flex-1 justify-center">
          <input
            type="text"
            placeholder="Pesquisar cursos..."
            className="w-1/2 px-4 py-2 rounded-l-lg bg-buriti-white text-buriti-gray focus:outline-none focus:ring-2 focus:ring-buriti-orange"
            disabled
            aria-label="Campo de busca desabilitado"
          />
          <button
            className="bg-buriti-orange px-4 py-2 rounded-r-lg text-white hover:bg-buriti-dark-red transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-buriti-orange"
            disabled
            aria-disabled="true"
          >
            Buscar
          </button>
        </div>

        {/* Menu Desktop */}
        <div className="hidden md:flex items-center space-x-4">
          <Link to="/" aria-label="Ir para Início" className="hover:text-buriti-orange focus:outline-none focus:ring-2 focus:ring-white transition">
            Início
          </Link>
          <Link to="/cursos" aria-label="Ir para Cursos" className="hover:text-buriti-orange focus:outline-none focus:ring-2 focus:ring-white transition">
            Cursos
          </Link>
          <Link to="/sobre" aria-label="Ir para Sobre" className="hover:text-buriti-orange focus:outline-none focus:ring-2 focus:ring-white transition">
            Sobre
          </Link>
          <Link to="/contato" aria-label="Ir para Contato" className="hover:text-buriti-orange focus:outline-none focus:ring-2 focus:ring-white transition">
            Contato
          </Link>
          {user ? (
            <>
              <Link
                to={user.role === "admin" ? "/admin" : "/dashboard"}
                aria-label={user.role === "admin" ? "Painel do Administrador" : "Painel do Aluno"}
                className="hover:text-buriti-orange focus:outline-none focus:ring-2 focus:ring-white transition"
              >
                {user.role === "admin" ? "Admin" : "Dashboard"}
              </Link>
              <button
                onClick={handleLogout}
                className="bg-buriti-orange px-4 py-2 rounded-lg hover:bg-buriti-dark-red text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white"
                aria-label="Sair do sistema"
              >
                Sair
              </button>
            </>
          ) : (
            <Link
              to="/entrar"
              aria-label="Entrar na plataforma"
              className="bg-buriti-orange px-4 py-2 rounded-lg hover:bg-buriti-dark-red text-white transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-white"
            >
              Entrar
            </Link>
          )}
        </div>

        {/* Menu Mobile */}
        <div className="md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="text-white focus:outline-none focus:ring-2 focus:ring-buriti-orange"
            aria-label="Abrir menu mobile"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
            </svg>
          </button>
        </div>
      </div>

      {/* Dropdown Mobile */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-buriti-red py-4">
          <div className="flex flex-col items-center space-y-4">
            <Link to="/" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-buriti-orange focus:outline-none focus:ring-2 focus:ring-white">
              Início
            </Link>
            <Link to="/cursos" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-buriti-orange focus:outline-none focus:ring-2 focus:ring-white">
              Cursos
            </Link>
            <Link to="/sobre" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-buriti-orange focus:outline-none focus:ring-2 focus:ring-white">
              Sobre
            </Link>
            <Link to="/contato" onClick={() => setIsMobileMenuOpen(false)} className="hover:text-buriti-orange focus:outline-none focus:ring-2 focus:ring-white">
              Contato
            </Link>
            {user ? (
              <>
                <Link
                  to={user.role === "admin" ? "/admin" : "/dashboard"}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="hover:text-buriti-orange focus:outline-none focus:ring-2 focus:ring-white"
                >
                  {user.role === "admin" ? "Admin" : "Dashboard"}
                </Link>
                <button
                  onClick={() => {
                    handleLogout();
                    setIsMobileMenuOpen(false);
                  }}
                  className="bg-buriti-orange px-4 py-2 rounded-lg hover:bg-buriti-dark-red text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
                >
                  Sair
                </button>
              </>
            ) : (
              <Link
                to="/entrar"
                onClick={() => setIsMobileMenuOpen(false)}
                className="bg-buriti-orange px-4 py-2 rounded-lg hover:bg-buriti-dark-red text-white transition-colors focus:outline-none focus:ring-2 focus:ring-white"
              >
                Entrar
              </Link>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

