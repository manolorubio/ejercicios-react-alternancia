/**
 * Servicios.jsx
 * Ejercicio 1 — Sección Servicios
 * Contiene los componentes Gallery (Ejercicio 3) y Blog (Ejercicio 4).
 */

import Gallery from '../features/Gallery';
import Blog from '../features/Blog';
import './Servicios.css';

function Servicios() {
  return (
    <div className="servicios-page page">

      {/* Cabecera de sección */}
      <header className="servicios-header">
        <span className="section-tag">⚡ Servicios</span>
        <h1 className="section-title">Nuestros Servicios</h1>
        <p className="section-subtitle">
          Explora nuestra galería de proyectos y el blog de publicaciones dinámicas.
        </p>
      </header>

      {/* Ejercicio 3: Galería de imágenes */}
      <section id="galeria" aria-labelledby="galeria-title">
        <div className="feature-header">
          <span className="section-tag">Ejercicio 3</span>
          <h2 className="section-title" id="galeria-title">Galería de Imágenes</h2>
          <p className="section-subtitle">
            Haz clic en una miniatura para verla como imagen principal.
          </p>
        </div>
        <Gallery />
      </section>

      <div className="section-divider" />

      {/* Ejercicio 4: Blog dinámico */}
      <section id="blog" aria-labelledby="blog-title">
        <div className="feature-header">
          <span className="section-tag">Ejercicio 4</span>
          <h2 className="section-title" id="blog-title">Blog Dinámico</h2>
          <p className="section-subtitle">
            Crea, edita, destaca y elimina publicaciones en tiempo real.
          </p>
        </div>
        <Blog />
      </section>

    </div>
  );
}

export default Servicios;
