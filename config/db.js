const mysql = require('mysql2');

const connection = mysql.createConnection ( {
 host: '127.0.0.1',
 user: 'root',
 port: 3302,
 password: "aluno",
 database: 'QUIZ', 
});

// Conectar ao bano de dados
connection.connect((err) => {
 if (err) {
  console.error('Erro de conexão: ' + err.stack);
  return;
 }
});

module.exports = connection.promise ();