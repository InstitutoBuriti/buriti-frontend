import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [carregando, setCarregando] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (token && storedUser) {
      fetch("http://localhost:4000/api/ping", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          if (res.ok) {
            setUser(JSON.parse(storedUser));
          } else {
            localStorage.clear();
            setUser(null);
            setToken(null);
          }
        })
        .catch(() => {
          localStorage.clear();
          setUser(null);
          setToken(null);
        })
        .finally(() => setCarregando(false));
    } else {
      setCarregando(false);
    }
  }, [token]);

  const login = async (email, senha) => {
    try {
      const res = await fetch("http://localhost:4000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, senha }),
      });

      const data = await res.json();
      console.log("Resposta recebida em /api/login:", data);

      if (res.ok) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        setToken(data.token);
        setUser(data.user);
        return { success: true, role: data.user.role };
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
    console.log('Dados enviados para atualização:', formData); // Log para depuração
    try {
      const res = await fetch(`http://localhost:4000/api/users/${user.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      console.log('Resposta recebida em /api/users/:id:', data); // Log para depuração

      if (res.ok) {
        const updatedUser = { ...user, ...formData };
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
    <AuthContext.Provider value={{ user, token, userType: user?.role, login, updateProfile, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}
