import { useParams } from "react-router-dom";
import { useState } from "react";

function CourseContentManager() {
  const { id } = useParams();
  const [modulos, setModulos] = useState([]);
  const [novoModulo, setNovoModulo] = useState("");

  const adicionarModulo = () => {
    if (!novoModulo.trim()) return;
    const novo = { id: Date.now(), titulo: novoModulo, conteudos: [] };
    setModulos([...modulos, novo]);
    setNovoModulo("");
  };

  const adicionarConteudo = (moduloId, tipo, valor) => {
    if (!valor.trim()) return;
    const novoConteudo = { id: Date.now(), tipo, valor };
    setModulos(modulos.map((mod) =>
      mod.id === moduloId
        ? { ...mod, conteudos: [...mod.conteudos, novoConteudo] }
        : mod
    ));
  };

  return (
    <main className="px-6 py-10 max-w-5xl mx-auto">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">
        Gerenciar Conteúdo do Curso (ID: {id})
      </h1>

      {/* Adicionar Módulo */}
      <div className="flex gap-4 mb-6">
        <input
          type="text"
          placeholder="Título do Módulo"
          value={novoModulo}
          onChange={(e) => setNovoModulo(e.target.value)}
          className="flex-1 px-4 py-2 border rounded"
        />
        <button
          onClick={adicionarModulo}
          className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700"
        >
          Adicionar Módulo
        </button>
      </div>

      {/* Lista de Módulos e Conteúdos */}
      <div className="space-y-6">
        {modulos.map((modulo) => (
          <div key={modulo.id} className="border p-4 rounded bg-white shadow">
            <h2 className="font-semibold text-lg mb-2">{modulo.titulo}</h2>

            {/* Conteúdos */}
            <ul className="mb-4 list-disc ml-6 text-gray-700">
              {modulo.conteudos.map((c) => (
                <li key={c.id}>
                  <strong>{c.tipo}:</strong> {c.valor}
                </li>
              ))}
              {modulo.conteudos.length === 0 && (
                <li className="italic text-gray-400">Nenhum conteúdo adicionado.</li>
              )}
            </ul>

            {/* Inputs para conteúdo */}
            <div className="space-y-2">
              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Título do vídeo"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      adicionarConteudo(modulo.id, "Vídeo", e.target.value);
                      e.target.value = "";
                    }
                  }}
                  className="flex-1 px-3 py-1 border rounded"
                />
                <span className="text-sm text-gray-500 self-center">Pressione Enter</span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Pergunta do Quiz"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      adicionarConteudo(modulo.id, "Quiz", e.target.value);
                      e.target.value = "";
                    }
                  }}
                  className="flex-1 px-3 py-1 border rounded"
                />
                <span className="text-sm text-gray-500 self-center">Pressione Enter</span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Descrição da atividade"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      adicionarConteudo(modulo.id, "Atividade Upload", e.target.value);
                      e.target.value = "";
                    }
                  }}
                  className="flex-1 px-3 py-1 border rounded"
                />
                <span className="text-sm text-gray-500 self-center">Pressione Enter</span>
              </div>

              <div className="flex gap-2">
                <input
                  type="text"
                  placeholder="Título do Fórum"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      adicionarConteudo(modulo.id, "Fórum", e.target.value);
                      e.target.value = "";
                    }
                  }}
                  className="flex-1 px-3 py-1 border rounded"
                />
                <span className="text-sm text-gray-500 self-center">Pressione Enter</span>
              </div>
            </div>
          </div>
        ))}

        {modulos.length === 0 && (
          <p className="text-gray-500">Nenhum módulo adicionado ainda.</p>
        )}
      </div>
    </main>
  );
}

export default CourseContentManager;

