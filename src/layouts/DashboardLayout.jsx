import { Link, useNavigate, Outlet } from "react-router-dom";
import Logo from "../assets/Logo.png";
import { useAuth } from "../contexts/AuthContext";

function DashboardLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen flex bg-buriti-gray">
      <aside className="w-64 bg-buriti-dark-red text-white flex flex-col py-6 px-4 space-y-3 shadow-lg">
        <div className="flex items-center space-x-2 mb-6">
          <img src={Logo} alt="Instituto Buriti" className="h-10" />
          <span className="text-lg font-montserrat font-bold">Buriti</span>
        </div>
        <nav className="flex flex-col text-sm font-inter space-y-4">
          <Link to="/dashboard" className="hover:text-buriti-orange transition">Início</Link>
          <Link to="/dashboard/modulos" className="hover:text-buriti-orange transition">Módulos</Link>
          <Link to="/dashboard/tarefas" className="hover:text-buriti-orange transition">Tarefas</Link>
          <Link to="/dashboard/testes" className="hover:text-buriti-orange transition">Testes</Link>
          <Link to="/dashboard/foruns" className="hover:text-buriti-orange transition">Fóruns</Link>
          <Link to="/dashboard/notas" className="hover:text-buriti-orange transition">Notas</Link>
          <Link to="/dashboard/pessoas" className="hover:text-buriti-orange transition">Pessoas</Link>
          <Link to="/dashboard/certificados" className="hover:text-buriti-orange transition">Certificados</Link>
          <Link to="/dashboard/perfil" className="hover:text-buriti-orange transition">Perfil</Link>
          <hr className="border-gray-700" />
          <Link to="/" className="hover:text-buriti-orange transition">Home</Link>
          {user && (
            <button onClick={handleLogout} className="text-left hover:text-buriti-orange transition">
              Sair
            </button>
          )}
        </nav>
      </aside>

      <main className="flex-1 p-6 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
}

export default DashboardLayout;

