const disciplinaModel = require('../models/disciplinaModel');

const disciplinaController = {

    novoRegistro: async (req, res) => {
        const { nome, id_curso } = req.body;

        try {
            if (!nome || !id_curso) {
                return res.status(400).json({
                    error: 'Nome e id_curso são obrigatórios.'
                });
            }

            const registro = await disciplinaModel.novoRegistro(nome, id_curso);

            return res.status(201).json({
                message: 'Disciplina registrada com sucesso!',
                data: registro
            });

        } catch (error) {
            console.error('Erro ao registrar nova disciplina: ', error);
            return res.status(500).json({
                error: 'Erro interno ao registrar disciplina.'
            });
        }
    },

    edicaoRegistro: async (req, res) => {
        const { nome } = req.body;
        const { id } = req.params;
        try {
            if (!id || !nome) {
                return res.status(400).json({
                    error: 'ID e nome são obrigatórios.'
                });
            }

            const editado = await disciplinaModel.edicaoRegistro(id, nome);

            return res.status(200).json({
                message: 'Disciplina editada com sucesso!',
                data: editado
            });

        } catch (error) {
            console.error('Erro ao editar disciplina: ', error);
            return res.status(500).json({
                error: 'Erro interno ao editar disciplina.'
            });
        }
    },

    excluirRegistro: async (req, res) => {
        const { id } = req.params;

        try {
            if (!id) {
                return res.status(400).json({
                    error: 'ID é obrigatório.'
                });
            }

            await disciplinaModel.excluirRegistro(id);

            return res.status(200).json({
                message: 'Disciplina excluída com sucesso!'
            });

        } catch (error) {
            console.error('Erro ao excluir disciplina: ', error);
            return res.status(500).json({
                error: 'Erro interno ao excluir disciplina.'
            });
        }
    },

    consultaPorCurso: async (req, res) => {
        const { id_curso } = req.params;

        try {

            const disciplinas = await disciplinaModel.consultaPorCurso(id_curso);

            return res.status(200).json({
                message: 'Disciplinas encontradas com sucesso!',
                data: disciplinas
            });

        } catch (error) {
            console.error('Erro ao consultar disciplinas por curso: ', error);
            return res.status(500).json({
                error: 'Erro interno ao consultar disciplinas.'
            });
        }
    }
};

module.exports = disciplinaController;