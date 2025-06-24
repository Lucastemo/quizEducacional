const alternativaModel = require('../models/alternativaModel');
const questaoModel = require('../models/questaoModel');

const alternativaController = {

    cadastrarAlternativa: async (req, res) => {
        const { texto, correta, id_questao } = req.body;

        try {
            if (!texto || correta === undefined || !id_questao) {
                return res.status(400).json({
                    error: 'Texto, correta e id_questao são obrigatórios.'
                });
            }

            const registro = await alternativaModel.novoRegistro(texto, correta, id_questao);

            return res.status(201).json({
                message: 'Alternativa registrada com sucesso!',
                data: registro
            });

        } catch (error) {
            console.error('Erro ao registrar nova alternativa: ', error);
            return res.status(500).json({
                error: 'Erro interno ao registrar alternativa.'
            });
        }
    },

    editarAlternativa: async (req, res) => {
        const { id } = req.params;
        const { texto, correta } = req.body;

        try {
            if (!id || !texto || correta === undefined) {
                return res.status(400).json({
                    error: 'ID, texto e correta são obrigatórios.'
                });
            }

            const editado = await alternativaModel.edicaoRegistro(id, texto, correta);

            return res.status(200).json({
                message: 'Alternativa editada com sucesso!',
                data: editado
            });

        } catch (error) {
            console.error('Erro ao editar alternativa: ', error);
            return res.status(500).json({
                error: 'Erro interno ao editar alternativa.'
            });
        }
    },

    excluirAlternativa: async (req, res) => {
        const { id } = req.params;

        try {
            if (!id) {
                return res.status(400).json({
                    error: 'ID é obrigatório.'
                });
            }

            await alternativaModel.excluirRegistro(id);

            return res.status(200).json({
                message: 'Alternativa excluída com sucesso!'
            });

        } catch (error) {
            console.error('Erro ao excluir alternativa: ', error);
            return res.status(500).json({
                error: 'Erro interno ao excluir alternativa.'
            });
        }
    },

    consultarAlternativa: async (req, res) => {
        const { id_questao } = req.params;

        try {
            if (!id_questao) {
                return res.status(400).json({
                    error: 'id_questao é obrigatório.'
                });
            }

            const alternativas = await alternativaModel.consultaPorQuestao(id_questao);

            return res.status(200).json({
                message: 'Alternativas encontradas com sucesso!',
                data: alternativas
            });

        } catch (error) {
            console.error('Erro ao consultar alternativas por questão: ', error);
            return res.status(500).json({
                error: 'Erro interno ao consultar alternativas.'
            });
        }
    },

    verificarRespostas: async (req, res) => {
        const { respostas } = req.body;
        if (!Array.isArray(respostas)) {
            return res.status(400).json({
                error: 'O campo respostas deve ser um array de IDs.'
            });
        }

        const correcao = [];

        try {
            for (const idAlternativa of respostas) {
                const verificacaoResposta = await alternativaModel.verificarResposta(idAlternativa);
                correta = verificacaoResposta[0].CORRETA;
                if (correta === 1) {
                    const alternativaBuscada = await alternativaModel.consultaPorId(idAlternativa);
                    const alternativa = alternativaBuscada[0];
                    if (!alternativa) {
                        correcao.push(0);
                        continue;
                    }
                    const questaoBuscada = await questaoModel.consultaPorId(alternativa.ID_QUESTAO);
                    const questao = questaoBuscada[0];
                    if (!questao || typeof questao.DIFICULDADE !== 'number') {
                        correcao.push(0);
                        continue;
                    }
                    correcao.push(5 * questao.DIFICULDADE);
                } else {
                    correcao.push(0);
                }
            }

            return res.status(200).json({
                message: 'Respostas verificadas com sucesso!',
                correcao
            });
        } catch (error) {
            console.error('Erro ao verificar respostas: ', error);
            return res.status(500).json({
                error: 'Erro interno ao verificar respostas.'
            });
        }
    },

    excluirAlternativasPorQuestao: async (req, res) => {
        const { id_questao } = req.params;

        try {
            if (!id_questao) {
                return res.status(400).json({
                    error: 'id_questao é obrigatório.'
                });
            }

            await alternativaModel.excluirAlternativasPorQuestao(id_questao);

            return res.status(200).json({
                message: 'Alternativas excluídas com sucesso!'
            });
        } catch (error) {
            console.error('Erro ao excluir alternativas por questão: ', error);
            return res.status(500).json({
                error: 'Erro interno ao excluir alternativas por questão.'
            });
        }
    },
};

module.exports = alternativaController;