const db = require('../config/db');

const Usuario = {
    verificarUsuario: async (email, senha) => {
        try {
            const [rows] = await db.execute('SELECT * FROM usuario WHERE email = ? AND senha = ?', [email, senha]);

            if (rows.length === 0) {
                return ('Usuário não encontrado ou senha incorreta.');
            }
            console.log ('Usuário encontrado.')
            return rows[0];
            
        } catch (error) {
            console.error('Erro ao encontrar usuário. ', error);
            throw error;
        }
    }
};

module.exports = Usuario;