const db = require ('../config/db');

const questao ={

    createQuestao: async (enuciado, dificuldade, id_disciplina) => {

        try {
            const [result] = await db.execute('CALL, criar_questao (?,?,?)',
            [enuciado, dificuldade, id_disciplina]);
            return {id: result.insertId, enuciado, dificuldade, id_disciplina};
            
        } catch (error) {
            throw(error);
        }
    },

    updateQustao: async () =>{
        
    }
}