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
                {expiresIn: 7200});

                return res.status(200).json({auth: true, token: token, nome: usuario[0].NOME, tipo: usuario[0].TIPO});

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

    colocarJWTNoHeader(req, res, next) {
        const token = req.cookies.JWT; // Recupera o token JWT do cookie
        if (token) {
          req.headers['x-access-token'] = token; // Adiciona o token ao cabeçalho
        }
        next(); // Passa para o próximo middleware ou rota
      },

    verificarAdmin : async (req, res, next) => {

        ID = req.userId.userId;
        const usuario = await usuarioModel.buscarUsuario(ID);
            if(usuario[0].TIPO === "user"){
                console.log('Usuário não autorizado');
                return res.status(401).json({auth: false, message: 'Usuário não autorizado.'});
            }
         next();
    },

    adicionarPontos: async (req, res) => {
        try {
            const id = req.userId.userId;
            const { pontos } = req.body;

            if (typeof pontos !== 'number') {
                return res.status(400).json({ error: 'O campo pontos deve ser um número.' });
            }

            const usuario = await usuarioModel.buscarUsuario(id);

            if (!usuario || usuario.length === 0) {
                return res.status(404).json({ error: 'Usuário não encontrado.' });
            }

            const pontosAtuais = usuario[0].PONTOS || 0;
            const novosPontos = pontosAtuais + pontos;

            const resultado = await usuarioModel.alterarPontosUsuario(id, novosPontos);

            if (resultado) {
                return res.status(200).json({ message: 'Pontos atualizados com sucesso.', pontos: novosPontos });
            } else {
                return res.status(500).json({ error: 'Erro ao atualizar pontos do usuário.' });
            }
        } catch (error) {
            console.error('Erro ao adicionar pontos:', error);
            return res.status(500).json({ error: 'Erro interno ao adicionar pontos.' });
        }
    },

    buscarRanking: async (req, res) => {
        try {
            const id = req.userId.userId;
            const usuario = await usuarioModel.buscarUsuario(id);

            if (!usuario || usuario.length === 0) {
                return res.status(404).json({ error: 'Usuário não encontrado.' });
            }

            const pontos = usuario[0].PONTOS || 0;

            const usuarioMaiorPontuacao = await usuarioModel.buscarUsuarioMaiorPontuacao();
            const idMaiorPontuacao = usuarioMaiorPontuacao;

            let rankingIds = [];

            if (idMaiorPontuacao === id) {
                const usuariosAbaixo = await usuarioModel.buscarUsuariosAbaixoDePontos(pontos, 10, id);
                rankingIds = [id, ...usuariosAbaixo];
            } else {
                const usuariosAbaixo = await usuarioModel.buscarUsuariosAbaixoDePontos(pontos, 9, id);
                if (usuariosAbaixo.length === 8) {
                    const idAcima = await usuarioModel.buscarUsuariosAcimaDePontos(pontos);
                    rankingIds = [idAcima[0], id, ...usuariosAbaixo];
                } else {
                    const quantidade = 9 - usuariosAbaixo.length;
                    const idsAcima = await usuarioModel.buscarUsuariosAcimaDePontos(pontos, quantidade);
                    idsAcima.reverse();
                    rankingIds = [...idsAcima, id, ...usuariosAbaixo];
                }
            }
            // Retorna o ranking com os IDs
            // Agora busca os dados completos de cada usuário do ranking
            const rankingUsuarios = [];
            for (const userId of rankingIds) {
                const usuarioInfo = await usuarioModel.buscarUsuario(userId);
                if (usuarioInfo && usuarioInfo.length > 0) {
                    const posicao = await usuarioModel.buscarPosicaoDeUsuarioNoRanking(userId);
                    rankingUsuarios.push({
                        nome: usuarioInfo[0].NOME,
                        pontos: usuarioInfo[0].PONTOS,
                        rank: posicao
                    });
                }
            }

            return res.status(200).json({ ranking: rankingIds, rankingUsuarios });
        } catch (error) {
            console.error('Erro ao buscar ranking:', error);
            return res.status(500).json({ error: 'Erro interno ao buscar ranking.' });
        }
    },
}
module.exports = usuarioController;
