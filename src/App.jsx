import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import Navbar from './Navbar';
import Home from './pages/Home';
import CourseList from './pages/CourseList';
import CourseDetails from './pages/CourseDetails';
import Auth from './pages/Auth';
import Sobre from './pages/Sobre';
import Contato from './pages/Contato';
import HomeDashboard from './pages/HomeDashboard.jsx';
import Perfil from './pages/Dashboard/Perfil.jsx';
import CoursePlayer from './pages/CoursePlayer';
import AdminLayout from './pages/AdminLayout';
import DashboardLayout from './layouts/DashboardLayout';
import DashboardModulos from './pages/Dashboard/Modulos';
import DashboardTarefas from './pages/Dashboard/Tarefas';
import DashboardTestes from './pages/Dashboard/Testes';
import DashboardForuns from './pages/Dashboard/Foruns';
import DashboardNotas from './pages/Dashboard/Notas';
import DashboardPessoas from './pages/Dashboard/Pessoas';
import DashboardCertificados from './pages/Dashboard/Certificados';
import DashboardAdmin from './pages/Admin/DashboardAdmin';
import CourseManager from './pages/Admin/CourseManager';
import NovoCurso from './pages/Admin/NovoCurso';
import CourseEditor from './pages/Admin/CourseEditor';
import CourseContentManager from './pages/Admin/CourseContentManager';
import AlunoManager from './pages/Admin/AlunoManager';
import NoticiaManager from './pages/Admin/NoticiaManager';
import AdminPerfil from './pages/Admin/AdminPerfil';
import ProtectedRoute from './components/ProtectedRoute';
import AdminRoute from './components/AdminRoute';
import Profile from './pages/Profile'; // Novo import para o componente Profile

function App() {
  return (
    <div className="bg-buriti-gray min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} />
      <Routes>
        <Route path="/" element={<><Navbar /><Home /></>} />
        <Route path="/cursos" element={<><Navbar /><CourseList /></>} />
        <Route path="/cursos/:id" element={<><Navbar /><CourseDetails /></>} />
        <Route path="/entrar" element={<><Navbar /><Auth /></>} />
        <Route path="/sobre" element={<><Navbar /><Sobre /></>} />
        <Route path="/contato" element={<><Navbar /><Contato /></>} />
        <Route path="/assistir/:id" element={
          <ProtectedRoute role="aluno">
            <Navbar />
            <CoursePlayer />
          </ProtectedRoute>
        }/>
        <Route path="/profile" element={<><Navbar /><Profile /></>} /> {/* Nova rota para Profile */}
        <Route path="/dashboard" element={
          <ProtectedRoute role="aluno">
            <DashboardLayout />
          </ProtectedRoute>
        }>
          <Route index element={<HomeDashboard />} />
          <Route path="modulos" element={<DashboardModulos />} />
          <Route path="tarefas" element={<DashboardTarefas />} />
          <Route path="testes" element={<DashboardTestes />} />
          <Route path="foruns" element={<DashboardForuns />} />
          <Route path="notas" element={<DashboardNotas />} />
          <Route path="pessoas" element={<DashboardPessoas />} />
          <Route path="certificados" element={<DashboardCertificados />} />
          <Route path="perfil" element={<Perfil />} /> {/* Perfil dentro do dashboard */}
        </Route>
        <Route path="/admin" element={
          <AdminRoute>
            <AdminLayout />
          </AdminRoute>
        }>
          <Route index element={<DashboardAdmin />} />
          <Route path="cursos" element={<CourseManager />} />
          <Route path="cursos/novo" element={<NovoCurso />} />
          <Route path="cursos/editar/:id" element={<CourseEditor />} />
          <Route path="cursos/conteudo/:id" element={<CourseContentManager />} />
          <Route path="alunos" element={<AlunoManager />} />
          <Route path="noticias" element={<NoticiaManager />} />
          <Route path="perfil" element={<AdminPerfil />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
