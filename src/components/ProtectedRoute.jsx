import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

function ProtectedRoute({ children, role }) {
  const { user, token, carregando } = useAuth();

  if (carregando) {
    return <div className="text-center text-gray-700 font-montserrat">Carregando...</div>;
  }

  if (!token || !user) {
    return <Navigate to="/entrar" replace />;
  }

  if (role && user.role !== role) {
    return <Navigate to="/entrar" replace />;
  }

  return children;
}

export default ProtectedRoute;
