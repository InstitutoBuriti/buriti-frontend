import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';
import jsPDF from 'jspdf';

// Definir a constante API_URL usando a variável de ambiente
const API_URL = import.meta.env.VITE_API_URL;

function DashboardCertificados() {
  const { token } = useAuth();
  const [certificates, setCertificates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchCertificates() {
      try {
        // Buscar matrículas do usuário
        const enrollRes = await fetch(`${API_URL}/api/enrollments`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        if (!enrollRes.ok) throw new Error('Não foi possível buscar matrículas');
        const enrollments = await enrollRes.json();
        const courseIds = enrollments.map(e => e.curso_id);

        // Para cada curso, tentar gerar certificado
        const results = await Promise.all(
          courseIds.map(async courseId => {
            try {
              const res = await fetch(`${API_URL}/api/certificates/${courseId}`, {
                headers: { Authorization: `Bearer ${token}` }
              });
              if (!res.ok) {
                // Se não concluído, ignora
                return null;
              }
              const data = await res.json();
              return { courseId, text: data.certificate };
            } catch {
              return null;
            }
          })
        );

        // Filtra apenas certificados válidos
        setCertificates(results.filter(Boolean));
      } catch (err) {
        console.error(err);
        toast.error('Erro ao buscar certificados.');
      } finally {
        setLoading(false);
      }
    }

    fetchCertificates();
  }, [token]);

  const handleDownload = (text, courseId) => {
    const doc = new jsPDF();
    // Ajusta quebra de linha automática a cada 180 caracteres
    const lines = doc.splitTextToSize(text, 180);
    doc.text(lines, 10, 20);
    doc.save(`certificado-curso-${courseId}.pdf`);
  };

  if (loading) {
    return <div className="text-center text-gray-700">Carregando certificados...</div>;
  }

  if (certificates.length === 0) {
    return <div className="text-center text-gray-700">Você ainda não concluiu nenhum curso.</div>;
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-montserrat">Seus Certificados</h2>
      {certificates.map(cert => (
        <div key={cert.courseId} className="p-6 bg-white rounded shadow">
          <p className="mb-4">{cert.text}</p>
          <button
            onClick={() => handleDownload(cert.text, cert.courseId)}
            className="px-4 py-2 bg-buriti-red text-white rounded hover:bg-buriti-orange transition"
          >
            Baixar PDF
          </button>
        </div>
      ))}
    </div>
  );
}

export default DashboardCertificados;
