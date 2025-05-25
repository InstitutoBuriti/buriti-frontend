// babel.config.cjs
module.exports = {
  presets: [
    // Transpila sintaxe moderna para o Node.js atual
    ["@babel/preset-env", { targets: { node: "current" } }],
    // Habilita JSX com runtime automático (React 17+)
    ["@babel/preset-react", { runtime: "automatic" }]
  ]
};

