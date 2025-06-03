const usuarioModel = require('../models/usuarioModel.js'); // inserir diretorio do model
const jwt = require('jsonwebtoken'); 
const SECRET = "palavraSecreta"

const usuarioController = {

    cadastrarUsuario: async (req, res) => {
        const { nome, email, senha } = req.body;

        try {
            // Validação dos campos obrigatórios
            if (!nome || !email || !senha) {
                return res.status(400).json({
                    error: 'Nome, email e senha são obrigatórios.'
                });
            }

            // Chamada para o modelo que cadastra o usuário
            const cadastro = await usuarioModel.cadastrarUsuario(nome, email, senha);

            // Verifica se o usuário foi criado com sucesso
            if (cadastro) {
                return res.status(201).json({
                    message: 'Usuário cadastrado com sucesso!',
                });
            } else {
                return res.status(500).json({
                    error: 'Erro ao cadastrar o usuário, tente novamente.'
                });
            }
        } catch (error) {
            console.error('Erro ao criar novo usuário: ', error);
            return res.status(500).json({
                error: 'Erro interno ao criar novo usuário.'
            });
        }
    },
    validarLogin: async (req, res) => {

        const {email, senha} = req.body;
        const usuario = await usuarioModel.verificarUsuario(email);

        try { 

            //Verifica se a senha digitada bate com a senha cadastrada no banco de dados
            if(senha !== usuario[0].SENHA){
                return res.status(401).json({message: 'E-mail ou senha incorretos.'});
            }
        
            const token = jwt.sign({userId: usuario[0].ID}, SECRET, 
                {expiresIn: 3600});

                return res.status(200).json({auth: true, token});

        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Erro interno no servidor. ' });
        }
        
    },
    
    verificarToken: (req, res, next) => {

        //Busca o token por parâmetro        
        const token = req.headers['x-access-token'];

        if (!token) {
        return res.status(400).json({message: 'Token não fornecido'});
        }
        
        //Verifica o token informado
        jwt.verify(token, SECRET, async function (err, decoded){
            if(err){
                console.log('Token inexistente ou expirado')
                return res.status(401).json({auth: false, message: 'Falha na autenticação do token.'});
            }
    
            req.userId = decoded;
            ID = req.userId.userId;
            
            next()
        });
    },

    verificarAdmin : async (req, res, next) => {
        ID = req.userId.userId;
        const usuario = await usuarioModel.buscarUsuario(ID);
            console.log(usuario);
            console.log("\n-----\n" + usuario[0].TIPO);
            if(usuario[0].TIPO === "user"){
                console.log('Usuário não autorizado');
                return res.status(401).json({auth: false, message: 'Usuário não autorizado.'});
            }
         next();
    }


}
module.exports = usuarioController;
