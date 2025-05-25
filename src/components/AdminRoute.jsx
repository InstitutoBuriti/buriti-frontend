import { Navigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

function AdminRoute({ children }) {
  const { user } = useAuth();

  // Se ainda não sabemos o usuário (ex: carregando), mostra um carregamento
  if (user === null) {
    return <div className="text-center text-gray-700 font-montserrat">Carregando...</div>;
  }

  // Se não for admin, redireciona para login de admin
  if (!user || user.role !== "admin") {
    return <Navigate to="/admin/login" replace />;
  }

  // Se for admin, renderiza normalmente
  return children;
}

export default AdminRoute;
