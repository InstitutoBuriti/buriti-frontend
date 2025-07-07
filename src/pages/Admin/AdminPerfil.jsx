import { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

// Definir a constante API_URL usando a variável de ambiente
const API_URL = import.meta.env.VITE_API_URL;

export default function AdminPerfil() {
  const { user, token, logout } = useAuth();
  const [nome, setNome] = useState(user?.nome || '');
  const [senhaAtual, setSenhaAtual] = useState('');
  const [novaSenha, setNovaSenha] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nome && !novaSenha) {
      return toast.error('Informe um novo nome ou senha.');
    }
    setLoading(true);
    try {
      const payload = { nome };
      if (novaSenha) {
        payload.senhaAtual = senhaAtual;
        payload.novaSenha = novaSenha;
      }
      const res = await fetch(`${API_URL}/api/users/${user.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Erro ao atualizar');
      toast.success('Perfil atualizado com sucesso!');
      // Se o admin mudou a própria senha ou nome, é recomendável forçar logout:
      if (novaSenha) {
        toast.info('Faça login novamente com a nova senha.');
        logout();
      }
    } catch (err) {
      toast.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto bg-white p-6 rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Meu Perfil (Admin)</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block mb-1 font-medium">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Seu nome completo"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Senha Atual</label>
          <input
            type="password"
            value={senhaAtual}
            onChange={(e) => setSenhaAtual(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Somente se for trocar"
          />
        </div>
        <div>
          <label className="block mb-1 font-medium">Nova Senha</label>
          <input
            type="password"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            placeholder="Sua nova senha"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-2 rounded text-white ${loading ? 'bg-gray-400' : 'bg-buriti-red hover:bg-red-700'}`}
        >
          {loading ? 'Atualizando...' : 'Atualizar Perfil'}
        </button>
      </form>
    </div>
  );
}
