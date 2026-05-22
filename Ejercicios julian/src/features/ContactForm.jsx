/**
 * ContactForm.jsx
 * Ejercicio 2 — Formulario con validación en React
 *
 * Gestión con useState de:
 *   - values: valores de los campos
 *   - errors: mensajes de error por campo
 *   - touched: si el campo ha sido tocado (onBlur)
 *   - submitted: si el formulario fue enviado con éxito
 *
 * Eventos manejados: onChange, onBlur, onSubmit
 * Validaciones: campos obligatorios, formato email, longitud mínima de mensaje (20 chars)
 */

import { useState } from 'react';
import './ContactForm.css';

// ---- Funciones de validación ----

/**
 * Valida un campo individual.
 * @param {string} name  - Nombre del campo
 * @param {string} value - Valor actual
 * @returns {string} Mensaje de error o cadena vacía si es válido
 */
function validateField(name, value) {
  const trimmed = value.trim();

  if (name === 'nombre') {
    if (!trimmed) return 'El nombre es obligatorio.';
    if (trimmed.length < 2) return 'El nombre debe tener al menos 2 caracteres.';
  }

  if (name === 'email') {
    if (!trimmed) return 'El email es obligatorio.';
    // Regex de validación de formato email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(trimmed)) return 'Introduce un email con formato válido.';
  }

  if (name === 'mensaje') {
    if (!trimmed) return 'El mensaje es obligatorio.';
    if (trimmed.length < 20) return `Mínimo 20 caracteres. Llevas ${trimmed.length}.`;
  }

  return ''; // Sin error
}

/**
 * Valida todos los campos del formulario.
 * @param {object} values - Objeto con todos los valores
 * @returns {object} Objeto con errores por campo
 */
function validateAll(values) {
  return {
    nombre:  validateField('nombre',  values.nombre),
    email:   validateField('email',   values.email),
    mensaje: validateField('mensaje', values.mensaje),
  };
}

// ---- Componente ----
function ContactForm() {
  // Estado de los valores del formulario
  const [values, setValues] = useState({ nombre: '', email: '', mensaje: '' });

  // Estado de errores por campo
  const [errors, setErrors] = useState({ nombre: '', email: '', mensaje: '' });

  // Estado de campos "tocados" (para mostrar errores solo tras onBlur)
  const [touched, setTouched] = useState({ nombre: false, email: false, mensaje: false });

  // Estado de envío exitoso
  const [submitted, setSubmitted] = useState(false);

  // Estado de carga simulada
  const [loading, setLoading] = useState(false);

  /**
   * onChange: actualiza el valor y re-valida el campo en tiempo real si ya fue tocado.
   */
  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues(prev => ({ ...prev, [name]: value }));

    // Validar en tiempo real solo si el campo ya fue tocado
    if (touched[name]) {
      setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
    }
  };

  /**
   * onBlur: marca el campo como tocado y muestra su error si existe.
   */
  const handleBlur = (e) => {
    const { name, value } = e.target;
    setTouched(prev => ({ ...prev, [name]: true }));
    setErrors(prev => ({ ...prev, [name]: validateField(name, value) }));
  };

  /**
   * onSubmit: valida todos los campos. Si son válidos, simula el envío.
   */
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Marcar todos como tocados para mostrar todos los errores
    setTouched({ nombre: true, email: true, mensaje: true });

    const allErrors = validateAll(values);
    setErrors(allErrors);

    // Si hay algún error, no enviamos
    const hasErrors = Object.values(allErrors).some(err => err !== '');
    if (hasErrors) return;

    // Simular llamada a API (500ms)
    setLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setLoading(false);
    setSubmitted(true);
  };

  /**
   * Resetea el formulario para enviar otro mensaje.
   */
  const handleReset = () => {
    setValues({ nombre: '', email: '', mensaje: '' });
    setErrors({ nombre: '', email: '', mensaje: '' });
    setTouched({ nombre: false, email: false, mensaje: false });
    setSubmitted(false);
  };

  // Determina el className del input (valid/invalid)
  const fieldClass = (name) => {
    if (!touched[name]) return 'form-input';
    return `form-input ${errors[name] ? 'invalid' : 'valid'}`;
  };

  const textareaClass = () => {
    if (!touched.mensaje) return 'form-textarea';
    return `form-textarea ${errors.mensaje ? 'invalid' : 'valid'}`;
  };

  // ---- Vista de éxito ----
  if (submitted) {
    return (
      <div className="form-success" role="alert" aria-live="polite">
        <div className="success-icon">✅</div>
        <h3>¡Mensaje enviado!</h3>
        <p>Gracias por contactarnos. Te responderemos pronto.</p>
        <button className="btn btn-primary" onClick={handleReset} id="btn-nuevo-mensaje">
          ✉️ Enviar otro mensaje
        </button>
      </div>
    );
  }

  return (
    <form
      className="contact-form"
      onSubmit={handleSubmit}
      noValidate
      aria-label="Formulario de contacto"
    >
      <h2 className="form-title">Envíanos un mensaje</h2>

      {/* Campo Nombre */}
      <div className="form-group">
        <label htmlFor="nombre" className="form-label">
          Nombre <span className="required">*</span>
        </label>
        <div className="input-wrapper">
          <input
            id="nombre"
            type="text"
            name="nombre"
            className={fieldClass('nombre')}
            value={values.nombre}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Tu nombre completo"
            autoComplete="name"
            aria-required="true"
            aria-invalid={touched.nombre && !!errors.nombre}
            aria-describedby="nombre-error"
          />
          {/* Indicador visual de validez */}
          {touched.nombre && (
            <span className={`field-indicator ${errors.nombre ? 'field-indicator--error' : 'field-indicator--ok'}`}>
              {errors.nombre ? '✕' : '✓'}
            </span>
          )}
        </div>
        {touched.nombre && errors.nombre && (
          <p id="nombre-error" className="form-error" role="alert">
            ⚠ {errors.nombre}
          </p>
        )}
      </div>

      {/* Campo Email */}
      <div className="form-group">
        <label htmlFor="email" className="form-label">
          Email <span className="required">*</span>
        </label>
        <div className="input-wrapper">
          <input
            id="email"
            type="email"
            name="email"
            className={fieldClass('email')}
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="tu@email.com"
            autoComplete="email"
            aria-required="true"
            aria-invalid={touched.email && !!errors.email}
            aria-describedby="email-error"
          />
          {touched.email && (
            <span className={`field-indicator ${errors.email ? 'field-indicator--error' : 'field-indicator--ok'}`}>
              {errors.email ? '✕' : '✓'}
            </span>
          )}
        </div>
        {touched.email && errors.email && (
          <p id="email-error" className="form-error" role="alert">
            ⚠ {errors.email}
          </p>
        )}
      </div>

      {/* Campo Mensaje */}
      <div className="form-group">
        <label htmlFor="mensaje" className="form-label">
          Mensaje <span className="required">*</span>
          <span className="char-count">
            {values.mensaje.trim().length} / 20 min.
          </span>
        </label>
        <div className="input-wrapper">
          <textarea
            id="mensaje"
            name="mensaje"
            className={textareaClass()}
            value={values.mensaje}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Escribe tu mensaje aquí (mínimo 20 caracteres)..."
            rows={5}
            aria-required="true"
            aria-invalid={touched.mensaje && !!errors.mensaje}
            aria-describedby="mensaje-error"
          />
        </div>
        {touched.mensaje && errors.mensaje && (
          <p id="mensaje-error" className="form-error" role="alert">
            ⚠ {errors.mensaje}
          </p>
        )}
      </div>

      {/* Botón de envío */}
      <button
        id="btn-submit-contacto"
        type="submit"
        className="btn btn-primary submit-btn"
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? (
          <><span className="spinner" aria-hidden="true" /> Enviando...</>
        ) : (
          <><span>📨</span> Enviar mensaje</>
        )}
      </button>

      <p className="form-note">
        <span className="required">*</span> Todos los campos son obligatorios.
      </p>
    </form>
  );
}

export default ContactForm;
