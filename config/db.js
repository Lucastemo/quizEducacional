require('dotenv').config();
const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: process.env.DB_HOST || '127.0.0.1',
  user: process.env.DB_USER || 'root',
  port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 3306,
  password: process.env.DB_PASSWORD || '',
  database: process.env.DB_DATABASE || 'QUIZ',
});

connection.connect((err) => {
 if (err) {
  console.error('Erro de conexão: ' + err.stack);
  return;
 }
 console.log('Conectado como ID ' + connection.threadID);
});

module.exports = connection.promise ();