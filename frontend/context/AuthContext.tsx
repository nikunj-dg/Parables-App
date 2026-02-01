import { createContext, useContext, useEffect, useState , } from "react";
import type { ReactNode } from "react";
import { useError } from "./ErrorContext";

// createContext creates a global container where stored data can be accessed by any component. 
// useContext lets a component read values from global container 

type AuthProviderProps = {
  children: ReactNode;
};

type AuthContextType = {
  isLoggedIn: boolean;
  userToken: string;
  login: (token: string) => void;
  logout: () => Promise<void>;
};

// A context containing value of type AuthContextType or null 
const AuthContext = createContext<AuthContextType | null>(null);

// Wrapper component 
export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [loading, setLoading] = useState(true);
  const [userToken, setUserToken] = useState("");
  const { showError } = useError();

  // Run once on app load
  useEffect(() => {
    const token = sessionStorage.getItem("user_token");
    setIsLoggedIn(!!token);
    setLoading(false);

    if (token) {
      setUserToken(token);
    }
    else {
      setUserToken("");
    }
  }, []);

  const login = (token: string) => {
    sessionStorage.setItem("user_token", token);
    setIsLoggedIn(true);
    setUserToken(token);
  };

  const logout = async () => {
    try {
        const res = await fetch("http://127.0.0.1:8000/logout", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${userToken}`,
            },
        });
        if (!res.ok) {
            throw new Error("Backend logout failed");
        }
    } catch (err) {
      console.error("Logout error:", err);

      if (err instanceof Error) {
        showError(err.message);
      } else {
        showError("Logout failed");
      }
    } finally {
        sessionStorage.removeItem("user_token");
        setUserToken("");
        setIsLoggedIn(false);
    }
  };

  // Make the following values available 
  return (
    <AuthContext.Provider value={{ isLoggedIn, userToken, login, logout }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook 
export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};


