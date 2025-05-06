const usuarioModel = require('../models/usuarioModel.js'); // inserir diretorio do model

const usuarioController = {

    cadastrarUsuario: async (req, res) => {
        const { nome, email, senha } = req.body; // Constante que recebe os valores inseridos no front
    
        try {
            // Validação dos campos obrigatórios
            if (!nome || !email || !senha) {  
                return res.status(400).json({
                    error: 'Nome, email e senha são obrigatórios.' 
                });
            }
    
            // Chamada para o modelo que cadastra o usuário
            const cadastro = await useradasModel.ctrarUsuario(nome, email, senha);  
    
            // Verifica se o usuário foi criado com sucesso
            if (cadastro && cadastro.id) {
                return res.status(201).json({
                    message: 'Usuário cadastrado com sucesso!',
                    user: { id: newUser.id, nome, email }  // Retorna os dados do novo usuário sem a senha
                });
            } else {
                return res.status(500).json({
                    error: 'Erro ao cadastrar o usuário, tente novamente.' // catch com erro em algum processo diferente
                });
            }
        } catch (error) {
            console.error('Erro ao criar novo usuário: ', error);
            return res.status(500).json({
                error: 'Erro interno ao criar novo usuário.' 
            });
        }
    }
}
module.exports = usuarioController;


 