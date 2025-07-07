import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';

export default function Auth() {
  const [formData, setFormData] = useState({ email: '', senha: '' }); // Alterado para 'senha'
  const [error, setError] = useState('');
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login(formData.email, formData.senha); // Usando 'senha'
      if (response && response.success) navigate('/dashboard');
      else setError(response.error || 'Falha no login.');
    } catch (err) {
      setError('Falha no login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white rounded shadow">
      <h2 className="text-2xl font-bold mb-4">Entrar</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Senha</label>
          <input
            type="password"
            name="senha" // Alterado para 'senha' para corresponder ao teste
            value={formData.senha}
            onChange={handleChange}
            className="w-full p-2 border rounded"
            required
          />
        </div>
        <button type="submit" className="w-full bg-buriti-red text-white p-2 rounded">
          Entrar
        </button>
      </form>
    </div>
  );
}
