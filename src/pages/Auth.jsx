import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import Footer from "../components/Footer";

function Auth() {
  const [modo, setModo] = useState("login");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");

  const navigate = useNavigate();
  const { login, user } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (modo === "login") {
      const result = login(email, senha);
      if (result.success) {
        setErro("");
      } else {
        setErro("E-mail ou senha inválidos.");
        setSenha("");
      }
    } else {
      const novoAluno = {
        id: Date.now(),
        nome: "Aluno Teste",
        email,
        role: "aluno",
      };
      localStorage.setItem("user", JSON.stringify(novoAluno));
      localStorage.setItem("alunoLogado", JSON.stringify(novoAluno));
      setErro("");
      navigate("/dashboard");
    }
  };

  useEffect(() => {
    if (user) {
      if (user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/dashboard");
      }
    }
  }, [user, navigate]);

  return (
    <div className="bg-buriti-gray min-h-screen flex flex-col justify-between">
      <main className="px-6 py-16 max-w-md mx-auto">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-buriti-red font-montserrat mb-2">
            {modo === "login" ? "Login do Aluno" : "Cadastrar Novo Aluno"}
          </h1>
          <p className="text-gray-700 font-inter">
            {modo === "login"
              ? "Acesse seus cursos com seu e-mail e senha cadastrados."
              : "Preencha os campos abaixo para criar uma nova conta."}
          </p>
        </div>

        {erro && <p className="text-red-500 text-sm mb-4">{erro}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <input
            type="password"
            placeholder="Senha"
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            className="w-full px-4 py-2 border rounded"
          />
          <button
            type="submit"
            className="w-full bg-buriti-red text-white py-2 rounded"
          >
            {modo === "login" ? "Entrar" : "Cadastrar"}
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            onClick={() => setModo(modo === "login" ? "register" : "login")}
            className="text-sm text-buriti-cyan hover:underline"
          >
            {modo === "login"
              ? "Ainda não tem uma conta? Cadastre-se"
              : "Já tem uma conta? Faça login"}
          </button>
        </div>
      </main>
      <Footer />
    </div>
  );
}

export default Auth;

