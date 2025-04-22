import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getApplicationStatus = async () => {
      let localUser = localStorage.getItem("user");

      if (localUser) {
        try {
          localUser = JSON.parse(localUser);
          const apiUrl = `http://localhost:3000/api/applications/status?applicationID=${localUser.applicationID}`;

          const response = await fetch(apiUrl, {
            method: "GET",
            credentials: "include",
          });

          if (!response.ok) {
            console.error(
              `Failed to fetch application status: ${response.status} - ${response.statusText}`
            );
            setUser(null);
            return; // Exit the function if the fetch fails
          }

          const result = await response.json();

          if (result.success) {
            setUser(result.data);
            setUserType("applicant");
          } else {
            setUser(null);
          }
        } catch (error) {
          console.error("Error fetching application status:", error);
          setUser(null);
        }
      } else {
        setUser(null);
      }
    };

    const userCheck = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/auth/check", {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          if (response.status === 401) {
            setUser(null);
            getApplicationStatus();
            return; // Exit the function
          } else {
            console.error(
              `Authentication check failed: ${response.status} - ${response.statusText}`
            );
            setUser(null); // Or handle other failure scenarios
            return;
          }
        }

        const data = await response.json();

        if (data.loggedIn) {
          setUser(data.user);
          setUserType(data.user.role);
        } else {
          getApplicationStatus();
        }
      } catch (error) {
        console.error("Error checking auth:", error);
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    userCheck();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, userType, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  return useContext(AuthContext);
}
