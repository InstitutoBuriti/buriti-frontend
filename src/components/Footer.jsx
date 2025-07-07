import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import Logo from '../assets/Logo.png';

function Footer() {
  return (
    <footer className="bg-buriti-brown text-white pt-10 pb-6 px-4 mt-16">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 items-start text-center md:text-left">
        {/* Logo e descrição */}
        <div className="flex flex-col items-center md:items-start space-y-3">
          <img src={Logo} alt="Logo Instituto Buriti" className="h-12" />
          <p className="text-xl font-semibold tracking-wide font-montserrat">
            INSTITUTO <span className="text-buriti-cyan">BURITI</span>
          </p>
          <p className="text-sm font-inter text-gray-300 leading-relaxed max-w-xs">
            Formação continuada para educadores com foco em inclusão, inovação
            e transformação social.
          </p>
        </div>

        {/* Navegação */}
        <div>
          <h4 className="font-montserrat font-bold text-lg mb-2">Navegação</h4>
          <ul className="space-y-2 font-inter text-sm text-gray-200">
            <li>
              <Link to="/sobre" className="hover:text-buriti-cyan">
                Sobre
              </Link>
            </li>
            <li>
              <Link to="/contato" className="hover:text-buriti-cyan">
                Contato
              </Link>
            </li>
            <li>
              <Link to="/termos" className="hover:text-buriti-cyan">
                Termos de Uso
              </Link>
            </li>
            <li>
              <Link to="/politica" className="hover:text-buriti-cyan">
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>

        {/* Contato e redes sociais */}
        <div>
          <h4 className="font-montserrat font-bold text-lg mb-2">Contato</h4>
          <p className="text-sm font-inter text-gray-200 leading-relaxed">
            <a
              href="mailto:contato@institutoburiti.com.br"
              className="hover:text-buriti-cyan"
            >
              contato@institutoburiti.com.br
            </a>
            <br />
            <a href="tel:+551112345678" className="hover:text-buriti-cyan">
              (11) 1234-5678
            </a>
          </p>
          <div className="flex justify-center md:justify-start space-x-4 text-xl mt-3">
            <a
              href="https://instagram.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              className="hover:text-buriti-cyan"
            >
              <FaInstagram />
            </a>
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Facebook"
              className="hover:text-buriti-cyan"
            >
              <FaFacebook />
            </a>
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Twitter"
              className="hover:text-buriti-cyan"
            >
              <FaTwitter />
            </a>
          </div>
        </div>
      </div>

      {/* Rodapé inferior */}
      <div className="mt-10 border-t border-white/20 pt-4 text-center text-xs text-gray-400 font-inter">
        © {new Date().getFullYear()} Instituto Buriti. Todos os direitos reservados.
      </div>
    </footer>
  );
}

export default Footer;

