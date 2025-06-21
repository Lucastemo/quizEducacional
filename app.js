const express = require('express');
const cookieParser = require('cookie-parser');
const path = require('path');

const cursoController = require('./controllers/cursoController');
const usuarioController = require('./controllers/usuarioController');
const questaoController = require('./controllers/questaoController');
const alternativaController = require('./controllers/alternativaController');
const disciplinaController = require('./controllers/disciplinaController');

const app = express();

const PORT = 3000;

app.use('/css', express.static(path.join(__dirname, 'public', 'css')));
app.use('/javascript', express.static(path.join(__dirname, 'public', 'javascript')));
app.use(express.json());
app.use(cookieParser());

// ROTAS FRONT-END

//------------------------------------------------------------------
// Rota para o index se estiver logado (falta o sistema de IF.)
app.get('/indexLogado', usuarioController.colocarJWTNoHeader, usuarioController.verificarToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'indexLogado.html'));
})
// -----------------------------------------------------------------


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})
// ----------------------------------------------------------------
// Rota provisoria para o Quiz
app.get('/telaQuiz', usuarioController.colocarJWTNoHeader, usuarioController.verificarToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'telaQuiz.html'));
})

app.get('/telaQuiz/:id_disciplina', usuarioController.colocarJWTNoHeader, usuarioController.verificarToken, (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'telaQuiz.html'));
})
//-----------------------------------------------------------------
app.get('/cadastrarUsuario', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'registro.html'));
})

app.get('/loginUsuario', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
})

app.get('/cadastrarCurso', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastrarCurso.html'));
})

app.get('/cadastrarQuestao/:id_curso/:id_disciplina', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'cadastrarQuestoes.html'));
})

app.get('/esqueci', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'esqueci.html'));
})

// ROTAS BACK-END

// Rotas Usuario
app.post('/api/login', usuarioController.validarLogin);
app.post('/api/usuario', usuarioController.cadastrarUsuario);
app.post('/api/usuario/pontos', usuarioController.verificarToken, usuarioController.adicionarPontos);

// ROTAS PARA cursoController
app.get('/api/curso', cursoController.consultaRegistro);
app.post('/api/curso', cursoController.novoRegistro);
app.put('/api/curso/:id', cursoController.edicaoRegistro);
app.delete('/api/curso/:id', cursoController.excluirRegistro);

// ROTAS PARA disciplinasController
app.get('/api/disciplina/:id_curso', disciplinaController.consultaPorCurso);
app.post('/api/disciplina', disciplinaController.novoRegistro);
app.put('/api/disciplina/:id', disciplinaController.edicaoRegistro);
app.delete('/api/disciplina/:id', disciplinaController.excluirRegistro);

// ROTAS PARA questaoController
app.get('/api/questao/:id_disciplina', usuarioController.verificarToken, questaoController.consultarQuestao);
app.post('/api/questao', usuarioController.verificarToken, usuarioController.verificarAdmin ,questaoController.cadastrarQuestao);
app.put('/api/questao', usuarioController.verificarToken, usuarioController.verificarAdmin, questaoController.editarQuestao);
app.delete('/api/questao/:id', usuarioController.verificarToken, usuarioController.verificarAdmin, questaoController.excluirQuestao);

// ROTAS PARA alternativaController
app.get('/api/alternativa/:id_questao', usuarioController.verificarToken, alternativaController.consultarAlternativa);
app.post('/api/alternativa/respostas', usuarioController.verificarToken, alternativaController.verificarRespostas);
app.post('/api/alternativa', usuarioController.verificarToken, usuarioController.verificarAdmin, alternativaController.cadastrarAlternativa);
app.put('/api/alternativa', usuarioController.verificarToken, usuarioController.verificarAdmin, alternativaController.editarAlternativa);
app.delete('/api/alternativa/:id', usuarioController.verificarToken, usuarioController.verificarAdmin, alternativaController.excluirAlternativa);




// Inicialização Servidor
app.listen(PORT, ()=>{
    console.log(`Servidor rodando na porta ${PORT}`);
});