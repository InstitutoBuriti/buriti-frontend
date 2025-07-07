import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { toast } from 'react-toastify';

export default function Perfil() {
  const { user, updateProfile } = useAuth();
  const [name, setName] = useState(user?.nome || '');
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (user) setName(user.nome);
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Senhas precisam coincidir
    if (newPassword && newPassword !== confirmPassword) {
      toast.error('As senhas não coincidem');
      return;
    }

    // Validar presença de senha atual ao alterar senha
    if (newPassword && !currentPassword) {
      toast.error('Informe sua senha atual para alterar a senha');
      return;
    }

    // Montar payload
    const payload = {};
    if (name && name !== user.nome) payload.nome = name;
    if (newPassword) {
      payload.senhaAtual = currentPassword;
      payload.novaSenha = newPassword;
    }

    if (Object.keys(payload).length === 0) {
      toast.error('Informe ao menos um campo para atualizar.');
      return;
    }

    setLoading(true);
    try {
      const result = await updateProfile(payload);
      if (result.success) {
        toast.success('Perfil atualizado com sucesso!');
        setCurrentPassword('');
        setNewPassword('');
        setConfirmPassword('');
      } else {
        toast.error(result.error || 'Falha na atualização');
      }
    } catch (err) {
      toast.error(err.message || 'Erro ao atualizar perfil');
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
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full border rounded p-2"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Senha atual</label>
          <input
            type="password"
            value={currentPassword}
            onChange={(e) => setCurrentPassword(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Digite sua senha atual"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Nova senha</label>
          <input
            type="password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Deixe em branco para manter a senha atual"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Confirmar nova senha</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full border rounded p-2"
            placeholder="Confirme a nova senha"
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full py-2 px-4 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
        >
          {loading ? 'Salvando...' : 'Salvar alterações'}
        </button>
      </form>
    </div>
  );
}

