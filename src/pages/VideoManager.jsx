import { useState } from "react";

function VideoManager() {
  const [videos, setVideos] = useState([]);
  const [titulo, setTitulo] = useState("");
  const [arquivo, setArquivo] = useState(null);

  const handleUpload = (e) => {
    e.preventDefault();

    if (!titulo || !arquivo) return alert("Preencha todos os campos.");

    const novoVideo = {
      id: Date.now(),
      titulo,
      arquivo: URL.createObjectURL(arquivo),
    };

    setVideos((prev) => [...prev, novoVideo]);
    setTitulo("");
    setArquivo(null);
  };

  const removerVideo = (id) => {
    setVideos((prev) => prev.filter((v) => v.id !== id));
  };

  return (
    <main className="px-6 py-10 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Gerenciar Aulas em Vídeo</h1>

      <form onSubmit={handleUpload} className="space-y-4 mb-8">
        <input
          type="text"
          placeholder="Título do vídeo"
          className="w-full px-4 py-2 border border-gray-300 rounded"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />

        <input
          type="file"
          accept="video/mp4"
          className="w-full px-4 py-2 border border-gray-300 rounded"
          onChange={(e) => setArquivo(e.target.files[0])}
        />

        <button
          type="submit"
          className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
        >
          Enviar Vídeo
        </button>
      </form>

      <div className="grid gap-6">
        {videos.map((video) => (
          <div key={video.id} className="border rounded-lg p-4 bg-white shadow">
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-lg font-semibold text-gray-800">{video.titulo}</h2>
              <button
                onClick={() => removerVideo(video.id)}
                className="text-red-600 text-sm hover:underline"
              >
                Remover
              </button>
            </div>
            <video src={video.arquivo} controls className="w-full rounded" />
          </div>
        ))}
      </div>
    </main>
  );
}

export default VideoManager;

