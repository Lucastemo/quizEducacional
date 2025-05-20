const db = require('../config/db');

const usuarioModel = {
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
    }
};

module.exports = usuarioModel;