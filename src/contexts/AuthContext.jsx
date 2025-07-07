import { createContext, useContext, useEffect, useState } from "react";

// Exportar o AuthContext explicitamente
export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [carregando, setCarregando] = useState(true);
  const [error, setError] = useState(null);

  let API_URL;
  if (window.Cypress) {
    API_URL = import.meta.env.VITE_API_URL_CYPRESS || 'http://localhost:5173';
  } else {
    API_URL = import.meta.env.VITE_API_URL;
  }

  if (!API_URL) {
    throw new Error(
      "VITE_API_URL não está definido. Verifique as variáveis de ambiente no Vercel ou .env.production."
    );
  }
  console.log("AuthContext: API_URL usada:", API_URL);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      console.log("AuthContext: Tentando verificar sessão com token:", token);
      if (!window.Cypress) { // Só executa o fetch fora do ambiente Cypress
        fetch(`${API_URL}/api/ping`, {
          method: 'GET',
          headers: {
            Authorization: window.Cypress ? '' : `Bearer ${token}`,
            'Content-Type': 'application/json',
            'Accept': '*/*',
          },
          credentials: window.Cypress ? 'omit' : 'same-origin',
          timeout: 20000,
        })
          .then((res) => {
            console.log("AuthContext: Resposta recebida. Status:", res.status, "OK:", res.ok);
            if (!res.ok) {
              console.error("AuthContext: Erro na resposta do /api/ping. Status:", res.status, res.statusText);
              throw new Error(`Erro ao verificar sessão: ${res.statusText || res.status}`);
            }
            return res.json();
          })
          .then((data) => {
            console.log("AuthContext: Dados JSON do /api/ping:", data);
            if (data && data.status === 'ok') {
              setUser(JSON.parse(storedUser));
              console.log("AuthContext: Sessão verificada com sucesso.");
            } else {
              console.error("AuthContext: Resposta inesperada do /api/ping:", data);
              throw new Error("Resposta inesperada do servidor ao verificar sessão.");
            }
          })
          .catch((err) => {
            console.error("AuthContext: Erro na verificação de sessão (catch):", err.message, err.stack);
            localStorage.clear();
            setUser(null);
            setToken(null);
            setError(err.message);
          })
          .finally(() => {
            console.log("AuthContext: Verificação de sessão finalizada. Carregando definido como false.");
            setCarregando(false);
          });
      } else {
        // No ambiente Cypress, confia no localStorage simulado
        setUser(JSON.parse(storedUser));
        console.log("AuthContext: Sessão simulada com sucesso no ambiente Cypress.");
        setCarregando(false);
      }
    } else {
      console.log("AuthContext: Sem token ou usuário armazenado. Não verificando sessão.");
      setCarregando(false);
    }
  }, [token, API_URL]);

  const login = async (email, senha) => {
    try {
      console.log("Enviando requisição login para:", `${API_URL}/api/login`);
      const res = await fetch(`${API_URL}/api/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();
      console.log("Resposta recebida em /api/login:", data);

      if (res.ok) {
        const updatedUser = { ...data.user, role: data.user?.role || 'user' };
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        setToken(data.token);
        setUser(updatedUser);
        return { success: true, role: updatedUser.role };
      } else {
        console.error("Erro no login:", data.error);
        return { success: false, error: data.error || "Credenciais inválidas." };
      }
    } catch (err) {
      console.error("Erro ao fazer login:", err.message);
      return { success: false, error: "Erro ao conectar com o servidor. Tente novamente." };
    }
  };

  const updateProfile = async (formData) => {
    if (!user?.id) return { success: false, error: "Usuário não autenticado." };
    try {
      console.log("Enviando requisição updateProfile para:", `${API_URL}/api/users/${user.id}`, "com dados:", formData);
      const res = await fetch(`${API_URL}/api/users/${user.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log("Resposta recebida em /api/users/:id:", data);

      if (res.ok) {
        const updatedUser = { ...user, ...formData, role: user.role || 'user' };
        setUser(updatedUser);
        localStorage.setItem("user", JSON.stringify(updatedUser));
        return { success: true, message: data.message };
      } else {
        console.error("Erro ao atualizar perfil:", data.error);
        return { success: false, error: data.error || "Erro ao atualizar perfil." };
      }
    } catch (err) {
      console.error("Erro ao atualizar perfil:", err.message);
      return { success: false, error: "Erro ao conectar com o servidor. Tente novamente." };
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
    setToken(null);
  };

  if (carregando) {
    return <div className="text-center text-gray-700 font-montserrat">Carregando...</div>;
  }

  return (
    <AuthContext.Provider value={{ user, token, userType: user?.role || 'user', login, updateProfile, logout, error }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
