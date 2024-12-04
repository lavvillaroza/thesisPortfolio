import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import Cookies from 'js-cookie';
import axios from 'axios';
import { API_BASE_URL } from '../api/apiConfig';


interface UserDetails {
  username: string;
  password: string;
  usertype: number; // 0 for student, 1 for admin
}

interface AuthContextType {
    user: UserDetails | null;
    login: (loginData: UserDetails) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
};

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserDetails | null>(null);

    // On component mount, check if the token and user details exist
    useEffect(() => {
      const token = Cookies.get('jwtToken');
      const userDetails = localStorage.getItem('userDetails');

      if (token && userDetails) {
        setUser(JSON.parse(userDetails));
      }
    }, []);
    const login = async (loginData: UserDetails) => {
        console.log(API_BASE_URL);
        const response = await axios.post(`${API_BASE_URL}/Auth/login`, loginData, {
            headers: {
              'Content-Type': 'application/json'
            }});
        
        const { token, userDetails } = response.data;

        if (!token || !userDetails) {
            throw new Error('Invalid response structure');
        }

        Cookies.set('jwtToken', token, { expires: 1 });
        localStorage.setItem('userDetails', JSON.stringify(userDetails));
        setUser(userDetails);
    };

    const logout = () => {
        Cookies.remove('jwtToken');
        localStorage.removeItem('userDetails');
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
