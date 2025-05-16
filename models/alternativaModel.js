const db = require ('../config/db');

const alternativaModel = {

    inserirAlternativa: async (texto, correta, id_questao) => {

        try {
            const sql = 'CALL inserir_alternativa(?,?,?)'
            const [rows] = await db.query(sql,[texto, correta, id_questao]);

            if (!rows || rows.length === 0) {
                ('Alternativa não encontrada')
            }

            return true;

        } catch (error) {
            console.error('Erro ao inserir alternativa', error);
            throw new Error('Erro ao inserir alternativa')
        }
    },

    editarAlternativa: async (id, texto, correta) => {

        try {

            if (!id){
                throw new Error('Id da alternativa é obrigatório')
            }

            const sql = 'CALL editar_alternativa_por_id(?,?,?)'
            const [rows] = await db.query(sql,[id, texto, correta,]);

            if (!rows || rows.length === 0) {
                ('Alternativa não encontrada ou já atualizada')
            }


            if (result.affectRows === 0) {
                throw new Error('Alternativa não encontrada')
            }

            return {id, texto, correta};
            
        } catch (error) {
            console.error('Erro ao editar alternativa', error);
            throw new Error('Erro ao editar alternativa')
        }
    },

    excluirAlternativa: async (id) => {
        
        try {

            if (!id){
                throw new Error('Id da alternativa é obrigatório')
            }
            const sql = 'CALL excluir_alternativa_por_id(?)'
            const [rows] = await db.query(sql,[id]);

            if (!rows || rows.length === 0) {
                ('Alternativa não encontrada ou já excluida')
            }
            
            return true;

        } catch (error) {
            console.error('Erro ao ecluir alternativa', error);
            throw new Error('Erro ao excluir alternativa')
        }
    }


}
module.exports = alternativaModel;
