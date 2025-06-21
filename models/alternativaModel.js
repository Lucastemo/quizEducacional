const db = require('../config/db');

const alternativaModel = {

    novoRegistro: async (texto, correta, id_questao) => {

        try {
            const sql = 'CALL inserir_alternativa(?,?,?)'
            await db.query(sql,[texto, correta, id_questao]);

            return true;

        } catch (error) {
            console.error('Erro ao inserir alternativa', error);
            throw new Error('Erro ao inserir alternativa')
        }
    },

    edicaoRegistro: async (id, texto, correta) => {
           
        try {

            if (!id){
                throw new Error('Id da alternativa é obrigatório')
            }

            const sql = 'CALL editar_alternativa_por_id(?,?,?)'

            await db.query(sql,[id, texto, correta]);


            return {id, texto, correta};
            
        } catch (error) {
            console.error('Erro ao editar alternativa', error);
            throw new Error('Erro ao editar alternativa')
        }
    },

    excluirRegistro: async (id) => {

        
        try {

            if (!id){
                throw new Error('Id da alternativa é obrigatório')
            }
            const sql = 'CALL excluir_alternativa_por_id(?)'

            await db.query(sql,[id]);  

            return true;

        } catch (error) {
            console.error('Erro ao excluir alternativa', error);
            throw new Error('Erro ao excluir alternativa')
        }
    },

    consultaPorQuestao: async (id_questao) => {
        try {
            if (!id_questao) {
              throw new Error('ID_questao é obrigatório!');
            }
            const sql = 'CALL consultar_alternativa_por_questao(?)'
            const [rows] = await db.query(sql,[id_questao]);
      
            return rows[0]; 

        } catch (error) {
            console.error('Error ao buscar alternativa', error);
           throw error('Error ao buscar alternativa');
         }
       },

    consultaPorId: async (id) => {
        try {
            if (!id) {
                throw new Error('ID é obrigatório!');
            }
            const sql = 'CALL consultar_alternativa_por_id(?)';
            const [rows] = await db.query(sql, [id]);
            return rows[0];
        } catch (error) {
            console.error('Erro ao buscar alternativa por ID', error);
            throw new Error('Erro ao buscar alternativa por ID');
        }
    },

    verificarResposta: async (id)=> {
        try {
            if (!id) {
              throw new Error('ID é obrigatório!');
            }
        const sql = 'CALL verificar_correta_por_id(?)'
        const [rows] = await db.query(sql,[id]);

        return rows[0];

       } catch (error) {
        console.error('Error ao verificar resposta (ID)', error);
        throw error('Error ao verificar resposta (ID)');
        }
    }
}

module.exports = alternativaModel;
