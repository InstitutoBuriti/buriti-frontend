import { Link, Outlet } from 'react-router-dom';
import NavAdmin from '../components/NavAdmin';

function AdminLayout() {
  return (
    <div className="flex h-screen overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 shrink-0 bg-buriti-red text-white flex flex-col">
        <div className="p-4">
          <h2 className="text-xl font-bold">Painel Admin</h2>
        </div>
        <nav className="flex-1 px-4 space-y-2">
          <NavAdmin />
          {/* Link para o perfil do admin */}
          <Link
            to="/admin/perfil"
            className="block py-2 px-3 rounded hover:bg-buriti-orange transition"
          >
            Meu Perfil
          </Link>
        </nav>
      </aside>

      {/* Conteúdo principal */}
      <main className="flex-1 overflow-y-auto bg-gray-50 p-6">
        <Outlet />
      </main>
    </div>
  );
}

export default AdminLayout;

