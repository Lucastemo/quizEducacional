const express = require('express');
const path = require('path');

const cursoController = require('./controllers/cursoController');
const usuarioController = require('./controllers/usuarioController');
const questaoController = require('./controllers/questaoController');
const alternativaController = require('./controllers/alternativaController');
const disciplinaController = require('./controllers/disciplinaController');

const app = express();
const PORT = 3000;

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.json());

// ROTAS PARA usuarioController
app.post('/api/usuario', usuarioController.cadastrarUsuario);

// ROTAS PARA cursoController
app.get('/api/curso', cursoController.consultaRegistro);
app.post('/api/curso', cursoController.novoRegistro);
app.put('/api/curso/:id', cursoController.edicaoRegistro);
app.delete('/api/curso/:id', cursoController.excluirRegistro);

// ROTAS PARA disciplinasController
app.get('/api/disciplina/:id_curso', disciplinaController);
app.post('/api/disciplina', disciplinaController);
app.put('/api/disciplina/:id', disciplinaController);
app.delete('/api/disciplinas/:id', disciplinaController);

// ROTAS PARA questaoController
app.get('/api/questao/:id_disciplina', questaoController.consultarQuestao);
app.post('/api/questao', questaoController.cadastrarQuestao);
app.put('/api/questao/:id', questaoController.editarQuestao);
app.delete('/api/questao/:id', questaoController.excluirQuestao);

// ROTAS PARA alternativaController
app.get('/api/alternativa/:id_questao', alternativaController.consultarAlternativa);
app.post('/api/alternativa', alternativaController.cadastrarAlternativa);
app.put('/api/alternativa/:id', alternativaController.editarAlternativa);
app.delete('/api/alternativa/:id', alternativaController.excluirAlternativa);




// Inicialização Servidor
app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
});