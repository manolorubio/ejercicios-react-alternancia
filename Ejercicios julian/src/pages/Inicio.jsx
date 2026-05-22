/**
 * Inicio.jsx
 * Ejercicio 1 — Sección Inicio
 * Pantalla de bienvenida con descripción del proyecto.
 */

import { Link } from 'react-router-dom';
import './Inicio.css';

// Tarjetas de características del proyecto
const features = [
  {
    icon: '🧭',
    title: 'React Router',
    desc: 'Navegación entre secciones sin recargar la página usando React Router DOM.',
    ex: 'Ejercicio 1',
  },
  {
    icon: '📋',
    title: 'Formulario Validado',
    desc: 'Formulario de contacto con validación en tiempo real usando useState.',
    ex: 'Ejercicio 2',
  },
  {
    icon: '🖼️',
    title: 'Galería Interactiva',
    desc: 'Galería de imágenes con selección dinámica y animaciones CSS.',
    ex: 'Ejercicio 3',
  },
  {
    icon: '📝',
    title: 'Blog Dinámico',
    desc: 'Sistema de publicaciones con creación, edición y eliminación de posts.',
    ex: 'Ejercicio 4',
  },
  {
    icon: '🌓',
    title: 'Modo Oscuro/Claro',
    desc: 'Variables CSS + React para cambiar el tema visual sin recargar.',
    ex: 'Ejercicio 5',
  },
  {
    icon: '🚀',
    title: 'Despliegue',
    desc: 'Publicado en Vercel (CI/CD) e InfinityFree (FTP) con GitHub.',
    ex: 'Deploy',
  },
];

// Estadísticas del proyecto
const stats = [
  { value: '5',      label: 'Ejercicios' },
  { value: 'React',  label: 'Framework' },
  { value: 'Vite',   label: 'Build Tool' },
  { value: '2',      label: 'Despliegues' },
];

function Inicio() {
  return (
    <div className="inicio-page page">

      {/* Hero */}
      <section className="hero" aria-labelledby="hero-title">
        <div className="hero-badge">
          <span className="badge badge-accent">⚛ React + Vite</span>
        </div>

        <h1 className="hero-title" id="hero-title">
          Ejercicios en{' '}
          <span className="gradient-text">Alternancia</span>
        </h1>

        <p className="hero-subtitle">
          Proyecto de desarrollo web moderno con React. Aprende componentes,
          estado, enrutamiento, formularios y despliegue en un flujo de trabajo real.
        </p>

        <div className="hero-actions">
          <Link to="/servicios" className="btn btn-primary" id="btn-ver-servicios">
            <span>⚡</span> Ver Servicios
          </Link>
          <Link to="/contacto" className="btn btn-secondary" id="btn-ir-contacto">
            <span>✉️</span> Contacto
          </Link>
        </div>

        {/* Estadísticas */}
        <div className="hero-stats">
          {stats.map(({ value, label }) => (
            <div key={label} className="stat-item">
              <span className="stat-value">{value}</span>
              <span className="stat-label">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Grid de características */}
      <section className="features-section" aria-labelledby="features-title">
        <div className="section-header">
          <span className="section-tag">Contenidos</span>
          <h2 className="section-title" id="features-title">¿Qué incluye el proyecto?</h2>
          <p className="section-subtitle">
            Una aplicación completa que cubre los resultados de aprendizaje RA3, RA5, RA6 y RA7.
          </p>
        </div>

        <div className="features-grid">
          {features.map(({ icon, title, desc, ex }) => (
            <article key={title} className="feature-card card">
              <div className="feature-icon">{icon}</div>
              <div className="feature-content">
                <span className="badge badge-accent">{ex}</span>
                <h3 className="feature-title">{title}</h3>
                <p className="feature-desc">{desc}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      {/* Tecnologías */}
      <section className="tech-section" aria-labelledby="tech-title">
        <div className="section-header">
          <span className="section-tag">Stack</span>
          <h2 className="section-title" id="tech-title">Tecnologías utilizadas</h2>
        </div>
        <div className="tech-list">
          {['React 18', 'Vite', 'React Router DOM', 'Framer Motion', 'CSS Variables', 'GitHub', 'Vercel', 'InfinityFree'].map(tech => (
            <span key={tech} className="tech-badge">{tech}</span>
          ))}
        </div>
      </section>

    </div>
  );
}

export default Inicio;
