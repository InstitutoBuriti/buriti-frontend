/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'buriti-orange': '#F16A21',      // Laranja da marca (principal)
        'buriti-red': '#D5360F',         // Vermelho vibrante
        'buriti-dark-red': '#810000',    // Fundo escuro, bordas fortes
        'buriti-brown': '#960E04',       // Suporte complementar
        'buriti-gray': '#D3D3D3',        // Fundo suave
        'buriti-light': '#FFF8F6',       // Fundo muito claro
        'buriti-white': '#FFFFFF'        // Branco padrão
      },
      fontFamily: {
        montserrat: ['Montserrat', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        merriweather: ['Merriweather', 'serif'],
      },
      animation: {
        gradient: 'gradient 5s ease infinite',
        fadeInScale: 'fadeInScale 0.8s ease forwards',
        fadeIn: 'fadeIn 0.8s ease forwards',
      },
      keyframes: {
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
        fadeInScale: {
          to: { opacity: '1', transform: 'scale(1)' },
        },
        fadeIn: {
          to: { opacity: '1' },
        },
      },
      backgroundSize: {
        '200%': '200%',
      },
    },
  },
  plugins: [],
};

