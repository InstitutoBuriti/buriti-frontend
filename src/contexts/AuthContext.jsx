// src/contexts/AuthContext.jsx

import { createContext, useContext, useEffect, useState } from "react";

// Vamos ler a URL do backend a partir da variável de ambiente:
//   - Lembre-se de que, no Vercel, você definiu VITE_API_URL apontando
//     para algo como "https://buriti-backend.onrender.com" (ou onde seu backend esteja rodando).
//   - No seu .env.local (para desenvolvimento), deve haver algo como:
//       VITE_API_URL="http://localhost:4000"
const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      // Faz um "ping" ao backend para verificar se o token ainda é válido
      fetch(`${API_URL}/api/ping`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            setUser(JSON.parse(storedUser));
          } else {
            // Token inválido ou expirado: limpa tudo
            localStorage.clear();
            setUser(null);
            setToken(null);
          }
        })
        .catch(() => {
          // Qualquer falha, limpa também
          localStorage.clear();
          setUser(null);
          setToken(null);
        })
        .finally(() => setCarregando(false));
    } else {
      setCarregando(false);
    }
  }, [token]);

  // Função de login: usa fetch para chamar /api/login no backend
  const login = async (email, senha) => {
    try {
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();
      console.log("Resposta recebida em /api/login:", data);

      if (res.ok) {
        // Se login OK, armazena token e usuário
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        return { success: true, role: data.user.role };
      } else {
        console.error("Erro no login:", data.error);
        return {
          success: false,
          error: data.error || "Credenciais inválidas.",
        };
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err.message);
      return {
        success: false,
        error: "Erro ao conectar com o servidor. Tente novamente.",
      };
    }
  };

  // Função para atualizar perfil — também usa a mesma variável de ambiente
  const updateProfile = async (formData) => {
    console.log("Dados enviados para atualização:", formData);
    try {
      const res = await fetch(`${API_URL}/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Resposta recebida em /api/users/:id:", data);

      if (res.ok) {
        // Se atualização deu certo, atualizo o user no contexto e no localStorage
        const updatedUser = { ...user, ...formData };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return { success: true, message: data.message };
      } else {
        console.error("Erro ao atualizar perfil:", data.error);
        return {
          success: false,
          error: data.error || "Erro ao atualizar perfil.",
        };
      }
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err.message);
      return {
        success: false,
        error: "Erro ao conectar com o servidor. Tente novamente.",
      };
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
  };

  if (carregando) {
    return (
      <div className="text-center text-gray-700 font-montserrat">Carregando...</div>
    );
  }

  return (
    <AuthContext.Provider
      value={{ user, token, userType: user?.role, login, updateProfile, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

