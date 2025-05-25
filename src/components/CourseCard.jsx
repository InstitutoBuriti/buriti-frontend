import { Link } from "react-router-dom";
import { FaHeart } from "react-icons/fa";

function CourseCard({ id, title, duration, price, imagem, favorited, onToggleFavorite }) {
  return (
    <div className="relative bg-white border border-buriti-brown rounded-xl shadow-md w-full max-w-[300px] h-[420px] mx-auto hover:shadow-lg transition-shadow duration-300">
      {/* Imagem do curso */}
      {imagem ? (
        <img
          src={imagem}
          alt={`Imagem do curso ${title}`}
          className="w-full h-[200px] object-cover rounded-t-xl"
          loading="lazy"
        />
      ) : (
        <div className="h-[200px] w-full bg-buriti-gray flex items-center justify-center rounded-t-xl">
          <span className="text-gray-500 font-montserrat">Sem imagem</span>
        </div>
      )}

      {/* Botão de favorito */}
      <button
        onClick={onToggleFavorite}
        className="absolute top-2 right-2 text-buriti-brown transition-transform duration-300 focus:outline-none focus:ring-2 focus:ring-buriti-orange"
        aria-label={`Favoritar curso ${title}`}
      >
        <FaHeart
          className={`w-6 h-6 ${favorited ? "text-buriti-orange scale-125" : "scale-100"}`}
        />
      </button>

      {/* Conteúdo */}
      <div className="p-4 flex flex-col justify-between h-[220px]">
        <div>
          <h3 className="text-buriti-red font-montserrat font-bold text-lg leading-snug">
            {title}
          </h3>
          <p className="text-gray-700 font-inter text-sm mt-2">
            Duração: {duration}
          </p>
          <p className="text-buriti-orange font-inter font-medium text-base mt-1">
            {price}
          </p>
        </div>
        <Link
          to={`/cursos/${id}`}
          className="mt-4 inline-block bg-buriti-orange text-white font-inter font-medium text-sm px-4 py-2 rounded-lg hover:bg-buriti-dark-red transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-buriti-orange text-center"
        >
          Ver Mais
        </Link>
      </div>
    </div>
  );
}

export default CourseCard;

