// src/pages/__tests__/Home.test.jsx
import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Home from "../Home";

describe("Home", () => {
  beforeEach(() => {
    render(
      <BrowserRouter>
        <Home />
      </BrowserRouter>
    );
  });

  it("exibe o título 'Cursos em Destaque'", () => {
    expect(screen.getByText(/Cursos em Destaque/i)).toBeInTheDocument();
  });

  it("exibe o título 'Notícias & Artigos Científicos'", () => {
    expect(screen.getByText(/Notícias & Artigos Científicos/i)).toBeInTheDocument();
  });

  it("mostra ao menos um card de curso", () => {
    expect(screen.getAllByText(/Ler Mais/i).length).toBeGreaterThan(0);
  });
});

