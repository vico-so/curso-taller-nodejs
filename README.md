# curso-taller-nodejs

(Ing. Victor Hugo Quispe Chejo)

# Ejemplos Prácticos con Node.js

Este repositorio contiene ejemplos prácticos para empezar a trabajar con Node.js, cubriendo desde la instalación básica hasta la creación de APIs RESTful con conexión a bases de datos MySQL.

La versión de Nodejs utilizada para los ejecicios es v22.19.0.

## Contenido

1.  [Instalación y Verificación](#1-instalación-y-verificación)
2.  [Primeros Códigos en Node.js](#2-primeros-códigos-en-nodejs)
    *   [Hola Mundo](#hola-mundo)
    *   [Servidor Básico](#servidor-básico)
3.  [Ejemplo de Enlace con Base de Datos MySQL](#3-ejemplo-de-enlace-con-base-de-datos-mysql)
4.  [API REST con Node.js, Express y MySQL](#4-api-rest-con-nodejs-express-y-mysql)

---

### 1. Instalación y Verificación

Para empezar, asegúrate de tener Node.js instalado en tu sistema.

**Pasos de Instalación:**

1.  **Descargar Node.js:** Sigue los pasos de la sección 4 del documento original o visita el [sitio web oficial de Node.js](https://nodejs.org/) y descarga el instalador recomendado para tu sistema operativo.
2.  **Verificar la instalación desde la terminal:**
    Abre tu terminal (o Símbolo del Sistema en Windows) y ejecuta los siguientes comandos:

    ```bash
    node -v
    npm -v
    ```

    Si la instalación fue exitosa, verás las versiones de Node.js y npm.

---

### 2. Primeros Códigos en Node.js

#### Hola Mundo

Este ejemplo muestra cómo ejecutar un script básico de JavaScript con Node.js.

1.  Crea un archivo llamado `hola_mundo.js` en una carpeta de tu elección.
2.  Dentro del archivo, escribe el siguiente código:

    ```javascript
    console.log("¡Hola, Mundo desde Node.js!");
    ```

3.  Guarda el archivo.
4.  Abre tu terminal, navega hasta la carpeta donde guardaste el archivo y ejecuta:

    ```bash
    node hola_mundo.js
    ```

    Verás el mensaje "¡Hola, Mundo desde Node.js!" en tu terminal.

#### Servidor Básico

Este ejemplo crea un servidor web HTTP simple con Node.js.

1.  Crea un archivo llamado `servidor_basico.js`.
2.  Pega el siguiente código:

    ```javascript
    const http = require('http');
    const hostname = '127.0.0.1';
    const port = 3000;

    const server = http.createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('¡Hola, soy tu primer servidor Node.js!\n');
    });

    server.listen(port, hostname, () => {
      console.log(`Servidor corriendo en http://${hostname}:${port}/`);
    });
    ```

3.  Guarda el archivo.
4.  En la terminal, ejecuta:

    ```bash
    node servidor_basico.js
    ```

5.  Abre tu navegador y visita [http://127.0.0.1:3000/](http://127.0.0.1:3000/). Verás el mensaje del servidor.

---

### 3. Ejemplo de Enlace con Base de Datos MySQL

Para este ejemplo, necesitarás tener una base de datos MySQL en funcionamiento y el paquete `mysql2` para Node.js.

1.  **Instala el paquete `mysql2`:**
    Abre tu terminal en la carpeta de tu proyecto y ejecuta:

    ```bash
    npm install mysql2
    ```

2.  **Crea una base de datos y una tabla (ejemplo):**
    En tu gestor de MySQL, puedes ejecutar:

    ```sql
    CREATE DATABASE IF NOT EXISTS mi_database;
    USE mi_database;
    CREATE TABLE IF NOT EXISTS usuarios (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(255) NOT NULL,
      email VARCHAR(255) UNIQUE NOT NULL
    );
    INSERT INTO usuarios (nombre, email) VALUES ('Juan Pérez', 'juan.perez@example.com');
    ```

3.  **Crea el archivo `db_example.js`:**

    ```javascript
    const mysql = require('mysql2');

    // Configuración de la conexión a la base de datos
    const connection = mysql.createConnection({
      host: 'localhost',       // O la IP/nombre de host de tu servidor MySQL
      user: 'root',            // Tu usuario de MySQL
      password: 'tu_contraseña', // Tu contraseña de MySQL
      database: 'mi_database'  // El nombre de la base de datos que creaste
    });

    // Conectar a la base de datos
    connection.connect((err) => {
      if (err) {
        console.error('Error al conectar a la base de datos: ' + err.stack);
        return;
      }
      console.log('Conexión exitosa a la base de datos con el ID: ' + connection.threadId);
    });

    // Ejemplo de consulta: Seleccionar todos los usuarios
    connection.query('SELECT * FROM usuarios', (err, results, fields) => {
      if (err) {
        console.error('Error al ejecutar la consulta: ' + err.stack);
        return;
      }
      console.log('Usuarios encontrados:');
      results.forEach(user => {
        console.log(`ID: ${user.id}, Nombre: ${user.nombre}, Email: ${user.email}`);
      });
    });

    // Ejemplo de inserción de un nuevo usuario
    const newUser = { nombre: 'María García', email: 'maria.garcia@example.com' };
    connection.query('INSERT INTO usuarios SET ?', newUser, (err, result) => {
      if (err) {
        console.error('Error al insertar usuario: ' + err.stack);
        return;
      }
      console.log('Usuario insertado con ID: ' + result.insertId);
    });

    // Cerrar la conexión (idealmente después de que todas las operaciones hayan terminado)
    // En una aplicación real, no cerrarías la conexión inmediatamente
    // a menos que sea una script de una sola ejecución.
    // Aquí se cierra para fines del ejemplo.
    connection.end((err) => {
      if (err) {
        console.error('Error al cerrar la conexión: ' + err.stack);
        return;
      }
      console.log('Conexión a la base de datos cerrada.');
    });
    ```

---

### 4. API REST con Node.js, Express y MySQL

Para crear un ejemplo de API REST con Node.js, Express y MySQL, que se conecta a `db_midatabase` y muestra los resultados, sigue estos pasos:

**Requisitos:**

*   Base de datos MySQL en funcionamiento.
*   Paquetes `mysql2` y `express` para Node.js.

**Pasos:**

1.  **Crea una base de datos y una tabla (si no existen):**
    En tu gestor de MySQL, puedes ejecutar (si aún no tienes `db_midatabase` y la tabla `productos`):

    ```sql
    CREATE DATABASE IF NOT EXISTS db_midatabase;
    USE db_midatabase;
    CREATE TABLE IF NOT EXISTS productos (
      id INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(255) NOT NULL,
      precio DECIMAL(10, 2) NOT NULL,
      stock INT NOT NULL DEFAULT 0
    );
    INSERT INTO productos (nombre, precio, stock) VALUES
    ('Laptop', 1200.00, 50),
    ('Teclado Mecánico', 85.50, 120),
    ('Mouse Gamer', 45.99, 200),
    ('Monitor 27 pulgadas', 300.00, 75);
    ```

2.  **Inicializa tu proyecto Node.js e instala los paquetes necesarios:**
    Abre tu terminal en la carpeta de tu proyecto y ejecuta:

    ```bash
    npm init -y
    npm install express mysql2
    ```

3.  **Crea el archivo `app.js` (o `server.js`):**
    Este archivo contendrá la lógica de tu API REST.

    ```javascript
    const express = require('express');
    const mysql = require('mysql2');
    const app = express();
    const port = 3000;

    // Middleware para parsear JSON en las solicitudes
    app.use(express.json());

    // Configuración de la conexión a la base de datos MySQL
    const db = mysql.createConnection({
      host: 'localhost',       // O la IP/nombre de host de tu servidor MySQL
      user: 'root',            // Tu usuario de MySQL
      password: 'tu_contraseña', // ¡Cambia esto por tu contraseña de MySQL!
      database: 'db_midatabase' // El nombre de la base de datos
    });

    // Conectar a la base de datos
    db.connect((err) => {
      if (err) {
        console.error('Error al conectar a la base de datos: ' + err.stack);
        return;
      }
      console.log('Conexión exitosa a la base de datos MySQL con el ID: ' + db.threadId);
    });

    // Ruta para obtener todos los productos
    app.get('/productos', (req, res) => {
      const sql = 'SELECT * FROM productos';
      db.query(sql, (err, results) => {
        if (err) {
          console.error('Error al obtener productos: ' + err.stack);
          return res.status(500).json({ error: 'Error interno del servidor al obtener productos' });
        }
        res.json(results);
      });
    });

    // Ruta para obtener un producto por ID
    app.get('/productos/:id', (req, res) => {
      const { id } = req.params;
      const sql = 'SELECT * FROM productos WHERE id = ?';
      db.query(sql, [id], (err, results) => {
        if (err) {
          console.error('Error al obtener producto por ID: ' + err.stack);
          return res.status(500).json({ error: 'Error interno del servidor al obtener producto' });
        }
        if (results.length === 0) {
          return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json(results);
      });
    });

    // Ruta para agregar un nuevo producto (POST)
    app.post('/productos', (req, res) => {
      const { nombre, precio, stock } = req.body;
      if (!nombre || !precio || !stock) {
        return res.status(400).json({ message: 'Todos los campos (nombre, precio, stock) son requeridos.' });
      }
      const sql = 'INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)';
      db.query(sql, [nombre, precio, stock], (err, result) => {
        if (err) {
          console.error('Error al insertar producto: ' + err.stack);
          return res.status(500).json({ error: 'Error interno del servidor al insertar producto' });
        }
        res.status(201).json({ message: 'Producto agregado exitosamente', id: result.insertId });
      });
    });

    // Ruta para actualizar un producto existente (PUT)
    app.put('/productos/:id', (req, res) => {
      const { id } = req.params;
      const { nombre, precio, stock } = req.body;
      if (!nombre || !precio || !stock) {
        return res.status(400).json({ message: 'Todos los campos (nombre, precio, stock) son requeridos para la actualización.' });
      }
      const sql = 'UPDATE productos SET nombre = ?, precio = ?, stock = ? WHERE id = ?';
      db.query(sql, [nombre, precio, stock, id], (err, result) => {
        if (err) {
          console.error('Error al actualizar producto: ' + err.stack);
          return res.status(500).json({ error: 'Error interno del servidor al actualizar producto' });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Producto no encontrado o no se realizaron cambios' });
        }
        res.json({ message: 'Producto actualizado exitosamente' });
      });
    });

    // Ruta para eliminar un producto (DELETE)
    app.delete('/productos/:id', (req, res) => {
      const { id } = req.params;
      const sql = 'DELETE FROM productos WHERE id = ?';
      db.query(sql, [id], (err, result) => {
        if (err) {
          console.error('Error al eliminar producto: ' + err.stack);
          return res.status(500).json({ error: 'Error interno del servidor al eliminar producto' });
        }
        if (result.affectedRows === 0) {
          return res.status(404).json({ message: 'Producto no encontrado' });
        }
        res.json({ message: 'Producto eliminado exitosamente' });
      });
    });

    // Iniciar el servidor
    app.listen(port, () => {
      console.log(`Servidor API REST corriendo en http://localhost:${port}`);
    });
    ```

4.  **Ejecuta la aplicación Node.js:**
    En tu terminal, navega hasta la carpeta donde guardaste `app.js` y ejecuta:

    ```bash
    node app.js
    ```

    Verás un mensaje en la terminal indicando que el servidor está corriendo y la conexión a la base de datos es exitosa.

5.  **Prueba tu API REST:**
    Puedes usar herramientas como Postman, Insomnia, o incluso tu navegador web para probar los endpoints:

    *   **GET todos los productos:** Abre tu navegador y ve a [http://localhost:3000/productos](http://localhost:3000/productos).
        *   Deberías ver una respuesta JSON con la lista de productos de tu tabla.
    *   **GET un producto por ID:** Abre tu navegador y ve a [http://localhost:3000/productos/1](http://localhost:3000/productos/1) (o el ID de un producto existente).
        *   Deberías ver la información JSON de ese producto específico.
    *   **POST para agregar un producto:**
        Usa Postman/Insomnia con el método `POST` a [http://localhost:3000/productos](http://localhost:3000/productos) y un body de tipo `raw` y `JSON` como este:

        ```json
        {
          "nombre": "Auriculares Bluetooth",
          "precio": 65.00,
          "stock": 150
        }
        ```

    *   **PUT para actualizar un producto:**
        Usa Postman/Insomnia con el método `PUT` a [http://localhost:3000/productos/ID_DEL_PRODUCTO](http://localhost:3000/productos/ID_DEL_PRODUCTO) (ej. [http://localhost:3000/productos/1](http://localhost:3000/productos/1)) y un body de tipo `raw` y `JSON` como este:

        ```json
        {
          "nombre": "Auriculares Inalámbricos",
          "precio": 70.00,
          "stock": 140
        }
        ```

    *   **DELETE para eliminar un producto:**
        Usa Postman/Insomnia con el método `DELETE` a [http://localhost:3000/productos/ID_DEL_PRODUCTO](http://localhost:3000/productos/ID_DEL_PRODUCTO) (ej. [http://localhost:3000/productos/1](http://localhost:3000/productos/1)).
        *   Deberías recibir un mensaje de confirmación de eliminación.

````
