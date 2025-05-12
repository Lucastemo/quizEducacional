<<<<<<< HEAD
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
=======
const db = require('../config/db');

const usuarioModel = {
    verificarUsuario: async (email) => {
        //Método que verifica o email informado através da 'procedure'
        try {
            const [rows] = await db.execute('CALL buscar_usuario_por_email(?)', [email]);

            if (rows.length === 0) {
                return res.status(404).json({error: 'Usuário não encontrado.'});
            }
            return rows[0];
            
        } catch (error) {
            return res.status(500).json({ error: 'Erro interno ao buscar usuário.'});
        }
    }
};

module.exports = usuarioModel;
>>>>>>> 6e957a0294186e762f6e11c4872f57b491258a3d
