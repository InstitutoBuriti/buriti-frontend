import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

export default function Perfil() {
  const { user, token, updateProfile } = useAuth();
  const [name, setName] = useState(user?.nome || '');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [currentPassword, setCurrentPassword] = useState(''); // Novo estado
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) {
      setName(user.nome || '');
    }
  }, [user]);

  useEffect(() => {
    console.log('VITE_API_URL (mount):', import.meta.env.VITE_API_URL);
    console.log('Token (mount):', token);
    console.log('User ID (mount):', user?.id);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log('VITE_API_URL (submit):', import.meta.env.VITE_API_URL);
    console.log('Token (submit):', token);
    console.log('User ID (submit):', user?.id);

    if (password && password !== confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    if (!token) {
      toast.error('Token de autenticação ausente. Faça login novamente.');
      return;
    }

    if (!user?.id) {
      toast.error('ID do usuário não encontrado. Faça login novamente.');
      return;
    }

    const formData = {};
    if (name && name !== user.nome) formData.nome = name;
    if (password) {
      formData.novaSenha = password;
      formData.senhaAtual = currentPassword; // Usa o campo do formulário
      if (!formData.senhaAtual) {
        toast.error('Por favor, informe sua senha atual.');
        return;
      }
    }

    if (Object.keys(formData).length === 0) {
      toast.error('Informe ao menos um campo para atualizar.');
      return;
    }

    setLoading(true);
    try {
      console.log('Dados enviados para atualização:', formData);
      const result = await updateProfile(formData);
      if (result.success) {
        toast.success('Perfil atualizado com sucesso!');
        setPassword('');
        setConfirmPassword('');
        setCurrentPassword(''); // Limpa o campo
      } else {
        throw new Error(result.error || 'Falha na atualização');
      }
    } catch (err) {
      console.error('Erro detalhado:', err);
      toast.error(err.message || 'Falha na atualização');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 bg-white rounded-lg shadow-md max-w-md mx-auto">
      <h2 className="text-2xl font-semibold mb-4">Meu Perfil</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nome completo</label>
          <input
            name="name"
            type="text"
            value={name || ''}
            onChange={(e) => {
              setName(e.target.value);
              console.log("Novo valor do nome:", e.target.value);
            }}
            className="w-full border rounded p-2"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Nova senha</label>
          <input
            name="password"
            type="password"
            value={password || ''}
            onChange={(e) => {
              setPassword(e.target.value);
              console.log("Novo valor da senha:", e.target.value);
            }}
            className="w-full border rounded p-2"
            placeholder="Deixe em branco para manter a atual"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Confirmar nova senha</label>
          <input
            name="confirmPassword"
            type="password"
            value={confirmPassword || ''}
            onChange={(e) => {
              console.log("Evento onChange disparado para Confirmar senha");
              setConfirmPassword(e.target.value);
              console.log("Novo valor de confirmar senha:", e.target.value);
            }}
            className="w-full border rounded p-2"
            placeholder="Repita a nova senha"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Senha atual</label>
          <input
            name="currentPassword"
            type="password"
            value={currentPassword || ''}
            onChange={(e) => {
              setCurrentPassword(e.target.value);
              console.log("Senha atual digitada:", e.target.value);
            }}
            className="w-full border rounded p-2"
            placeholder="Digite sua senha atual"
          />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Salvar Alterações'}
        </button>
      </form>
    </div>
  );
}
