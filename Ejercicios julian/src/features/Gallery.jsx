/**
 * Gallery.jsx
 * Ejercicio 3 — Galería de imágenes interactiva
 *
 * - Muestra miniaturas y una imagen principal
 * - Al hacer clic en una miniatura → se convierte en imagen principal (useState)
 * - La miniatura seleccionada queda visualmente resaltada
 * - Animación con Framer Motion en la imagen principal
 * - Usa props: src, alt, className + renderizado condicional (ternarios)
 */

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import './Gallery.css';

// Las tres imágenes generadas con IA + tres de Unsplash (sin cuota)
const IMAGES = [
  {
    id: 1,
    src: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=900&q=80',
    alt: 'Desarrollo web moderno — laptop con código',
    label: 'Desarrollo Web',
  },
  {
    id: 2,
    src: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=900&q=80',
    alt: 'Dashboard de analítica y datos',
    label: 'Analítica',
  },
  {
    id: 3,
    src: 'https://images.unsplash.com/photo-1561736778-92e52a7769ef?w=900&q=80',
    alt: 'Diseño UI/UX en dispositivos',
    label: 'UI/UX Design',
  },
  {
    id: 4,
    src: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=900&q=80',
    alt: 'Circuito electrónico y tecnología',
    label: 'Tecnología',
  },
  {
    id: 5,
    src: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=900&q=80',
    alt: 'Equipo de trabajo colaborativo',
    label: 'Colaboración',
  },
  {
    id: 6,
    src: 'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=900&q=80',
    alt: 'Ciberseguridad y protección digital',
    label: 'Seguridad',
  },
];

/**
 * GalleryImage — Componente para cada miniatura
 * @param {object}   image      - Datos de la imagen
 * @param {boolean}  isSelected - Si está seleccionada actualmente
 * @param {function} onClick    - Handler de clic
 */
function GalleryImage({ image, isSelected, onClick }) {
  return (
    <button
      className={`gallery-thumb ${isSelected ? 'gallery-thumb--selected' : ''}`}
      onClick={() => onClick(image)}
      aria-label={`Ver imagen: ${image.alt}`}
      aria-pressed={isSelected}
      title={image.label}
    >
      <img
        src={image.src}
        alt={image.alt}
        className="thumb-img"
        loading="lazy"
      />
      {/* Renderizado condicional con ternario: muestra overlay si está seleccionada */}
      {isSelected && (
        <div className="thumb-selected-overlay" aria-hidden="true">✓</div>
      )}
      <span className="thumb-label">{image.label}</span>
    </button>
  );
}

function Gallery() {
  // Estado: imagen actualmente seleccionada como principal
  const [selectedImage, setSelectedImage] = useState(IMAGES[0]);

  /**
   * Maneja el clic en una miniatura.
   * Actualiza la imagen principal mediante useState.
   */
  const handleThumbClick = (image) => {
    setSelectedImage(image);
  };

  return (
    <div className="gallery-container">

      {/* Imagen principal con animación Framer Motion */}
      <div className="gallery-main" aria-label="Imagen principal seleccionada">
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedImage.id}
            className="main-image-wrapper"
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.02 }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
          >
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              className="main-img"
            />
            {/* Etiqueta de la imagen principal — renderizado condicional con && */}
            {selectedImage.label && (
              <div className="main-img-label">
                <span className="badge badge-accent">{selectedImage.label}</span>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Grid de miniaturas */}
      <div
        className="gallery-thumbs"
        role="list"
        aria-label="Miniaturas de imágenes"
      >
        {IMAGES.map(image => (
          <div key={image.id} role="listitem">
            <GalleryImage
              image={image}
              isSelected={selectedImage.id === image.id}
              onClick={handleThumbClick}
            />
          </div>
        ))}
      </div>

    </div>
  );
}

export default Gallery;
