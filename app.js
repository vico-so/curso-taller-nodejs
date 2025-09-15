const express = require('express');
const mysql = require('mysql2');
const app = express();
const port = 3000;

// Middleware para parsear JSON en las solicitudes
app.use(express.json());

// Configuración de la conexión a la base de datos MySQL
const db = mysql.createConnection({
  host: 'localhost', // O la IP/nombre de host de tu servidor MySQL
  user: 'root',      // Tu usuario de MySQL
  password: 'mysql.', // Tu contraseña de MySQL
  database: 'mi_database' // El nombre de la base de datos que creaste
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
