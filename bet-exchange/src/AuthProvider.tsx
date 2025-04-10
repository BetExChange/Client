import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContextType, User } from "./Types";

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const storedUserRole = localStorage.getItem("AuthUser") as 'buyer' | 'seller' | null;
  
  const [username, setUsername] = useState<string | null>(null);
  const [userRole, setUserRole] = useState<'buyer' | 'seller' | null>(storedUserRole);
  const [userId, setUserId] = useState<number | null>(null);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(!!storedUserRole);
  const [balance, setBalance] = useState<number | null>(null);
  const navigate = useNavigate();

  useEffect(() => { 
    if (storedUserRole) {
      const users: User[] = JSON.parse(localStorage.getItem("Users") || "[]");
      const authenticatedUser = users.find((user: User) => user.role === storedUserRole);
      if (authenticatedUser) {
        setUsername(authenticatedUser.username);
        setUserId(authenticatedUser.id);
        setBalance(authenticatedUser.balance);
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

  const updateBalance = (price: number, isMatched: boolean) => {
    const users: User[] = JSON.parse(localStorage.getItem("Users") || "[]");

    const updatedUsers = users.map((user: User) => {
      if (isMatched) {
        if (user.role === "buyer") {
          user.balance -= price;
        } else if (user.role === "seller") {
          user.balance += price;
        }
      } else {
        if (userRole === "buyer" && user.role === "buyer") {
          user.balance -= price;
        }
      }
      return user;
    });

    localStorage.setItem("Users", JSON.stringify(updatedUsers));

    const currentUser = updatedUsers.find((user: User) => user.role === userRole);
    if (currentUser) {
      setBalance(currentUser.balance);
    }
  };

  return (
    <AuthContext.Provider 
      value={{ username, userRole, userId, isLoggedIn, balance, login, logout, updateBalance }}
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
