const db = require('../config/db.js') 

const Usuario =  {


    cadastrarUsuario: async (nome, email, senha) => { 
        try {
            const sql = 'CALL criar_usuario (?, ?, ?)'; 
            
            const [result] = await db.query(sql, [nome, email, senha]);
            
            if (result && result.insertId) { 

                return {id: result.insertId, nome, email};
            
            } else {
                throw new Error('Erro ao cadastrar usuário: ID não retornado.'); 
            }  
        } catch (error) {
            console.error('Erro ao cadastrar usuário', error);  
            throw error;  
        }
    }
    

}