# Around the U.S. — Proyecto 19 de TripleTen

## Descripción del proyecto

**Around the U.S.** es una aplicación web interactiva que permite a los usuarios compartir lugares mediante tarjetas con imágenes, descubrir los lugares publicados por otros usuarios e interactuar con el contenido a través de la función «Me gusta».

En este proyecto se implementó un sistema completo de registro, inicio de sesión y autorización de usuarios, junto con una API REST propia y una base de datos MongoDB para almacenar y gestionar la información.

El proyecto integra un frontend desarrollado con React y un backend construido con Node.js y Express. Además, se desplegó en un servidor remoto, con dominios configurados para la aplicación web y la API, conexión HTTPS y un sistema de gestión de procesos para mantener el servidor en funcionamiento.

## Aplicación en producción

- **Aplicación web:** https://rocio-around19.duckdns.org
- **API del backend:** https://api-rocio-around19.duckdns.org

La aplicación permite registrarse, iniciar sesión y acceder a las funcionalidades protegidas mediante autenticación con JSON Web Tokens (JWT).

## Funcionalidades

### Registro y autenticación

- Registro de nuevos usuarios mediante correo electrónico y contraseña.
- Cifrado de contraseñas antes de almacenarlas en la base de datos.
- Inicio y cierre de sesión.
- Autenticación mediante tokens JWT con una duración de siete días.
- Protección de rutas y solicitudes que requieren autorización.
- Conservación del acceso durante la navegación y comprobación de la sesión al recargar la aplicación.

### Perfil de usuario

- Visualización de los datos del usuario autenticado.
- Edición del nombre y la descripción del perfil.
- Actualización de la imagen de perfil mediante una URL.
- Obtención de los datos personales desde el backend.

### Tarjetas de lugares

- Visualización de tarjetas obtenidas desde la API.
- Creación de nuevas tarjetas mediante un formulario.
- Eliminación de tarjetas propias con confirmación previa.
- Restricción de permisos para impedir que un usuario elimine tarjetas de otros usuarios.
- Posibilidad de dar y quitar «Me gusta».
- Actualización visual del estado de los «Me gusta».
- Visualización ampliada de las imágenes en ventanas emergentes.

### Validación y manejo de errores

- Validación de formularios en el frontend.
- Validación de los datos recibidos por el backend mediante Celebrate y Joi.
- Manejo centralizado de errores y respuestas HTTP con códigos de estado apropiados.
- Registro de solicitudes y errores mediante Winston.
- Protección de las rutas privadas mediante middleware de autorización.

## Tecnologías utilizadas

### Frontend

- **HTML5:** estructura de la aplicación.
- **CSS3:** estilos, diseño adaptable y presentación visual.
- **JavaScript (ES6+):** lógica e interactividad.
- **React:** construcción de interfaces mediante componentes reutilizables.
- **React Hooks:** gestión del estado, efectos y contexto.
- **React Router:** navegación y control de rutas.
- **Vite:** desarrollo y compilación para producción.
- **Fetch API:** comunicación con el backend mediante solicitudes HTTP.
- **LocalStorage:** almacenamiento del token de autenticación en el navegador.

### Backend

- **Node.js:** entorno de ejecución de JavaScript en el servidor.
- **Express:** creación de la API REST y gestión de rutas y middleware.
- **MongoDB:** base de datos NoSQL para almacenar usuarios y tarjetas.
- **Mongoose:** modelado de datos y comunicación con MongoDB.
- **bcryptjs:** cifrado seguro de contraseñas mediante hashing.
- **JSON Web Token (JWT):** autenticación y autorización de usuarios.
- **Celebrate y Joi:** validación de solicitudes.
- **Winston y Express Winston:** registro de solicitudes y errores.
- **dotenv:** gestión de variables de entorno.
- **CORS:** configuración del acceso a la API desde el frontend.

### Despliegue y herramientas

- **Git y GitHub:** control de versiones y gestión del repositorio.
- **Linux:** entorno del servidor remoto.
- **Nginx:** servidor web y proxy inverso para la API.
- **PM2:** gestión y supervisión del proceso de Node.js.
- **DuckDNS:** configuración de los dominios de la aplicación y de la API.
- **Certbot y Let's Encrypt:** configuración de certificados HTTPS.
- **SSH y SCP:** administración remota y transferencia de archivos.

## Arquitectura del proyecto

El repositorio está organizado en dos directorios principales:

```text
web_project_api_full/
├── frontend/
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── contexts/
│   │   ├── utils/
│   │   └── ...
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
│
├── backend/
│   ├── controllers/
│   ├── middlewares/
│   ├── models/
│   ├── routes/
│   ├── utils/
│   ├── app.js
│   └── package.json
│
├── .gitignore
└── README.md
```


### Frontend

El frontend se encarga de la interfaz, la navegación, los formularios, la gestión de la sesión y la interacción con las tarjetas. Las solicitudes se centralizan en el módulo de API y se envían al backend mediante HTTPS.

### Backend

El backend expone una API REST para gestionar usuarios y tarjetas. Utiliza modelos de Mongoose para interactuar con MongoDB, controladores para procesar las solicitudes y middleware para validar datos, comprobar la autenticación y gestionar errores.

### Seguridad y autorización

- Las contraseñas se almacenan mediante hashing, no como texto plano.
- Las rutas privadas requieren un token JWT válido.
- Los usuarios solo pueden modificar su propio perfil.
- La eliminación de tarjetas está restringida a sus propietarios.
- Las variables de entorno y los secretos de autenticación se mantienen fuera del repositorio.

### Despliegue

La aplicación está desplegada en un servidor remoto. Nginx sirve el frontend y dirige las solicitudes de la API al backend de Express. PM2 supervisa el proceso del servidor y HTTPS protege las comunicaciones.

## Instalación y ejecución en local

### Requisitos previos

- Node.js y npm.
- MongoDB instalado y en ejecución.
- Git.

### 1. Clonar el repositorio

```bash
git clone https://github.com/ruzarate31-sudo/web_project_api_full.git
cd web_project_api_full
```

### 2. Configurar el backend

```bash
cd backend
npm install
```

Configura las variables de entorno necesarias para el entorno local, de acuerdo con la configuración del backend. La base de datos utilizada en desarrollo es `aroundb`.

Para iniciar el servidor:

```bash
npm run start
```

Consulta los scripts disponibles en `backend/package.json` para ejecutar otras tareas de desarrollo.

### 3. Configurar el frontend

En otra terminal:

```bash
cd frontend
npm install
npm run dev
```

Vite iniciará el servidor de desarrollo y mostrará en la terminal la dirección local para abrir la aplicación.

Para generar la compilación de producción:

```bash
npm run build
```

Los archivos optimizados se generan en `frontend/dist/`.


## Aprendizajes del proyecto

Este proyecto permitió profundizar en:

- Desarrollo de aplicaciones con React y componentes reutilizables.
- Gestión de estado y contexto en React.
- Comunicación entre frontend y backend mediante una API REST.
- Creación y protección de rutas con autenticación JWT.
- Modelado de datos y persistencia con MongoDB y Mongoose.
- Validación de solicitudes y manejo centralizado de errores.
- Control de permisos y propiedad de recursos.
- Registro de solicitudes y errores para facilitar el diagnóstico.
- Configuración de dominios, HTTPS, Nginx y PM2.
- Despliegue de una aplicación web full-stack en un servidor remoto.

## Autora

**Rocío Zárate**

Proyecto realizado como parte del programa de Desarrollo Web de TripleTen.

## Proyecto en línea
Podés ver el proyecto publicado en GitHub Pages aquí:

https://github.com/ruzarate31-sudo/web_project_api_full