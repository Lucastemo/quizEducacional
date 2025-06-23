const questaoModel = require('../models/questaoModel');

const questaoController = {

    cadastrarQuestao: async (req, res) => {
        const { enunciado, dificuldade, id_disciplina } = req.body;

        try {
            if (!enunciado || dificuldade === undefined || !id_disciplina) {
                return res.status(400).json({
                    error: 'Enunciado, dificuldade e id_disciplina são obrigatórios.'
                });
            }

            // Verifica se a dificuldade está entre 1 e 5
            if (dificuldade < 1 || dificuldade > 5) {
                return res.status(400).json({
                    error: 'Dificuldade deve ser um valor entre 1 e 5.'
                });
            }

            const registro = await questaoModel.novoRegistro(enunciado, dificuldade, id_disciplina);

            return res.status(201).json({
                message: 'Questão registrada com sucesso!',
                data: registro
            });

        } catch (error) {
            console.error('Erro ao registrar nova questão: ', error);
            return res.status(500).json({
                error: 'Erro interno ao registrar questão.'
            });
        }
    },

    editarQuestao: async (req, res) => {
        const { id, enunciado, dificuldade } = req.body;

        try {
            if (!id || !enunciado || dificuldade === undefined) {
                return res.status(400).json({
                    error: 'ID, enunciado e dificuldade são obrigatórios.'
                });
            }

            // Verifica se a dificuldade está entre 1 e 5
            if (dificuldade < 1 || dificuldade > 5) {
                return res.status(400).json({
                    error: 'Dificuldade deve ser um valor entre 1 e 5.'
                });
            }

            const editado = await questaoModel.edicaoRegistro(id, enunciado, dificuldade);

            return res.status(200).json({
                message: 'Questão editada com sucesso!',
                data: editado
            });

        } catch (error) {
            console.error('Erro ao editar questão: ', error);
            return res.status(500).json({
                error: 'Erro interno ao editar questão.'
            });
        }
    },

    excluirQuestao: async (req, res) => {
        const { id } = req.params;

        try {
            if (!id) {
                return res.status(400).json({
                    error: 'ID é obrigatório.'
                });
            }

            await questaoModel.excluirRegistro(id);

            return res.status(200).json({
                message: 'Questão excluída com sucesso!'
            });

        } catch (error) {
            console.error('Erro ao excluir questão: ', error);
            return res.status(500).json({
                error: 'Erro interno ao excluir questão.'
            });
        }
    },

    consultarQuestao: async (req, res) => {
        const { id_disciplina } = req.params;

        try {
            if (!id_disciplina) {
                return res.status(400).json({
                    error: 'id_disciplina é obrigatório.'
                });
            }

            const questoes = await questaoModel.consultaPorDisciplina(id_disciplina);

            return res.status(200).json({
                message: 'Questões encontradas com sucesso!',
                data: questoes
            });

        } catch (error) {
            console.error('Erro ao consultar questões por disciplina: ', error);
            return res.status(500).json({
                error: 'Erro interno ao consultar questões.'
            });
        }
    },

    consultarTodasQuestoes: async (req, res) => {
        try {
            const { id_disciplina } = req.params;
            if (!id_disciplina) {
                return res.status(400).json({
                    error: 'id_disciplina é obrigatório.'
                });
            }
            const questoes = await questaoModel.consultarTodasQuestoes(id_disciplina);
            return res.status(200).json({
                message: 'Todas as questões encontradas com sucesso!',
                data: questoes
            });
        } catch (error) {
            console.error('Erro ao consultar todas as questões: ', error);
            return res.status(500).json({
                error: 'Erro interno ao consultar todas as questões.'
            });
        }
    },

    consultarQuestaoPorId: async (req, res) => {
        const { id } = req.params;

        try {
            if (!id) {
                return res.status(400).json({
                    error: 'ID é obrigatório.'
                });
            }

            const questao = await questaoModel.consultaPorId(id);

            if (!questao) {
                return res.status(404).json({
                    error: 'Questão não encontrada.'
                });
            }

            return res.status(200).json({
                message: 'Questão encontrada com sucesso!',
                data: questao
            });
        } catch (error) {
            console.error('Erro ao consultar questão por ID: ', error);
            return res.status(500).json({
                error: 'Erro interno ao consultar questão por ID.'
            });
        }
    }
};

module.exports = questaoController;