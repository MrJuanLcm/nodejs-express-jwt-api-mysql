# API de autenticación con JSON Web Token (JWT), usando Node.js, Express

[![Node](https://img.shields.io/badge/Node-v18.14.0-green?style=for-the-badge&logo=node.js&logoColor=white&labelColor=101010)](https://nodejs.org) [![Express](https://img.shields.io/badge/Express-1.20-green?style=for-the-badge&logo=express&logoColor=white&labelColor=101010)](https://expressjs.com) ![jsonwebtoken](https://img.shields.io/badge/jsonwebtoken-^9.0.2-blue?style=for-the-badge&logo=jsonwebtoken&logoColor=white&labelColor=101010) ![joi](https://img.shields.io/badge/joi-^17.13.1-blue?style=for-the-badge&logo=joi&logoColor=white&labelColor=101010) ![mysql2](https://img.shields.io/badge/mysql2-^3.10.0-blue?style=for-the-badge&logo=mysql2&logoColor=white&labelColor=101010)

> ##### Si consideras útil este proyecto, apóyalo haciendo "★ Star" en el repositorio. ¡Gracias!

## Descripción

Este proyecto describe una **API de autenticación** creada con **Node.js** como entorno de ejecución y **Express** como el framework web y APIs en **Node.js** . Su objetivo principal es establecer un sistema seguro y confiable para la autenticación de usuarios en aplicaciones web o móviles. 🚀🔒

## Características Principales

1. Autenticación de Tokens:

   - La API utiliza JSON Web Tokens (JWT) para autenticar a los usuarios.
   - Cuando un usuario inicia sesión correctamente, se genera un token JWT que se utiliza para autorizar las solicitudes posteriores.
   - El token contiene información sobre el usuario (como su ID y usuario) y tiene una fecha de expiración. Esto garantiza que las solicitudes solo sean válidas durante un período específico.

2. Seguridad y Buenas Prácticas:

   - Se recomienda utilizar bibliotecas como bcrypt para el almacenamiento seguro de contraseñas y helmet para proteger contra vulnerabilidades conocidas.

3. Endpoints de Autenticación:

   - La API proporciona endpoints para el registro de usuarios, inicio de sesión y editar usuario.

## Instalación

1. **Clona el repositorio**:

   ```bash
   git clone https://github.com/MrJuanLcm/nodejs-express-jwt-api-mysql.git
   cd nodejs-express-jwt-api
   ```

2. **Instala las dependencias**:

   ```bash
   npm install
   ```

3. **Configura el archivo .env**:

   - Renómbra el archivo `.env.example` a `.env`.
   - Configura las variables de entorno relacionadas con la base de datos (MYSQL_HOST, MYSQL_PORT, MYSQL_USER, MYSQL_PASSWORD, MYSQL_DB_NAME).

4. **Creamos la base de datos**:

   ```bash
   CREATE DATABASE db_local;

   CREATE TABLE IF NOT EXISTS db_local.users (
       id INT AUTO_INCREMENT PRIMARY KEY ,
       username TEXT,
       password TEXT,
       firstName TEXT,
       lastName TEXT,
       email TEXT,
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   )
   ```

   **Nota:** Configura el `.env` Colocando el mismo nombre de la base de dato. Ejemplo: `MYSQL_DB_NAME=db_local`.

## Ejecución

1. **Inicia el servidor de desarrollo**:

   ```bash
   npm run dev
   ```

   - Navega a `http://localhost:3000/` para ver tu aplicación.

## API Referencia

| URL                 | Method | Descripción                     |
| :------------------ | :----- | :------------------------------ |
| `api/auth/signUp`   | `POST` | **Registrar un nuevo usuario**  |
| `api/auth/signIn`   | `POST` | **iniciar sesión**              |
| `api/user/editUser` | `POST` | **Actualizar datos de usuario** |

### Registrar un nuevo usuario

- **URL**: `/api/auth/signUp`
- **Método**: POST
- **Descripción**: Crea un nuevo usuario.
- **Cuerpo de solicitud**:
  ```json
  {
    "username": "username",
    "password": "password",
    "email": "user@exemplo.com",
    "firstName": "First Name",
    "lastName": "Last Name"
  }
  ```
- **Respuesta**:
  - Código de estado 200 OK.
  - Cuerpo de respuesta en formato JSON.

### Iniciar sesión

- **URL**: `/api/auth/signIn`
- **Método**: POST
- **Descripción**: Login.
- **Cuerpo de solicitud**:
  ```json
  {
    "username": "username",
    "password": "password"
  }
  ```
- **Respuesta**:

  - Código de estado 200 OK.
  - Cuerpo de respuesta en formato JSON.

  ### Actualizar datos de usuario

- **URL**: `/api/user/editUser`
- **Método**: POST
- **Authorization**: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyS...
- **Descripción**: Editar usuario.
- **Cuerpo de solicitud**:
  ```json
  {
    "id": 1,
    "username": "newusername",
    "password": "newpassword",
    "email": "exemplo@email.com",
    "firstName": "New First Name",
    "lastName": "New Last Name"
  }
  ```
- **Respuesta**:
  - Código de estado 200 OK.
  - Cuerpo de respuesta en formato JSON.

## Contribuciones

Las contribuciones son bienvenidas. Fork el repositorio y cree una nueva rama para su función o corrección de errores. Una vez que haya realizado los cambios, envíe una solicitud de extracción y se revisarán sus cambios.
