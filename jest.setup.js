// jest.setup.js

// Polyfills para jsdom
const { TextEncoder, TextDecoder } = require('util');
global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;

// Mock do Lottie Player para evitar uso de canvas
jest.mock('@lottiefiles/react-lottie-player', () => {
  const React = require('react');
  return {
    Player: (props) =>
      React.createElement('div', { 'data-testid': 'lottie-player', ...props })
  };
});

// Mock global do Swiper para evitar erros de ESM
jest.mock('swiper/react', () => {
  const React = require('react');
  return {
    Swiper: (props) =>
      React.createElement('div', { 'data-testid': 'swiper-mock', ...props }),
    SwiperSlide: (props) =>
      React.createElement('div', { 'data-testid': 'swiper-slide-mock', ...props })
  };
});

// Mock do swiper/modules
jest.mock('swiper/modules', () => ({
  Navigation: 'Navigation',
  Pagination: 'Pagination',
  Autoplay: 'Autoplay'
}));

// Mock dos estilos do Swiper
jest.mock('swiper/css', () => ({}));
jest.mock('swiper/css/navigation', () => ({}));
jest.mock('swiper/css/pagination', () => ({}));

// Configuração do Testing Library
require("@testing-library/jest-dom");

