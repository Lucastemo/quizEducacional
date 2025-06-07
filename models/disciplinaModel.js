const db = require('../config/db.js'); 

const disciplinaModel = {

    novoRegistro: async (nome, id_curso) => {
        try {
            const sql = 'CALL inserir_disciplina(?, ?)';
            await db.query(sql, [nome, id_curso]);

            return true;
        } catch (error) {
            console.error('Erro ao criar nova disciplina:', error);
            throw error;
        }
    },

    edicaoRegistro: async (id, nome) => {
        try {
            const sql = 'CALL editar_disciplina_por_id(?, ?)';
            await db.query(sql, [id, nome]);

            return true;
        } catch (error) {
            console.error('Erro ao editar disciplina:', error);
            throw error;
        }
    },

    excluirRegistro: async (id) => {
        try {
            const sql = 'CALL excluir_disciplina_por_id(?)';
            await db.query(sql, [id]);

            return true;
        } catch (error) {
            console.error('Erro ao excluir disciplina:', error);
            throw error;
        }
    },

    consultaPorCurso: async (id_curso) => {
        try {
            const [result] = await db.query('CALL consultar_disciplinas_por_id_curso(?)', [id_curso]);
            return result[0];
        } catch (error) {
            console.error('Erro ao consultar disciplinas por curso:', error);
            throw error;
        }
    }
};

module.exports = disciplinaModel;