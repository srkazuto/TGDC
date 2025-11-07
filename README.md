##  Estructura de archivos temporal ##

!# Proyecto Gestión de Usuarios y Tareas

## Descripción
Este proyecto es una aplicación web full-stack que permite gestionar usuarios y tareas. Incluye funcionalidades de registro, inicio de sesión, creación y visualización de tareas, y un dashboard que muestra información del usuario y sus tareas. El proyecto está construido con **TypeScript**, **Express**, **TypeORM**, **PostgreSQL**, **React**, **Axios** y **TailwindCSS**.

El objetivo es practicar y aplicar conceptos de desarrollo full-stack, manejo de sesiones, CRUD completo, y buenas prácticas en el desarrollo de aplicaciones web.

---

## Tecnologías utilizadas

### Backend
- Node.js + TypeScript
- Express.js
- TypeORM
- PostgreSQL
- bcryptjs (para hashing de contraseñas)
- express-session (para manejo de sesiones)

### Frontend
- React + TypeScript
- Axios (para consumir APIs)
- TailwindCSS (para estilos y responsive)
- Material UI (componentes UI)

---

## Funcionalidades principales

### Usuarios
- Registro de usuarios con validación de correo.
- Inicio de sesión con manejo de sesiones.
- Visualización de todos los usuarios (sin mostrar contraseñas).
- Actualización de usuarios.
- Eliminación de usuarios.
- Persistencia de sesión para que el usuario permanezca logueado al recargar la página.

### Tareas
- Creación de tareas asociadas al usuario logueado.
- Visualización de tareas del usuario.
- Pendiente: eliminación de tareas (puede añadirse como futura funcionalidad).

### Dashboard
- Interfaz para ver tareas y usuario logueado.
- Permite crear nuevas tareas y verlas en tiempo real.

---

## Estructura del proyecto

roject-root/
├─ backend/
│ ├─ controllers/
│ │ ├─ userController.ts
│ │ └─ taskController.ts
│ ├─ models/
│ │ ├─ User.ts
│ │ └─ Task.ts
│ ├─ db/
│ │ └─ data-source.ts
│ ├─ routes/
│ │ ├─ userRoutes.ts
│ │ └─ taskRoutes.ts
│ └─ index.ts
├─ frontend/
│ ├─ src/
│ │ ├─ pages/
│ │ │ ├─ Dashboard.tsx
│ │ │ └─ Login.tsx
│ │ ├─ services/
│ │ │ └─ api.ts
│ │ └─ App.tsx
└─ README.md


---

## Instalación

1. Clonar el repositorio:
```bash
git clone <URL_DEL_REPO>
cd project-root


## instalar dependencias del backend

cd backend
npm install

## configurar bases de datos##
export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "TU_USUARIO",
  password: "TU_PASSWORD",
  database: "nombre_db",
  synchronize: true,
  logging: false,
  entities: [User, Task],
});


"iniciar backend"

npm run dev


Instalar dependencias del frontend:
cd ../frontend
npm install


Uso de la aplicación

Abrir el navegador en http://localhost:5173.

Registrarse con un nuevo usuario.

Iniciar sesión con el usuario creado.

Acceder al dashboard:

Crear nuevas tareas.

Ver las tareas existentes.

Ver información del usuario logueado.

Al recargar la página, la sesión persiste y se mantiene en el dashboard.



API Endpoints
Usuarios
Método	Ruta	Descripción
POST	/api/users/register	Registrar un nuevo usuario
POST	/api/users/login	Iniciar sesión
GET	/api/users	Obtener todos los usuarios
GET	/api/users/:id	Obtener un usuario por ID
PUT	/api/users/:id	Actualizar usuario
DELETE	/api/users/:id	Eliminar usuario
POST	/api/users/logout	Cerrar sesión
Tareas
Método	Ruta	Descripción
POST	/api/tasks	Crear nueva tarea
GET	/api/tasks	Obtener todas las tareas del usuario

