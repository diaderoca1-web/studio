
'use client';

import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { User, login as apiLogin, register as apiRegister, logout as apiLogout, updateUser as apiUpdateUser } from '@/services/auth-service';

interface AuthContextType {
  user: User | null;
  login: (credentials: { email: string; pass: string }) => Promise<void>;
  register: (credentials: { name: string, email: string; phone: string; pass: string }) => Promise<void>;
  logout: () => void;
  isLoading: boolean;
  deductBalance: (amount: number) => boolean;
  addBalance: (amount: number) => boolean;
  updateUserInContext: (user: User) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if(storedUser) {
        setUser(JSON.parse(storedUser));
    }
    setIsLoading(false);
  }, []);

  const updateUserInContext = (updatedUser: User) => {
    setUser(updatedUser);
    localStorage.setItem('user', JSON.stringify(updatedUser));
  };

  const login = async (credentials: { email: string; pass: string }) => {
    const loggedInUser = await apiLogin(credentials.email, credentials.pass);
    updateUserInContext(loggedInUser);
  };

  const register = async (credentials: { name: string, email: string; phone: string; pass: string }) => {
    const newUser = await apiRegister(credentials.name, credentials.email, credentials.phone, credentials.pass);
    updateUserInContext(newUser);
  };

  const logout = () => {
    apiLogout();
    setUser(null);
    localStorage.removeItem('user');
  };

  const deductBalance = (amount: number): boolean => {
    if (user && user.balance !== undefined && user.balance >= amount) {
        const updatedUser = { ...user, balance: user.balance - amount };
        apiUpdateUser(updatedUser); // Update mock DB
        updateUserInContext(updatedUser);
        return true;
    }
    return false;
  };
  
  const addBalance = (amount: number): boolean => {
    if (user) {
        const updatedUser = { ...user, balance: (user.balance || 0) + amount };
        apiUpdateUser(updatedUser); // Update mock DB
        updateUserInContext(updatedUser);
        return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, isLoading, deductBalance, addBalance, updateUserInContext }}>
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
