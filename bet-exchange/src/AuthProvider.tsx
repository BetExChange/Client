import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextType, Balance, User } from "./Types"
import { useQuery } from "@tanstack/react-query";;

const AuthContext = createContext<AuthContextType | undefined>(undefined);
const API_BASE_URL = process.env.VITE_API_BASE_URL;

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const storedUserRole = localStorage.getItem("AuthUser") as 'buyer' | 'seller' | null;
  
  const [username, setUsername] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'buyer' | 'seller' | null>(storedUserRole);
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!storedUserRole);
  const navigate = useNavigate();

  useEffect(() => { 
    if (storedUserRole) {
      const users: User[] = JSON.parse(localStorage.getItem("Users") || "[]");
      const authenticatedUser = users.find((user: User) => user.role === storedUserRole);
      if (authenticatedUser) {
        setUsername(authenticatedUser.username);
        setUserId(authenticatedUser.id);
      }
    }
  }, [storedUserRole]);

  const login = (role: 'buyer' | 'seller') => {
    localStorage.setItem("AuthUser", role);
    setUserRole(role);
    setIsLoggedIn(true);
    if (role === 'buyer') {
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

  const fetchBalance = async (): Promise<number> => {
    const res = await fetch(`${API_BASE_URL}/balance/${userId}`);
    console.log("API BASE:", import.meta.env.VITE_API_BASE_URL);
    if (!res.ok) {
      throw new Error(`Failed to fetch user balance (${res.status})`);
    }
    const data: Balance = await res.json();
    return data.userBalance;
  };

  const { data: balance = null } = useQuery<number, Error>({
    queryKey: ["balance", userId],
    queryFn: fetchBalance,
    enabled: !!userId,
    refetchOnWindowFocus: false,
  });

  return (
    <AuthContext.Provider 
      value={{ username, userRole, userId, isLoggedIn, balance, login, logout }}
    >
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
