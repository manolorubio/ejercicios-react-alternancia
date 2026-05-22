/**
 * App.jsx
 * Componente raíz de la aplicación.
 * - Ejercicio 1: Configura React Router con BrowserRouter, Routes y Route
 * - Ejercicio 5: Gestiona el estado del tema (claro/oscuro) y aplica el atributo
 *   data-theme al elemento <html> para activar las variables CSS correspondientes.
 */

import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import ThemeToggle from './components/ThemeToggle';
import Inicio from './pages/Inicio';
import Servicios from './pages/Servicios';
import Contacto from './pages/Contacto';
import NotFound from './pages/NotFound';

import './App.css';

function App() {
  // Ejercicio 5: Estado del tema, persistido en localStorage
  const [darkMode, setDarkMode] = useState(() => {
    const stored = localStorage.getItem('theme');
    if (stored) return stored === 'dark';
    // Respetar preferencia del sistema operativo
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  // Ejercicio 5: Aplica el atributo data-theme al <html> cada vez que cambia el estado
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleTheme = () => setDarkMode(prev => !prev);

  return (
    <BrowserRouter>
      {/* Ejercicio 1: Navbar con React Router NavLink */}
      <Navbar darkMode={darkMode} />

      {/* Ejercicio 5: Botón de alternar tema */}
      <ThemeToggle darkMode={darkMode} onToggle={toggleTheme} />

      <main>
        {/* Ejercicio 1: Rutas sin recarga de página */}
        <Routes>
          <Route path="/"          element={<Inicio />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/contacto"  element={<Contacto />} />
          <Route path="*"          element={<NotFound />} />
        </Routes>
      </main>

      <footer className="app-footer">
        <div className="container">
          <p>© 2025 · Ejercicios en Alternancia · Desarrollado con React + Vite</p>
        </div>
      </footer>
    </BrowserRouter>
  );
}

export default App;
