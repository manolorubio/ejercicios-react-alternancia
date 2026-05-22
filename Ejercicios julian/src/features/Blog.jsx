/**
 * Blog.jsx
 * Ejercicio 4 — Sistema de posts dinámicos
 *
 * Permite al usuario:
 *   - Crear nuevos posts (título + descripción)
 *   - Editar posts existentes (inline)
 *   - Eliminar posts
 *   - Destacar/fijar posts (los mueve al principio)
 *
 * Todo gestionado con useState sin backend.
 */

import { useState } from 'react';
import PostCard from '../components/PostCard';
import './Blog.css';

// Posts de ejemplo iniciales
const INITIAL_POSTS = [
  {
    id: 1,
    titulo: 'Bienvenido al Blog Dinámico',
    descripcion: 'Este es un sistema de publicaciones creado con React. Puedes añadir, editar, eliminar y destacar posts sin recargar la página.',
    destacado: true,
    fecha: new Date().toLocaleDateString('es-ES'),
  },
  {
    id: 2,
    titulo: 'React y el DOM Virtual',
    descripcion: 'React utiliza un DOM virtual para actualizar solo las partes de la interfaz que cambian, lo que mejora notablemente el rendimiento.',
    destacado: false,
    fecha: new Date().toLocaleDateString('es-ES'),
  },
];

function Blog() {
  // Estado principal: lista de posts
  const [posts, setPosts] = useState(INITIAL_POSTS);

  // Estado del formulario de nuevo post
  const [form, setForm] = useState({ titulo: '', descripcion: '' });

  // Estado de errores del formulario
  const [formErrors, setFormErrors] = useState({ titulo: '', descripcion: '' });

  // Contador para IDs únicos
  const [nextId, setNextId] = useState(3);

  // Filtro activo: 'todos' | 'destacados'
  const [filter, setFilter] = useState('todos');

  /**
   * Maneja cambios en el formulario de nuevo post.
   */
  const handleFormChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
    if (formErrors[name]) {
      setFormErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  /**
   * Valida el formulario. Retorna true si es válido.
   */
  const validateForm = () => {
    const errors = { titulo: '', descripcion: '' };
    if (!form.titulo.trim()) errors.titulo = 'El título es obligatorio.';
    if (!form.descripcion.trim()) errors.descripcion = 'La descripción es obligatoria.';
    setFormErrors(errors);
    return !errors.titulo && !errors.descripcion;
  };

  /**
   * onSubmit: crea un nuevo post y lo añade a la lista.
   */
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newPost = {
      id: nextId,
      titulo: form.titulo.trim(),
      descripcion: form.descripcion.trim(),
      destacado: false,
      fecha: new Date().toLocaleDateString('es-ES'),
    };

    setPosts(prev => [newPost, ...prev]);
    setNextId(prev => prev + 1);
    setForm({ titulo: '', descripcion: '' });
  };

  /**
   * Elimina un post por su id.
   * @param {number} id
   */
  const handleDelete = (id) => {
    setPosts(prev => prev.filter(p => p.id !== id));
  };

  /**
   * Alterna el estado "destacado" de un post.
   * Los posts destacados se ordenan primero.
   * @param {number} id
   */
  const handleToggleDestacado = (id) => {
    setPosts(prev => {
      const updated = prev.map(p =>
        p.id === id ? { ...p, destacado: !p.destacado } : p
      );
      // Ordenar: destacados primero
      return [...updated].sort((a, b) => b.destacado - a.destacado);
    });
  };

  /**
   * Guarda la edición de un post.
   * @param {number} id
   * @param {object} newData - { titulo, descripcion }
   */
  const handleEdit = (id, newData) => {
    setPosts(prev =>
      prev.map(p => p.id === id ? { ...p, ...newData } : p)
    );
  };

  // Posts filtrados según el filtro activo
  const filteredPosts = filter === 'destacados'
    ? posts.filter(p => p.destacado)
    : posts;

  return (
    <div className="blog-container">

      {/* Formulario de creación */}
      <form className="blog-form card" onSubmit={handleSubmit} noValidate aria-label="Crear nueva publicación">
        <h3 className="blog-form-title">✏️ Nueva publicación</h3>

        <div className="form-group">
          <label htmlFor="blog-titulo" className="form-label">
            Título <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <input
            id="blog-titulo"
            type="text"
            name="titulo"
            className={`form-input ${formErrors.titulo ? 'invalid' : ''}`}
            value={form.titulo}
            onChange={handleFormChange}
            placeholder="Título de la publicación..."
            aria-describedby="blog-titulo-error"
          />
          {formErrors.titulo && (
            <p id="blog-titulo-error" className="form-error" role="alert">⚠ {formErrors.titulo}</p>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="blog-descripcion" className="form-label">
            Descripción <span style={{ color: 'var(--color-danger)' }}>*</span>
          </label>
          <textarea
            id="blog-descripcion"
            name="descripcion"
            className={`form-textarea ${formErrors.descripcion ? 'invalid' : ''}`}
            value={form.descripcion}
            onChange={handleFormChange}
            placeholder="Escribe el contenido de la publicación..."
            rows={3}
            aria-describedby="blog-descripcion-error"
          />
          {formErrors.descripcion && (
            <p id="blog-descripcion-error" className="form-error" role="alert">⚠ {formErrors.descripcion}</p>
          )}
        </div>

        <button id="btn-publicar-post" type="submit" className="btn btn-primary">
          <span>📤</span> Publicar
        </button>
      </form>

      {/* Filtros y contador */}
      <div className="blog-toolbar">
        <div className="blog-filters" role="group" aria-label="Filtrar publicaciones">
          <button
            id="btn-filter-todos"
            className={`filter-btn ${filter === 'todos' ? 'filter-btn--active' : ''}`}
            onClick={() => setFilter('todos')}
          >
            Todos <span className="badge badge-accent">{posts.length}</span>
          </button>
          <button
            id="btn-filter-destacados"
            className={`filter-btn ${filter === 'destacados' ? 'filter-btn--active' : ''}`}
            onClick={() => setFilter('destacados')}
          >
            ⭐ Destacados <span className="badge badge-accent">{posts.filter(p => p.destacado).length}</span>
          </button>
        </div>
      </div>

      {/* Lista de posts */}
      {filteredPosts.length === 0 ? (
        <div className="blog-empty">
          <span>📭</span>
          <p>No hay publicaciones {filter === 'destacados' ? 'destacadas' : ''} todavía.</p>
        </div>
      ) : (
        <div className="posts-grid" role="list" aria-label="Lista de publicaciones">
          {filteredPosts.map(post => (
            <PostCard
              key={post.id}
              post={post}
              onDelete={handleDelete}
              onToggleDestacado={handleToggleDestacado}
              onEdit={handleEdit}
            />
          ))}
        </div>
      )}

    </div>
  );
}

export default Blog;
