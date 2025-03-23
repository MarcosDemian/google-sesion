import "./App.css";
import React, { useState, useEffect } from 'react';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/check-auth', {
          credentials: 'include',
        });
        const data = await response.json();
        if (data.isAuthenticated) {
          setIsAuthenticated(true);
          setUser(data.user);
        } else {
          setIsAuthenticated(false);
          setUser(null);
        }
      } catch (error) {
        console.error('Error al verificar la autenticación:', error);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = () => {
    if (window.confirm('¿Estás seguro de que quieres cerrar sesión?')) {
      window.location.href = 'http://localhost:3000/logout';
    }
  };

  return (
    <div className="container">
      <h1>Bienvenido, {isAuthenticated ? user.displayName : 'Invitado'}!</h1>
      {isAuthenticated ? (
        <button className="google-button" onClick={handleLogout}>Cerrar sesión</button>
      ) : (
        <a className="google-button" href="http://localhost:3000/auth/google">
          Iniciar sesión con Google
          <img className="icon" src="google.svg" alt="" />
        </a>
      )}
    </div>
  );
};

export default App;