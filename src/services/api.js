import { useAuth } from "../contexts/AuthContext";

export function useApi() {
  const { token } = useAuth();

  const fetchWithAuth = async (url, options = {}) => {
    const headers = {
      ...(options.headers || {}),
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    };

    const config = {
      ...options,
      headers,
    };

    const response = await fetch(url, config);
    return response;
  };

  return { fetchWithAuth };
}

