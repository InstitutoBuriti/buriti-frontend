function ArticleCard({ title, summary, link }) {
  return (
    <div className="bg-white rounded-xl shadow p-5 w-full sm:w-80">
      <h3 className="text-lg font-montserrat font-semibold text-buriti-red mb-2">{title}</h3>
      <p className="text-sm font-montserrat text-gray-600 mb-4 line-clamp-2">{summary}</p>
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="text-buriti-red font-montserrat font-medium hover:underline"
      >
        Ler mais
      </a>
    </div>
  );
}

export default ArticleCard;
