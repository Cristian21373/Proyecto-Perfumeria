import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/auth';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

useEffect(() => {
    const token = localStorage.getItem('adminToken');
    const userData = localStorage.getItem('adminUser');

    console.log("AUTH CONTEXT → token encontrado:", token);
    console.log("AUTH CONTEXT → userData encontrado:", userData);

    if (token && userData) {
        console.log("AUTH CONTEXT → Sesión válida. Cargando usuario...");
        setUser(JSON.parse(userData));
    } else {
        console.log("AUTH CONTEXT → NO hay sesión almacenada");
    }

    setLoading(false);
}, []);


  const login = async (credentials) => {
    setLoading(true);
    setError(null);

    try {
      const response = await authAPI.login(credentials);

      if (response.success && response.data?.token) {
        const { token, ...userData } = response.data;
        localStorage.setItem('adminToken', token);
        localStorage.setItem('adminUser', JSON.stringify(userData));

        setUser(userData);
        return { success: true, data: userData };
      }
      return { success: false, error: response.message };
    } catch (error) {
      setError(error.message || 'Error de autenticación');
      return { success: false, error: error.message };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setUser(null);
    window.location.href = '/admin/login';
  };

  return (
    <AuthContext.Provider value={{
      user,
      login,
      logout,
      loading,
      error,
      isAuthenticated: !!user
    }}>
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