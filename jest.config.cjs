// jest.config.cjs
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.[tj]sx?$": "babel-jest"
  },
  moduleNameMapper: {
    // Mocks para estilos CSS/SCSS
    "\\.(css|less|scss)$": "identity-obj-proxy",
    // Alias @/ para src/
    "^@/(.*)$": "<rootDir>/src/$1",
    // Mock para importações de imagens
    "\\.(png|jpe?g|gif|svg)$": "<rootDir>/__mocks__/fileMock.js"
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.js"],
  // Transpilar também o Swiper
  transformIgnorePatterns: [
    "node_modules/(?!swiper|@?swiper)"
  ]
};

