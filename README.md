# TodoApp - Gestor de Tareas

TodoApp es una aplicación web full-stack para gestión de tareas con autenticación de usuarios, verificación por correo electrónico y una interfaz intuitiva.

## Características principales

✅ **Autenticación segura**:
- Registro con verificación por correo
- Inicio de sesión con JWT
- Protección de rutas con middleware

📋 **Gestión de tareas**:
- Crear, editar y eliminar tareas
- Marcar tareas como completadas
- Visualización organizada

🔐 **Funciones avanzadas**:
- Cookies seguras con httpOnly
- Encriptación de contraseñas con bcrypt
- Reenvío automático de enlaces de verificación

## Tecnologías utilizadas

### Backend
- **Node.js** (Entorno de ejecución)
- **Express** (Framework web)
- **MongoDB** + **Mongoose** (Base de datos)
- **JWT** (Autenticación)
- **Nodemailer** (Envío de correos)
- **Bcrypt** (Encriptación)

### Frontend
- **Tailwind CSS** (Estilos)
- **Axios** (Peticiones HTTP)
- **JavaScript Vanilla** (Interactividad)

## Instalación y configuración

1. Clona el repositorio:
```bash
git clone https://github.com/tu-usuario/todoapp.git
cd todoapp
```

2. Instala las dependencias:
```bash
npm install
```

3. Configura las variables de entorno (.env):
```env
MONGO_URI_DEV=mongodb://localhost:27017/todoapp-dev
MONGO_URI_PROD=mongodb+srv://usuario:contraseña@cluster.mongodb.net/todoapp
ACCESS_TOKEN_SECRET=tu_secreto_jwt
EMAIL_USER=tu_email@gmail.com
EMAIL_PASS=contraseña_email
PAGE_URL=http://localhost:3000
NODE_ENV=development
```

4. Inicia el servidor:
```bash
npm start
```

## Estructura del proyecto

├── controllers/ # Brain of the project, CRUD methods
│   ├── login.js
│   ├── logout.js
│   ├── todos.js
│   └── users.js        
├── img/ # Contains all the project images
│   ├── signup.svg             
├── models/ # Database logic
│   ├── todo.js          
│   └── user.js
├── views/ # Styles & FrontEnd logic
│   ├── components/           
│   │      └── nav.js
│   │      └── notification.js
│   ├── home/           
│   │      └── index.html
│   ├── login/
│   │      └── index.html
│   │      └── index.js
│   ├── signup/           
│   │      └── index.html
│   │      └── index.js
│   ├── styles/           
│   │      └── output.css
│   ├── todos/           
│   │      └── index.html
│   │      └── index.js
│   ├── verify/           
│   │      └── index.html
│   └──    └── index.js
├── .gitignore               
├── app.js
├── config.js
├── index.js
├── package-lock.json
├── package.json
├── config.js
├── README.md
└── tailwind.config.js

## Endpoints API

### Autenticación
- `POST /api/users` - Registrar nuevo usuario
- `POST /api/login` - Iniciar sesión
- `GET /api/logout` - Cerrar sesión
- `PATCH /api/users/:id/:token` - Verificar email

### Tareas
- `GET /api/todos` - Obtener todas las tareas
- `POST /api/todos` - Crear nueva tarea
- `DELETE /api/todos/:id` - Eliminar tarea
- `PATCH /api/todos/:id` - Actualizar estado de tarea

## Contribución

Las contribuciones son bienvenidas. Sigue estos pasos:

1. Haz un fork del proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Realiza tus cambios y haz commit (`git commit -m 'Añade nueva funcionalidad'`)
4. Haz push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## Autores
[Carlos Perez] (Carloseduardo27) [] ()
