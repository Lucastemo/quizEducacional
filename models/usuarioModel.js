const db = require('../config/db.js') // Inserir diretorio da conexão com o banco de dados

const Usuario =  {


    cadastrarUsuario: async (nome, email, senha) => {  // Inserção dos campos
        try {
            const sql = 'CALL criar_usuario (?, ?, ?)'; // Chamada da procedure
            
            const [result] = await db.query(sql, [nome, email, senha]);  // Armazenamento dos campos
            
            if (result && result.insertId) { // Verificação caso tenha gerado ou não o ID

                return {id: result.insertId, nome, email};
            
            } else {
                throw new Error('Erro ao cadastrar usuário: ID não retornado.'); // Erro para caso não haja ID
            }  
        } catch (error) {
            console.error('Erro ao cadastrar usuário', error);  // catch com erro em algum processo diferente
            throw error;  
        }
    }
    

}