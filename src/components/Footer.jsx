// src/components/Footer.jsx
import { Link } from 'react-router-dom';
import { FaInstagram, FaFacebook, FaTwitter } from 'react-icons/fa';
import Logo from '../assets/Logo.png';

function Footer() {
  return (
    <footer className="bg-buriti-brown text-white pt-10 pb-6 px-4 mt-16">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 items-center text-center md:text-left">
        <div className="flex flex-col items-center md:items-start space-y-3">
          <img src={Logo} alt="Logo Instituto Buriti" className="h-12" />
          <p className="text-lg font-semibold tracking-wide font-montserrat">
            INSTITUTO <span className="text-buriti-orange">BURITI</span>
          </p>
          <p className="text-sm font-inter text-gray-300 leading-relaxed max-w-xs">
            Formação continuada para educadores com foco em inclusão, inovação e transformação social.
          </p>
        </div>
        <div className="space-y-4">
          <h4 className="font-montserrat font-bold text-lg mb-2">Navegação</h4>
          <ul className="space-y-2 font-inter text-sm text-gray-200">
            <li>
              <Link to="/sobre" className="hover:text-buriti-orange transition-colors">
                Sobre
              </Link>
            </li>
            <li>
              <Link to="/contato" className="hover:text-buriti-orange transition-colors">
                Contato
              </Link>
            </li>
            <li>
              <Link to="/termos" className="hover:text-buriti-orange transition-colors">
                Termos de Uso
              </Link>
            </li>
            <li>
              <Link to="/politica" className="hover:text-buriti-orange transition-colors">
                Política de Privacidade
              </Link>
            </li>
          </ul>
        </div>
        <div className="space-y-4">
          <h4 className="font-montserrat font-bold text-lg mb-2">Contato</h4>
          <p className="text-sm font-inter text-gray-200">
            contato@institutoburiti.com.br
            <br />
            (11) 1234-5678
          </p>
          <div className="flex justify-center md:justify-start space-x-4 text-lg mt-2">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <FaInstagram className="hover:text-buriti-orange transition-colors" />
            </a>
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Facebook">
              <FaFacebook className="hover:text-buriti-orange transition-colors" />
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" aria-label="Twitter">
              <FaTwitter className="hover:text-buriti-orange transition-colors" />
            </a>
          </div>
        </div>
      </div>
      <div className="mt-8 border-t border-white/20 pt-4 text-center text-xs text-gray-400 font-inter">
        © {new Date().getFullYear()} Instituto Buriti. Todos os direitos reservados.
      </div>
    </footer>
  );
}

export default Footer;

