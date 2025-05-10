const express = require('express');
const usuarioController = require('./controllers/usuarioController');

const app = express();
const PORT = 3000;

const path = require('path');

app.use(express.json());


//app.get('/api/usuario', usuarioController.getAllUser);
//app.post('/api/usuario', usuarioController.createNewUser);

// Rotas Usuario
app.post('/api/usuario', usuarioController.cadastrarUsuario);

// Rotas Curso
// app.post('/api/curso', cursoController.novoRegistro);

// app.put('/api/curso/:id', cursoController.edicaoRegistro);

// app.delete('/api/curso/:id', cursoController.excluirRegistro);

app.listen(PORT, () => {
 console.log(`Servidor na porta http://localhost:${PORT}`);
});