// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

type Role = 'admin' | 'student';

interface User {
  username: string;
  role: Role;
}

interface AuthContextProps {
  user: User | null;
  login: (username: string, password: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextProps | undefined>(undefined);

const dummyUsers: Array<{ username: string; password: string; role: Role }> = [
  { username: 'admin@gmail.com', password: 'admin123', role: 'admin' },
  { username: 'student@gmain.com', password: 'student123', role: 'student' },
];

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUser = localStorage.getItem('user');
    if (loggedUser) {
      const parsedUser: User = JSON.parse(loggedUser);
      setUser(parsedUser);
      navigateBasedOnRole(parsedUser.role);
    }
  }, []);

  const login = (username: string, password: string) => {
    const foundUser = dummyUsers.find(
      (u) => u.username === username && u.password === password
    );
    if (foundUser) {
      const loggedInUser: User = { username: foundUser.username, role: foundUser.role };
      setUser(loggedInUser);
      localStorage.setItem('user', JSON.stringify(loggedInUser));
      navigateBasedOnRole(foundUser.role);
    } else {
      alert('Invalid credentials');
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('user');
    navigate('/login');
  };

  const navigateBasedOnRole = (role: Role) => {
    if (role === 'admin') navigate('/admin');
    else navigate('/student');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};