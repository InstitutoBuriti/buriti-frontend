import { useEffect, useState } from "react";
import { useAuth } from "../../contexts/AuthContext";

// Definir a constante API_URL usando a variável de ambiente
const API_URL = import.meta.env.VITE_API_URL;

function NoticiaManager() {
  const { user } = useAuth();
  const [noticias, setNoticias] = useState([]);
  const [novaNoticia, setNovaNoticia] = useState({
    title: "",
    conteudo: "",
    categoria: "Comunicado",
    link: "",
    status: "Rascunho",
  });

  useEffect(() => {
    fetch(`${API_URL}/api/noticias`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setNoticias(data))
      .catch((err) => console.error("Erro ao carregar notícias:", err));
  }, []);

  const handleNovaNoticia = (e) => {
    e.preventDefault();
    fetch(`${API_URL}/api/noticias`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(novaNoticia),
    })
      .then((res) => res.json())
      .then((data) => {
        setNoticias((prev) => [...prev, data]);
        setNovaNoticia({ title: "", conteudo: "", categoria: "Comunicado", link: "", status: "Rascunho" });
      })
      .catch((err) => console.error("Erro ao criar notícia:", err));
  };

  const handleEditarNoticia = (id) => {
    const noticia = noticias.find((n) => n.id === id);
    fetch(`${API_URL}/api/noticias/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(noticia),
    })
      .then((res) => res.json())
      .then((data) => {
        setNoticias((prev) => prev.map((n) => (n.id === id ? data : n)));
      })
      .catch((err) => console.error("Erro ao atualizar notícia:", err));
  };

  const handleExcluirNoticia = (id) => {
    fetch(`${API_URL}/api/noticias/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => {
        if (res.status === 204) {
          setNoticias((prev) => prev.filter((n) => n.id !== id));
        }
      })
      .catch((err) => console.error("Erro ao excluir notícia:", err));
  };

  if (user.role !== "admin") {
    return <p className="text-center text-gray-600 font-inter">Acesso negado.</p>;
  }

  return (
    <div>
      <h1 className="text-3xl text-center font-montserrat font-bold text-buriti-red mb-6">
        Gerenciar Notícias
      </h1>
      <form onSubmit={handleNovaNoticia} className="max-w-lg mx-auto space-y-4 mb-6">
        <input
          type="text"
          value={novaNoticia.title}
          onChange={(e) => setNovaNoticia({ ...novaNoticia, title: e.target.value })}
          placeholder="Título"
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          value={novaNoticia.conteudo}
          onChange={(e) => setNovaNoticia({ ...novaNoticia, conteudo: e.target.value })}
          placeholder="Conteúdo"
          className="w-full p-2 border rounded"
          required
        />
        <select
          value={novaNoticia.categoria}
          onChange={(e) => setNovaNoticia({ ...novaNoticia, categoria: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="Comunicado">Comunicado</option>
          <option value="Evento">Evento</option>
        </select>
        <input
          type="text"
          value={novaNoticia.link}
          onChange={(e) => setNovaNoticia({ ...novaNoticia, link: e.target.value })}
          placeholder="Link (opcional)"
          className="w-full p-2 border rounded"
        />
        <select
          value={novaNoticia.status}
          onChange={(e) => setNovaNoticia({ ...novaNoticia, status: e.target.value })}
          className="w-full p-2 border rounded"
        >
          <option value="Rascunho">Rascunho</option>
          <option value="Publicado">Publicado</option>
        </select>
        <button
          type="submit"
          className="w-full px-4 py-2 bg-buriti-orange text-white rounded hover:bg-buriti-cyan transition"
        >
          Criar Notícia
        </button>
      </form>
      <div className="space-y-4">
        {noticias.map((noticia) => (
          <div key={noticia.id} className="border rounded-lg p-4 shadow-md bg-white">
            <input
              type="text"
              value={noticia.title}
              onChange={(e) => {
                setNoticias((prev) =>
                  prev.map((n) =>
                    n.id === noticia.id ? { ...n, title: e.target.value } : n
                  )
                );
              }}
              className="w-full p-2 border rounded mb-2"
            />
            <textarea
              value={noticia.conteudo}
              onChange={(e) => {
                setNoticias((prev) =>
                  prev.map((n) =>
                    n.id === noticia.id ? { ...n, conteudo: e.target.value } : n
                  )
                );
              }}
              className="w-full p-2 border rounded mb-2"
            />
            <select
              value={noticia.categoria}
              onChange={(e) => {
                setNoticias((prev) =>
                  prev.map((n) =>
                    n.id === noticia.id ? { ...n, categoria: e.target.value } : n
                  )
                );
              }}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="Comunicado">Comunicado</option>
              <option value="Evento">Evento</option>
            </select>
            <input
              type="text"
              value={noticia.link}
              onChange={(e) => {
                setNoticias((prev) =>
                  prev.map((n) =>
                    n.id === noticia.id ? { ...n, link: e.target.value } : n
                  )
                );
              }}
              placeholder="Link (opcional)"
              className="w-full p-2 border rounded mb-2"
            />
            <select
              value={noticia.status}
              onChange={(e) => {
                setNoticias((prev) =>
                  prev.map((n) =>
                    n.id === noticia.id ? { ...n, status: e.target.value } : n
                  )
                );
              }}
              className="w-full p-2 border rounded mb-2"
            >
              <option value="Rascunho">Rascunho</option>
              <option value="Publicado">Publicado</option>
            </select>
            <div className="flex gap-2">
              <button
                onClick={() => handleEditarNoticia(noticia.id)}
                className="px-4 py-2 bg-buriti-cyan text-white rounded"
              >
                Salvar
              </button>
              <button
                onClick={() => handleExcluirNoticia(noticia.id)}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Excluir
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NoticiaManager;
