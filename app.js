const express = require('express');
const usuarioController = require('./controllers/usuaioController');

const app = express();
const PORT = 3000;

const path = require('path');

app.use(express.json());


//app.get('/api/usuario', usuarioController.getAllUser);
//app.post('/api/usuario', usuarioController.createNewUser);

app.listen(PORT, () => {
 console.log(`Servidor na porta http://localhost:${PORT}`);
});