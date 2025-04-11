import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const userCheck = async () => {
    try {
      const fetchAPI = await fetch("http://localhost:3000/api/auth/check", {
        method: "GET",
        credentials: "include",
      });
      const data = await fetchAPI.json();

      if (fetchAPI.ok && data.loggedIn) {
        setUser(data.user);
      } else {
        setUser(null);
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        setUser(null);
      } else {
        console.error("Error checking auth:", error);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    userCheck();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
