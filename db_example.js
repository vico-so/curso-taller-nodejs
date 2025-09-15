const mysql = require('mysql2');

// Configuración de la conexión a la base de datos
const connection = mysql.createConnection({
  host: 'localhost', // O la IP/nombre de host de tu servidor MySQL
  user: 'root',      // Tu usuario de MySQL
  password: 'mysql.', // Tu contraseña de MySQL
  database: 'mi_database' // El nombre de la base de datos que creaste
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

