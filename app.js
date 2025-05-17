const express = require('express');
const path = require('path');


const usuarioController = require('./controllers/usuarioController');
const cursoController = require('./controllers/cursoController');


const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// Rotas Usuario
app.post('/api/usuario', usuarioController.cadastrarUsuario);

// Rotas Curso
app.post('/api/curso', cursoController.novoRegistro);

app.put('/api/curso/:id', cursoController.edicaoRegistro);

app.delete('/api/curso/:id', cursoController.excluirRegistro);

// Inicialização Servidor
app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
});