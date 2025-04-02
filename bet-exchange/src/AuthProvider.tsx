import React, { createContext, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextType } from "./Types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const storedUserRole = localStorage.getItem("AuthUser") as 'buyer' | 'seller' | null;

  const [userRole, setUserRole] = useState<'buyer' | 'seller' | null>(storedUserRole);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!storedUserRole);
  const navigate = useNavigate();

  const login = (role: 'buyer' | 'seller') => {
    localStorage.setItem("AuthUser", role);
    setUserRole(role);
    setIsLoggedIn(true);
    if (role === 'buyer'){
        navigate("/buyer");
    } else {
        navigate("/seller");
    }
    
  };

  const logout = () => {
    localStorage.removeItem("AuthUser");
    setUserRole(null);
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ userRole, isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export default AuthProvider;
