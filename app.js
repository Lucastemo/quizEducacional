const express = require('express');
const questaoController = require('./controllers/questaoController');
const alternativaController = require('./controllers/alternativaController');

const app = express();
const PORT = 3000;

app.use(express.json());

// ROTAS PARA questaoController
app.get('/api/questao/:id_disciplina', questaoController.consultarQuestao);
app.post('/api/questao', questaoController.cadastrarQuestao);
app.put('/api/questao', questaoController.editarQuestao);
app.delete('/api/questao/:id', questaoController.excluirQuestao);

// ROTAS PARA alternativaController
app.get('/api/alternativa/:id_questao', alternativaController.consultarAlternativa);
app.post('/api/alternativa', alternativaController.cadastrarAlternativa);
app.put('/api/alternativa', alternativaController.editarAlternativa);
app.delete('/api/alternativa/:id', alternativaController.excluirAlternativa);

app.listen(PORT, () => {
 console.log(`Servidor na porta http://localhost:${PORT}`);
});