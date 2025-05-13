const express = require('express');
const usuarioController = require('./controllers/usuarioController');

const app = express();
const PORT = 3000;

const path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json());

app.post('/api/usuario', usuarioController.cadastrarUsuario);

app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
});