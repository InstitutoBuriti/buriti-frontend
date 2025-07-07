import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Profile() {
  const { user, updateProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: user?.name || '',
    password: '',
    currentPassword: '', // Campo para senha atual
    confirmPassword: '', // Campo para confirmar nova senha
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log('Submetendo formulário com dados:', formData); // Debug
    // Validação básica: senha e confirmação devem coincidir
    if (formData.password && formData.password !== formData.confirmPassword) {
      setError('As senhas não coincidem.');
      console.log('Erro: Senhas não coincidem');
      return;
    }
    if (!formData.currentPassword) {
      setError('A senha atual é obrigatória.');
      console.log('Erro: Senha atual ausente');
      return;
    }
    try {
      console.log('Chamando updateProfile com:', {
        name: formData.name || undefined,
        password: formData.password || undefined,
        currentPassword: formData.currentPassword,
      });
      const response = await updateProfile({
        name: formData.name || undefined,
        password: formData.password || undefined,
        currentPassword: formData.currentPassword,
      });
      console.log('Resposta de updateProfile:', response); // Debug
      if (response.success) {
        alert('Perfil atualizado com sucesso!');
        navigate('/dashboard');
      } else {
        setError(response.error || 'Erro desconhecido ao atualizar perfil.');
        console.log('Erro na resposta:', response.error);
      }
    } catch (err) {
      console.error('Erro ao atualizar perfil (catch):', err);
      setError('Erro ao conectar com o servidor.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Editar Perfil</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Nome</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Senha Atual</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Nova Senha</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Confirmar Nova Senha</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="w-full p-2 border rounded"
          />
        </div>
        <button type="submit" className="w-full bg-buriti-red text-white p-2 rounded">
          Salvar
        </button>
      </form>
    </div>
  );
}
