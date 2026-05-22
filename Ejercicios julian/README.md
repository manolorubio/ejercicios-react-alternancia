# ReactApp — Ejercicios en Alternancia

> Proyecto de desarrollo web moderno con **React 18 + Vite**, cubriendo los resultados de aprendizaje RA3, RA5, RA6 y RA7.

---

## 📋 Descripción

Aplicación web SPA (Single Page Application) desarrollada con React que integra cinco ejercicios progresivos:

| Ejercicio | Contenido | Tecnología principal |
|-----------|-----------|---------------------|
| 1 | Navegación entre secciones | React Router DOM |
| 2 | Formulario con validación | useState, eventos |
| 3 | Galería de imágenes interactiva | useState, Framer Motion |
| 4 | Sistema de posts dinámicos (Blog) | useState, CRUD |
| 5 | Modo oscuro / claro | CSS Variables + useState |

---

## 🏗️ Arquitectura de la aplicación

```
src/
├── main.jsx              # Punto de entrada — renderiza <App />
├── App.jsx               # Router raíz + estado del tema (dark/light)
├── App.css               # Estilos de layout general
├── index.css             # Variables CSS (tema claro/oscuro), estilos globales
│
├── components/           # Componentes reutilizables
│   ├── Navbar.jsx        # Navegación con NavLink (ruta activa automática)
│   ├── Navbar.css
│   ├── ThemeToggle.jsx   # Botón flotante modo claro/oscuro
│   ├── ThemeToggle.css
│   ├── PostCard.jsx      # Tarjeta individual de post (editar/borrar/destacar)
│   └── PostCard.css
│
├── pages/                # Páginas (una por ruta)
│   ├── Inicio.jsx        # / — Hero, características, tecnologías
│   ├── Inicio.css
│   ├── Servicios.jsx     # /servicios — Galería + Blog
│   ├── Servicios.css
│   ├── Contacto.jsx      # /contacto — Formulario + info de contacto
│   ├── Contacto.css
│   ├── NotFound.jsx      # * — Página 404
│   └── NotFound.css
│
└── features/             # Lógica y UI de cada ejercicio
    ├── ContactForm.jsx   # Ejercicio 2: formulario con validación
    ├── ContactForm.css
    ├── Gallery.jsx       # Ejercicio 3: galería interactiva
    ├── Gallery.css
    ├── Blog.jsx          # Ejercicio 4: sistema de posts
    └── Blog.css
```

---

## 🧭 Sistema de routing (Ejercicio 1)

Se utiliza **React Router DOM v6** con `BrowserRouter`, `Routes` y `Route`:

| Ruta | Componente | Descripción |
|------|-----------|-------------|
| `/` | `<Inicio />` | Pantalla de bienvenida |
| `/servicios` | `<Servicios />` | Galería + Blog |
| `/contacto` | `<Contacto />` | Formulario de contacto |
| `*` | `<NotFound />` | Página 404 |

La navegación usa `<NavLink>` que aplica automáticamente la clase activa **sin recargar la página**.

---

## 📋 Formulario con validación (Ejercicio 2)

Componente: `src/features/ContactForm.jsx`

**Campos:** Nombre, Email, Mensaje

**Validaciones:**
- Campos obligatorios
- Formato de email con regex `/^[^\s@]+@[^\s@]+\.[^\s@]+$/`
- Longitud mínima de mensaje (20 caracteres)

**Eventos gestionados:**
- `onChange` → re-valida en tiempo real si el campo ya fue tocado
- `onBlur` → marca el campo como tocado y muestra error
- `onSubmit` → valida todos los campos antes de enviar

**Indicadores visuales:**
- Borde verde (`valid`) cuando el campo es correcto
- Borde rojo (`invalid`) con mensaje de error cuando es incorrecto
- Icono ✓/✕ dentro del campo

---

## 🖼️ Galería de imágenes (Ejercicio 3)

Componente: `src/features/Gallery.jsx`

- 6 imágenes con miniaturas y una imagen principal
- Clic en miniatura → actualiza imagen principal con `useState`
- Miniatura seleccionada resaltada con borde + overlay ✓
- Animación de transición con **Framer Motion** (`AnimatePresence`)
- Usa props `src`, `alt`, `className`
- Renderizado condicional con `&&` y ternarios

---

## 📝 Blog dinámico (Ejercicio 4)

Componente: `src/features/Blog.jsx` + `src/components/PostCard.jsx`

**Funcionalidades:**
- ✅ Crear nuevos posts (título + descripción)
- ✅ Editar posts en modo inline
- ✅ Eliminar posts
- ✅ Destacar/quitar destaque (⭐)
- ✅ Filtrar por todos / destacados
- ✅ Posts destacados ordenados primero

---

## 🌓 Modo oscuro / claro (Ejercicio 5)

Se definen variables CSS en `src/index.css`:

```css
/* Tema claro (por defecto) */
:root { --color-bg: #f0f2f8; --color-surface: #ffffff; ... }

/* Tema oscuro */
[data-theme="dark"] { --color-bg: #0d0f1a; --color-surface: #161929; ... }
```

El estado `darkMode` en `App.jsx` aplica `document.documentElement.setAttribute('data-theme', 'dark')` sin recargar la página. La preferencia se persiste en `localStorage`.

---

## 🚀 Guía de instalación

### Requisitos previos
- Node.js >= 18
- npm >= 9

### Pasos

```bash
# 1. Clonar el repositorio
git clone https://github.com/tu-usuario/tu-repo.git
cd tu-repo

# 2. Instalar dependencias
npm install

# 3. Iniciar servidor de desarrollo
npm run dev
```

La aplicación estará disponible en `http://localhost:5173`

---

## 📦 Guía de despliegue

### Vercel (automático)

1. Sube el proyecto a GitHub en la rama `main`
2. Ve a [vercel.com](https://vercel.com) → New Project
3. Conecta tu repositorio de GitHub
4. Framework preset: **Vite**
5. Haz clic en **Deploy**

Cada push a `main` despliega automáticamente.

### InfinityFree (FTP manual)

```bash
# 1. Generar build de producción
npm run build
# Los archivos se generan en la carpeta /dist

# 2. Subir /dist al servidor FTP con FileZilla
# Host: ftp.infinityfree.net  |  Carpeta: /htdocs
```

---

## 🌿 Flujo de trabajo con Git

```bash
# Crear rama para un ejercicio
git checkout -b feature/ejercicio1

# Commit descriptivo
git add .
git commit -m "feat: añadir navegación con React Router (Ejercicio 1)"

# Merge a main mediante Pull Request
git checkout main
git merge feature/ejercicio1
```

**Ramas sugeridas:**
- `feature/ejercicio1` — React Router
- `feature/ejercicio2` — Formulario
- `feature/ejercicio3` — Galería
- `feature/ejercicio4` — Blog
- `feature/ejercicio5` — Modo oscuro

---

## 🛠️ Scripts disponibles

| Comando | Descripción |
|---------|-------------|
| `npm run dev` | Servidor de desarrollo con hot reload |
| `npm run build` | Build de producción en `/dist` |
| `npm run preview` | Preview del build de producción |

---

## 📚 Dependencias

| Paquete | Versión | Uso |
|---------|---------|-----|
| react | ^18.x | Framework principal |
| react-dom | ^18.x | Renderizado en el DOM |
| react-router-dom | ^6.x | Ejercicio 1 — Routing |
| framer-motion | ^11.x | Ejercicio 3 — Animaciones |
| vite | ^6.x | Build tool y dev server |

---

## 📄 Documentación de componentes

### `<App />`
- **Estado:** `darkMode: boolean`
- **Responsabilidad:** Configura el router y gestiona el tema global

### `<Navbar />`
- **Estado:** `menuOpen: boolean`
- **Responsabilidad:** Navegación principal con detección de ruta activa

### `<ThemeToggle />`
- **Props:** `darkMode: boolean`, `onToggle: () => void`
- **Responsabilidad:** Botón flotante para cambiar el tema

### `<ContactForm />`
- **Estado:** `values`, `errors`, `touched`, `submitted`, `loading`
- **Responsabilidad:** Formulario con validación completa

### `<Gallery />`
- **Estado:** `selectedImage: object`
- **Responsabilidad:** Galería con imagen principal y miniaturas

### `<Blog />`
- **Estado:** `posts[]`, `form`, `formErrors`, `filter`
- **Responsabilidad:** CRUD de publicaciones

### `<PostCard />`
- **Props:** `post`, `onDelete`, `onToggleDestacado`, `onEdit`
- **Estado:** `isEditing: boolean`, `editValues`
- **Responsabilidad:** Tarjeta individual con modo edición inline

---

*Proyecto desarrollado como parte de los Ejercicios en Alternancia — Módulo de Desarrollo Web en Entorno Cliente.*
