/**
 * Navbar.jsx
 * Ejercicio 1 — Navegación con React Router
 * Usa NavLink para detectar automáticamente la ruta activa y aplicar estilos.
 * La navegación NO recarga la página (comportamiento SPA de React Router).
 */

import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

const links = [
  { to: '/',          label: 'Inicio',    icon: '🏠' },
  { to: '/servicios', label: 'Servicios', icon: '⚡' },
  { to: '/contacto',  label: 'Contacto',  icon: '✉️' },
];

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar" role="navigation" aria-label="Navegación principal">
      <div className="navbar-inner container">

        {/* Logo */}
        <NavLink to="/" className="navbar-brand" onClick={() => setMenuOpen(false)}>
          <span className="brand-icon">⚛</span>
          <span className="brand-text">ReactApp</span>
        </NavLink>

        {/* Links de escritorio */}
        <ul className="navbar-links" role="list">
          {links.map(({ to, label, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `nav-link ${isActive ? 'nav-link--active' : ''}`
                }
                aria-current={({ isActive }) => isActive ? 'page' : undefined}
              >
                <span className="nav-link-icon">{icon}</span>
                {label}
              </NavLink>
            </li>
          ))}
        </ul>

        {/* Botón hamburguesa (móvil) */}
        <button
          className={`hamburger ${menuOpen ? 'hamburger--open' : ''}`}
          onClick={() => setMenuOpen(prev => !prev)}
          aria-label="Abrir menú"
          aria-expanded={menuOpen}
        >
          <span /><span /><span />
        </button>
      </div>

      {/* Menú móvil */}
      <div className={`navbar-mobile ${menuOpen ? 'navbar-mobile--open' : ''}`}>
        <ul role="list">
          {links.map(({ to, label, icon }) => (
            <li key={to}>
              <NavLink
                to={to}
                end={to === '/'}
                className={({ isActive }) =>
                  `nav-link-mobile ${isActive ? 'nav-link-mobile--active' : ''}`
                }
                onClick={() => setMenuOpen(false)}
              >
                <span>{icon}</span> {label}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
