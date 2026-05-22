# Memoria Técnica de Entrega — Ejercicios React en Alternancia

Este documento contiene la memoria técnica oficial, la justificación de los resultados de aprendizaje (RA) y los enlaces de entrega para la práctica de React.

---

## 🔗 Datos de Entrega

* **Autor:** Julián / Manolo Rubio
* **Repositorio de GitHub:** [https://github.com/manolorubio/ejercicios-react-alternancia](https://github.com/manolorubio/ejercicios-react-alternancia)
* **Despliegue en Vercel (Producción Automática):** [https://ejercicios-react-alternancia.vercel.app](https://ejercicios-react-alternancia.vercel.app)
* **Despliegue en InfinityFree (Hosting Tradicional):** [http://ejercicios-react-julian.gt.tc](http://ejercicios-react-julian.gt.tc)

---

## 🎯 Resultados de Aprendizaje Cubiertos (RA)

### 1. RA3 — Desarrollo de código en React utilizando componentes funcionales
* **Implementación:** Se ha diseñado la aplicación entera con **React 18** utilizando componentes funcionales en lugar de clases. 
* **Uso de Hooks:**
  * `useState` para control de formularios, estados de galería, sistema CRUD de blogs y alternancia del modo oscuro.
  * `useEffect` para persistencia en `localStorage` y control de ciclo de vida.
* **Componentes Reutilizables:** Creación de componentes modulares como `<Navbar />`, `<ThemeToggle />`, `<PostCard />` y `<ContactForm />`.

### 2. RA5 — Programación basada en eventos y control de flujos de datos
* **Implementación:** Control de eventos de teclado, ratón y de ciclo de vida del formulario:
  * Eventos `onChange` para actualización reactiva en campos de texto.
  * Evento `onBlur` para marcar campos como "tocados" y validar en tiempo real antes de enviar.
  * Evento `onSubmit` para interceptar el envío del formulario mediante `e.preventDefault()` y realizar una validación final.

### 3. RA6 — Enrutamiento y Single Page Applications (SPA)
* **Implementación:** Integración de **React Router DOM v6** como motor de navegación de la SPA:
  * Uso de `<BrowserRouter>`, `<Routes>` y `<Route>`.
  * Navegación instantánea libre de refrescos de página mediante `<NavLink>` en el componente `<Navbar />`.
  * Detección automática de la ruta activa añadiendo dinámicamente estilos CSS mediante la propiedad `isActive`.
  * Gestión de rutas no definidas mediante una página de error personalizada 404 (`<NotFound />`).

### 4. RA7 — Despliegue, optimización y publicación de aplicaciones web
* **Implementación:** 
  * Generación del build optimizado de producción a través del compilador y empaquetador **Vite** mediante `npm run build`.
  * Publicación continua (CI/CD) vinculada al repositorio GitHub a través de **Vercel** con actualizaciones instantáneas tras cada `git push`.
  * Despliegue tradicional en hosting compartido gratuito a través del panel de **InfinityFree** y subida FTP al directorio raíz `htdocs`.

---

## 🛠️ Justificación Técnica de los Ejercicios

### Ejercicio 1 — Navegación de una SPA con React Router DOM
* Se definió un sistema de navegación por rutas amigables (`/`, `/servicios`, `/contacto`).
* Se implementó un Navbar responsive con un menú desplegable (hamburguesa) móvil que maneja su estado abierto/cerrado reactivamente mediante `useState`.
* El estilo activo del Navbar cambia su tonalidad mediante clases CSS dinámicas, mejorando significativamente la UX (Experiencia de Usuario).

### Ejercicio 2 — Formulario con Validación en Tiempo Real
* **Robustez:** El formulario valida campos requeridos, el formato de correo electrónico mediante expresiones regulares y una longitud mínima del mensaje de al menos 20 caracteres para evitar spam.
* **Validación Diferida:** La validación no es agresiva (no muestra errores hasta que el usuario hace clic fuera del campo o intenta enviar).
* **Feedback Visual:** Los inputs cambian a borde verde con icono ✓ si son correctos, o borde rojo con icono ✕ y mensaje aclaratorio en rojo si son incorrectos.

### Ejercicio 3 — Galería Interactiva con Animaciones
* **Props e Inmutabilidad:** Recibe un catálogo de imágenes mediante propiedades (props), separando la lógica de la presentación.
* **Interactividad:** Cuenta con miniaturas que, al ser pulsadas, actualizan mediante `useState` el estado de la imagen principal.
* **Animación Premium:** Se integró la librería **Framer Motion** (`AnimatePresence`) para crear una transición suave de desvanecimiento (*fade-in / fade-out*) cada vez que el usuario cambia de imagen, evitando saltos bruscos en el diseño.

### Ejercicio 4 — Sistema de Posts Dinámicos (Blog CRUD)
* **CRUD Completo:** Permite crear nuevos posts, visualizarlos, borrarlos y editarlos sobre la marcha.
* **Inline Editing:** Permite la edición en la misma tarjeta sin abrir modales molestos, alternando entre el modo lectura y modo edición en caliente.
* **Destacados:** Opción de marcar artículos como favoritos (⭐). El listado aplica una ordenación algorítmica donde los artículos destacados siempre se posicionan en la parte superior y cuentan con un sombreado y borde especial dorado.
* **Filtrado:** Un interruptor permite conmutar la visualización entre "Todos" y "Solo Destacados".

### Ejercicio 5 — Modo Oscuro / Claro con Variables CSS
* **Control Centralizado:** El estado global se almacena en el componente principal `App.jsx`.
* **Variables HSL:** En lugar de cambiar clases CSS elemento a elemento, se cambia un atributo global `data-theme` en la etiqueta HTML. El fichero CSS utiliza variables dinámicas que se re-evalúan instantáneamente.
* **Persistencia:** Almacenamiento en `localStorage` para recordar la preferencia visual del usuario incluso tras cerrar o reiniciar el navegador.

---

## 📂 Estructura de Ficheros

```text
src/
├── main.jsx              # Punto de entrada de React
├── App.jsx               # Enrutador, estado del Modo Oscuro y Layout principal
├── App.css               # Estilos de maquetación general
├── index.css             # Estilos globales y variables de tema (claro/oscuro)
│
├── components/           # Componentes auxiliares reutilizables
│   ├── Navbar.jsx        # Barra de navegación adaptable y reactiva
│   ├── Navbar.css
│   ├── ThemeToggle.jsx   # Botón flotante para alternar de tema
│   ├── ThemeToggle.css
│   ├── PostCard.jsx      # Tarjeta individual con modo lectura/edición CRUD
│   └── PostCard.css
│
├── pages/                # Vistas principales del enrutador
│   ├── Inicio.jsx        # Landing con Hero premium, stack técnico e info del autor
│   ├── Inicio.css
│   ├── Servicios.jsx     # Contenedor de Galería e interactividad del Blog
│   ├── Servicios.css
│   ├── Contacto.jsx      # Contenedor del Formulario e información del centro
│   ├── Contacto.css
│   ├── NotFound.jsx      # Vista 404 personalizada ante rutas inexistentes
│   └── NotFound.css
│
└── features/             # Componentes lógicos de cada ejercicio
    ├── ContactForm.jsx   # Ejercicio 2 (Lógica y UI de validación)
    ├── ContactForm.css
    ├── Gallery.jsx       # Ejercicio 3 (Lógica y UI de la galería interactiva)
    ├── Gallery.css
    ├── Blog.jsx          # Ejercicio 4 (Lógica general del CRUD de posts)
    └── Blog.css
```

---

## 📋 Instrucciones de Entrega y Calificación

El proyecto está preparado para ser revisado por el tribunal o docente. Cumple minuciosamente con todas las buenas prácticas de la industria:
1. **Limpio de Errores:** Sin fallos en consola ni referencias rotas.
2. **Código Semántico:** Utilización de etiquetas HTML5 correctas (`<header>`, `<main>`, `<section>`, `<footer>`).
3. **Responsivo:** Diseño completamente adaptado a móviles, tablets y pantallas de escritorio.
4. **Diseño Premium:** Estética moderna basada en variables cromáticas, bordes redondeados y micro-animaciones en botones y tarjetas.
