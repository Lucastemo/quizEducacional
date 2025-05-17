const db = require('../config/db.js'); 

const disciplinaModel = {

    novoRegistro: async (nome, id_curso) => {
        try {
            const sql = 'CALL criar_disciplina(?, ?)';
            const [result] = await db.query(sql, [nome, id_curso]);

            if (result && result.affectedRows > 0) {
                return { nome, id_curso };
            } else {
                throw new Error('Erro ao criar disciplina.');
            }
        } catch (error) {
            console.error('Erro ao criar nova disciplina:', error);
            throw error;
        }
    },

    edicaoRegistro: async (id, nome) => {
        try {
            const sql = 'CALL editar_disciplina(?, ?)';
            const [result] = await db.query(sql, [id, nome]);

            if (result && result.affectedRows > 0) {
                return { id, nome };
            } else {
                throw new Error('Erro ao editar disciplina.');
            }
        } catch (error) {
            console.error('Erro ao editar disciplina:', error);
            throw error;
        }
    },

    excluirRegistro: async (id) => {
        try {
            const sql = 'CALL excluir_disciplina(?)';
            const [result] = await db.query(sql, [id]);

            if (result && result.affectedRows > 0) {
                return true;
            } else {
                throw new Error('Disciplina não encontrada ou não excluída.');
            }
        } catch (error) {
            console.error('Erro ao excluir disciplina:', error);
            throw error;
        }
    },

    consultaPorCurso: async (id_curso) => {
        try {
            const [rows] = await db.query('CALL listar_disciplinas_por_curso(?)', [id_curso]);
            return rows[0]; // procedures retornam um array dentro de array
        } catch (error) {
            console.error('Erro ao consultar disciplinas por curso:', error);
            throw error;
        }
    }
};

module.exports = disciplinaModel;
