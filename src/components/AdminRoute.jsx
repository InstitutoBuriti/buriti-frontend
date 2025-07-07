import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function AdminRoute({ children }) {
  const { user, carregando } = useAuth();

  if (carregando) {
    return <div className="text-center text-gray-700 font-montserrat">Carregando...</div>;
  }

  if (!user || user.role !== "admin") {
    return <Navigate to="/entrar" replace />;
  }

  return children;
}

export default AdminRoute;
