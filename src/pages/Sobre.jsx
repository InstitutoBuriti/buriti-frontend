import Footer from "../components/Footer";

function Sobre() {
  return (
    <div className="bg-buriti-gray min-h-screen flex flex-col justify-between">
      <main className="px-6 py-10 max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-buriti-red font-montserrat mb-6">
          Sobre o Instituto Buriti
        </h1>
        <p className="text-gray-700 mb-4 font-inter leading-relaxed">
          O Instituto Buriti é dedicado à formação de professores e profissionais da educação, com foco em inclusão escolar e metodologias inovadoras como o PBL.
        </p>
        <p className="text-gray-700 mb-4 font-inter leading-relaxed">
          Nossa missão é capacitar educadores para enfrentar os desafios da educação contemporânea, promovendo um ensino mais humano, acessível e eficaz.
        </p>
        <p className="text-gray-700 mb-4 font-inter leading-relaxed">
          Através de nossa plataforma EAD, oferecemos cursos com qualidade, flexibilidade e suporte contínuo, ajudando você a evoluir na sua carreira.
        </p>
      </main>

      <Footer />
    </div>
  );
}

export default Sobre;

