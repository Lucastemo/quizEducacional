const cursoController = require('../controllers/cursoController.js'); // inserir diretorio do model
const cursoModel = require('../models/cursoModel.js');

const cursoController = {

    novoRegistro: async (req, res) => {
        const { nome, descricao } = req.body;

        try {
            // Validação dos campos obrigatórios
            if (!nome || !descricao) {
                return res.status(400).json({
                    error: 'Nome e descricao são obrgatórios.'
                });
            }

            // Chamada para o modelo que registro o curso
            const registro = await cursoModel.novoRegisto(nome, descricao);

            // Verifica se o curso foi registrado com sucesso
            if (registro) {
                return res.status(201).json({
                    message: 'curso registrado com sucesso!'
                });
            } else {
                return res.status(501).json({
                    error: 'Erro ao registrar o curso, tente novamente.'
                });
            }
        } catch (error) {
            console.error('Erro ao registrar novo curso: ', error);
            return res.status(500).json({
                error: 'Erro interno ao registrar curso.'
            });
        }
    },

    edicaoRegistro: async (req, res) => {
        const { id, nome, descricao } = req.body;

        try {
            // Validação dos campos obrigatórios
            if (!nome || !id || !descricao) {
                return res.status(400).json({
                    error: 'Nome, id e descricao são obrigatórios.'
                });
            }

            // Chamada para o modelo que edita o curso

            const edit = await cursoModel.edicaoRegistro(id, nome, descricao);
            // Verifica se a edição foi realizada com sucesso 
            if (edit) {
                return res.status(200).json({
                    message: 'Edicao realizada com sucesso!',
                });
            } else {
                return res.status(501).json({
                    error: 'Erro ao realizar edicao, tente novamente.'
                });
            }
        } catch (error) {
            console.error('Erro ao editar registro: ', error);
            return res.status(500).json({
                error: 'Erro interno ao editar registro.'
            });
        }
    },

    excluirRegistro: async (req, res) => {
        const { id } = req.body;

        try {
            // Validação dos campos obrigatórios
            if (!id) {
                return res.status(400).json({
                    error: 'O id é obrigatório.'
                });
            }

            // Chamada para o modelo que exclui o curso

            const esc = await cursoModel.excluirRegistro(id);
            // Verifica se o registro foi excluido com sucesso
            if (esc) {
                return res.status(200).json({
                    message: 'Exclusão feita com sucesso!',
                });
            } else {
                return res.status(501).json({
                    error: 'Erro a completar a exclusão.'
                });
            }
        } catch (error) {
            console.error('Erro ao excluir registro: ', error);
            return res.status(500).json({
                error: 'Erro interno ao excluir curso.'
            });
        }
    },
    //VERIIY
    consultaRegistro: async (req, res) => {
        try {
            // Caso a gente queira acessar todos os registros
            const registros = await cursoModel.consultarTodosRegistros();  // Atualize o método conforme necessário

            // Verifica se há registros
            if (registros && registros.length > 0) {
                return res.status(200).json({
                    message: 'Registros encontrados com sucesso!',
                    data: registros
                });
            } else {
                return res.status(501).json({
                    error: 'Nenhum registro encontrado.'
                });
            }
        } catch (error) {
            console.error('Erro ao consultar registros: ', error);
            return res.status(500).json({
                error: 'Erro interno ao consultar registros.'
            });
        }
    }



}
module.exports = cursoController;


