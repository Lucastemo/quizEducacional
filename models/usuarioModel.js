<<<<<<< HEAD
<<<<<<< HEAD
const db = require('../config/db.js') 
=======
const db = require('../config/db.js') // Inserir diretorio da conexão com o banco de dados
>>>>>>> b05343def937da797232b7ef06de2de953efc041

const usuarioModel =  {


    cadastrarUsuario: async (nome, email, senha) => { 
        try {
<<<<<<< HEAD
            const sql = 'CALL criar_usuario (?, ?, ?)'; 
            
            const [result] = await db.query(sql, [nome, email, senha]);
            
            if (result && result.insertId) { 
=======
            const sql = 'CALL criar_usuario (?, ?, ?)';
            
            const [result] = await db.query(sql, [nome, email, senha]); 
            
            if (result && result.insertId) {
>>>>>>> b05343def937da797232b7ef06de2de953efc041

                return {id: result.insertId, nome, email};
            
            } else {
<<<<<<< HEAD
                throw new Error('Erro ao cadastrar usuário: ID não retornado.'); 
=======
                throw new Error('Erro ao cadastrar usuário: ID não retornado.');
>>>>>>> b05343def937da797232b7ef06de2de953efc041
            }  
        } catch (error) {
            console.error('Erro ao cadastrar usuário', error);  
            throw error;  
        }
    },
    

<<<<<<< HEAD
}
=======
const db = require('../config/db');

const usuarioModel = {
=======
>>>>>>> b05343def937da797232b7ef06de2de953efc041
    verificarUsuario: async (email) => {
        //Método que verifica o email informado através da 'procedure'
        try {
            const [rows] = await db.execute('CALL buscar_usuario_por_email(?)', [email]);
            if (rows.length === 0) {
                throw new Error('Usuario não encontrado ou atualizado!');
            }
            return rows[0];
            
        } catch (error) {
            console.error('Error ao buscar Usuario', error)
            throw new Error('Error ao buscar Usuario');
        }
    },

    cadastrarUsuario: async (nome, email, senha) => { 
        try {
            const sql = 'CALL criar_usuario (?, ?, ?)';
            
            const [result] = await db.query(sql, [nome, email, senha]); 
            
            if (result && result.insertId) { // Verificação caso tenha gerado ou não o ID
                return {id: result.insertId, nome, email};
            
            } else {
                throw new Error('Erro ao cadastrar usuário: ID não retornado.');
            }  
        } catch (error) {
            console.error('Erro ao cadastrar usuário', error);  
            throw error;  
        }
    }
    
};

<<<<<<< HEAD
module.exports = usuarioModel;
>>>>>>> 6e957a0294186e762f6e11c4872f57b491258a3d
=======
module.exports = usuarioModel;
>>>>>>> b05343def937da797232b7ef06de2de953efc041
