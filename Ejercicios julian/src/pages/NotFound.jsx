/**
 * NotFound.jsx
 * Página 404 — mostrada cuando la ruta no existe.
 */

import { Link } from 'react-router-dom';
import './NotFound.css';

function NotFound() {
  return (
    <div className="notfound-page page">
      <div className="notfound-content">
        <span className="notfound-code">404</span>
        <h1 className="notfound-title">Página no encontrada</h1>
        <p className="notfound-text">
          La ruta que buscas no existe. Regresa al inicio.
        </p>
        <Link to="/" className="btn btn-primary" id="btn-volver-inicio">
          🏠 Volver al Inicio
        </Link>
      </div>
    </div>
  );
}

export default NotFound;
