import { useState } from "react";
import { useAuth } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

function NovoCurso() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    descricao: "",
    modality: "Tradicional",
    duration: "",
    price: "",
    status: "Rascunho",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => formDataToSend.append(key, formData[key]));
    if (e.target.imagem.files[0]) {
      formDataToSend.append("imagem", e.target.imagem.files[0]);
    }

    fetch("http://localhost:4000/api/cursos", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: formDataToSend,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.id) navigate("/admin/cursos");
      })
      .catch((err) => console.error("Erro ao criar curso:", err));
  };

  if (user.role !== "admin") {
    return <p className="text-center text-gray-600 font-inter">Acesso negado.</p>;
  }

  return (
    <div>
      <h1 className="text-3xl text-center font-montserrat font-bold text-buriti-red mb-6">
        Novo Curso
      </h1>
      <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Título"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="descricao"
          value={formData.descricao}
          onChange={(e) => setFormData({ ...formData, descricao: e.target.value })}
          placeholder="Descrição"
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="modality"
          value={formData.modality}
          onChange={(e) => setFormData({ ...formData, modality: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="Tradicional">Tradicional</option>
          <option value="Online">Online</option>
        </select>
        <input
          type="text"
          name="duration"
          value={formData.duration}
          onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
          placeholder="Duração (ex: 20h)"
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          name="price"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          placeholder="Preço (ex: R$ 150,00)"
          className="w-full p-2 border rounded"
          required
        />
        <select
          name="status"
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="Rascunho">Rascunho</option>
          <option value="Publicado">Publicado</option>
        </select>
        <input type="file" name="imagem" className="w-full p-2 border rounded" />
        <button
          type="submit"
          className="w-full px-4 py-2 bg-buriti-orange text-white rounded hover:bg-buriti-cyan transition"
        >
          Criar Curso
        </button>
      </form>
    </div>
  );
}

export default NovoCurso;
