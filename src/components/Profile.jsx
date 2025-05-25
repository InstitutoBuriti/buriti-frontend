import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

export default function Profile() {
  const { user, updateProfile } = useAuth();
  const [nome, setNome] = useState(user?.nome || "");
  const [novaSenha, setNovaSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");
  const [mensagem, setMensagem] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMensagem("");

    if (novaSenha !== confirmarSenha) {
      setMensagem("As senhas não coincidem.");
      return;
    }

    const formData = {};
    if (nome !== user.nome) formData.nome = nome;
    if (novaSenha) {
      formData.novaSenha = novaSenha;
      formData.senhaAtual = prompt("Digite sua senha atual para confirmar:"); // Substitua por um input, se preferir
    }

    if (Object.keys(formData).length === 0) {
      setMensagem("Informe ao menos um campo para atualizar.");
      return;
    }

    const result = await updateProfile(formData);
    if (result.success) {
      setMensagem("Perfil atualizado com sucesso!");
    } else {
      setMensagem(result.error);
    }
  };

  return (
    <div className="max-w-md mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Meu Perfil</h2>
      {mensagem && <p className="mb-4 text-red-500">{mensagem}</p>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700">Nome completo</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => {
              setNome(e.target.value);
              console.log("Novo valor do nome:", e.target.value); // Log para depuração
            }}
            className="w-full p-2 border rounded"
            placeholder="Nome completo"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Nova senha</label>
          <input
            type="password"
            value={novaSenha}
            onChange={(e) => setNovaSenha(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Nova senha"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Confirmar senha</label>
          <input
            type="password"
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            className="w-full p-2 border rounded"
            placeholder="Confirmar senha"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded">
          Salvar Alterações
        </button>
      </form>
    </div>
  );
}
