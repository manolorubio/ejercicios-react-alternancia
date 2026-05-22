/**
 * PostCard.jsx
 * Ejercicio 4 — Componente individual de post del blog
 *
 * Props:
 *   - post          : { id, titulo, descripcion, destacado, fecha }
 *   - onDelete      : (id) => void
 *   - onToggleDestacado : (id) => void
 *   - onEdit        : (id, { titulo, descripcion }) => void
 *
 * Funcionalidades:
 *   - Vista normal y modo edición (inline)
 *   - Botón de destacar (estrella)
 *   - Botón de eliminar
 *   - Animación de entrada con CSS
 */

import { useState } from 'react';
import './PostCard.css';

/**
 * @param {object}   post
 * @param {function} onDelete
 * @param {function} onToggleDestacado
 * @param {function} onEdit
 */
function PostCard({ post, onDelete, onToggleDestacado, onEdit }) {
  // Estado de modo edición
  const [isEditing, setIsEditing] = useState(false);

  // Estado local del formulario de edición
  const [editValues, setEditValues] = useState({
    titulo: post.titulo,
    descripcion: post.descripcion,
  });

  /**
   * Guarda los cambios de edición.
   */
  const handleSave = () => {
    if (!editValues.titulo.trim() || !editValues.descripcion.trim()) return;
    onEdit(post.id, {
      titulo: editValues.titulo.trim(),
      descripcion: editValues.descripcion.trim(),
    });
    setIsEditing(false);
  };

  /**
   * Cancela la edición y restaura los valores originales.
   */
  const handleCancel = () => {
    setEditValues({ titulo: post.titulo, descripcion: post.descripcion });
    setIsEditing(false);
  };

  return (
    <article
      className={`post-card card ${post.destacado ? 'post-card--destacado' : ''}`}
      role="listitem"
      aria-label={`Post: ${post.titulo}`}
    >
      {/* Indicador de destacado */}
      {post.destacado && (
        <div className="post-destacado-badge" aria-label="Post destacado">
          ⭐ Destacado
        </div>
      )}

      {isEditing ? (
        /* ---- Modo edición ---- */
        <div className="post-edit-form">
          <input
            type="text"
            className="form-input"
            value={editValues.titulo}
            onChange={e => setEditValues(prev => ({ ...prev, titulo: e.target.value }))}
            placeholder="Título"
            aria-label="Editar título"
          />
          <textarea
            className="form-textarea"
            value={editValues.descripcion}
            onChange={e => setEditValues(prev => ({ ...prev, descripcion: e.target.value }))}
            placeholder="Descripción"
            rows={3}
            aria-label="Editar descripción"
          />
          <div className="post-edit-actions">
            <button
              className="btn btn-primary btn-sm"
              onClick={handleSave}
              aria-label="Guardar cambios"
            >
              ✓ Guardar
            </button>
            <button
              className="btn btn-secondary btn-sm"
              onClick={handleCancel}
              aria-label="Cancelar edición"
            >
              ✕ Cancelar
            </button>
          </div>
        </div>
      ) : (
        /* ---- Modo vista ---- */
        <>
          <div className="post-content">
            <h3 className="post-title">{post.titulo}</h3>
            <p className="post-description">{post.descripcion}</p>
            <span className="post-date">📅 {post.fecha}</span>
          </div>

          <div className="post-actions">
            {/* Botón destacar */}
            <button
              className={`action-btn action-btn--star ${post.destacado ? 'action-btn--star-active' : ''}`}
              onClick={() => onToggleDestacado(post.id)}
              aria-label={post.destacado ? 'Quitar destacado' : 'Destacar post'}
              title={post.destacado ? 'Quitar destacado' : 'Destacar'}
            >
              {post.destacado ? '⭐' : '☆'}
            </button>

            {/* Botón editar */}
            <button
              className="action-btn action-btn--edit"
              onClick={() => setIsEditing(true)}
              aria-label="Editar post"
              title="Editar"
            >
              ✏️
            </button>

            {/* Botón eliminar */}
            <button
              className="action-btn action-btn--delete"
              onClick={() => onDelete(post.id)}
              aria-label="Eliminar post"
              title="Eliminar"
            >
              🗑️
            </button>
          </div>
        </>
      )}
    </article>
  );
}

export default PostCard;
