
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, login as apiLogin, register as apiRegister, logout as apiLogout } from '@/services/auth-service';

interface AuthContextType {
  user: User | null;
  login: (credentials: { phone: string; pass: string }) => Promise<void>;
  register: (credentials: { name: string, phone: string; pass: string }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // In a real app, you'd check for a token in localStorage or cookies
    // to keep the user logged in across sessions.
    const storedUser = localStorage.getItem('user');
    if(storedUser) {
        setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const login = async (credentials: { phone: string; pass: string }) => {
    const loggedInUser = await apiLogin(credentials.phone, credentials.pass);
    setUser(loggedInUser);
    localStorage.setItem('user', JSON.stringify(loggedInUser));
  };

  const register = async (credentials: { name: string, phone: string; pass: string }) => {
    const newUser = await apiRegister(credentials.name, credentials.phone, credentials.pass);
    setUser(newUser);
    localStorage.setItem('user', JSON.stringify(newUser));
  };

  const logout = () => {
    apiLogout();
    setUser(null);
    localStorage.removeItem('user');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
