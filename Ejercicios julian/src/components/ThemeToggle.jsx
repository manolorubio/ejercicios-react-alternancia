/**
 * ThemeToggle.jsx
 * Ejercicio 5 — Variables CSS + React (Modo Oscuro/Claro)
 * Botón que alterna entre modo claro y oscuro.
 * Cambia el atributo data-theme del elemento <html> sin recargar la página.
 */

import './ThemeToggle.css';

/**
 * @param {boolean}  darkMode  - Estado actual del tema
 * @param {function} onToggle  - Función para alternar el tema
 */
function ThemeToggle({ darkMode, onToggle }) {
  return (
    <button
      id="theme-toggle-btn"
      className="theme-toggle"
      onClick={onToggle}
      aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
      title={darkMode ? 'Modo claro' : 'Modo oscuro'}
    >
      <span className="theme-toggle-track">
        <span className="theme-toggle-thumb">
          {/* Ícono sol (modo claro) / luna (modo oscuro) */}
          <span className="theme-icon">
            {darkMode ? '🌙' : '☀️'}
          </span>
        </span>
      </span>
    </button>
  );
}

export default ThemeToggle;
