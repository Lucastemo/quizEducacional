const db = require('../config/db.js') // Inserir diretorio da conexão com o banco de dados

const usuarioModel =  {


    cadastrarUsuario: async (nome, email, senha) => { 
        try {
            const sql = 'CALL criar_usuario (?, ?, ?)';
            
                return true;
            
        } catch (error) {
            console.error('Erro ao cadastrar usuário', error);  
            return res.status(500).json({ error: "Erro ao cadastrar usuário" });
            throw error;  
        }
    },
    

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