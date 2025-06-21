const db = require('../config/db.js') // Inserir diretorio da conexão com o banco de dados

const usuarioModel =  {

    cadastrarUsuario: async (nome, email, senha) => { 
        try {
            const sql = 'CALL criar_usuario (?, ?, ?)';
            await db.execute(sql, [nome, email, senha]);
            return true;
        } catch (error) {
            console.error('Erro ao cadastrar usuário', error);  
            throw error;  
        }
    },
    verificarUsuario: async (email) => {
        //Método que verifica o email informado através da 'procedure'
        try {
            const [rows] = await db.execute('CALL buscar_usuario_por_email(?)', [email]);
            if (rows.length === 0) {
                throw new Error('Usuario não encontrado ou atualizado!');
            }
            return rows[0];
            
        } catch (error) {
            console.error('Error ao buscar Usuario', error);
            throw new Error('Error ao buscar Usuario');
        }
    },
    buscarUsuario: async (id) => {
        try {
            const [rows] = await db.execute('CALL buscar_usuario_por_id(?)', [id]);
            return rows[0];
            
        } catch (error) {
            console.error('Error ao buscar Usuario', error);
        }
    },
    alterarPontosUsuario: async (id, pontos) => {
        try {
            await db.execute('CALL alterar_pontos_por_id_usuario(?, ?)', [id, pontos]);
            return true;
        } catch (error) {
            console.error('Erro ao alterar pontos do usuário', error);
            throw error;
        }
    },
    buscarUsuarioMaiorPontuacao: async () => {
        try {
            // Primeiro, chama a procedure para definir a variável de saída
            await db.query('CALL buscar_usuario_maior_pontuacao(@usuario_id)');
            // Depois, faz um SELECT para obter o valor da variável
            const [rows] = await db.query('SELECT @usuario_id as usuario_id');
            const usuarioId = rows[0]?.usuario_id;
            return usuarioId;
        } catch (error) {
            console.error('Erro ao buscar usuário com maior pontuação', error);
            throw error;
        }
    },
    buscarUsuarioAcimaDePontos: async (pontos) => {
        try {
            // Primeiro, chama a procedure para definir a variável de saída
            await db.query('CALL buscar_usuario_acima_da_pontuacao(?, @usuario_id)', [pontos]);
            // Depois, faz um SELECT para obter o valor da variável
            const [rows] = await db.query('SELECT @usuario_id as usuario_id');
            const usuarioId = rows[0]?.usuario_id;
            return usuarioId;
        } catch (error) {
            console.error('Erro ao buscar usuários acima da pontuação', error);
            throw error;
        }
    },
    buscarUsuariosAbaixoDePontos: async (pontos, quantidadeUsuarios, id) => {
        try {
            // Agora a procedure retorna um SELECT com vários ids
            const [resultSets] = await db.query('CALL buscar_usuarios_abaixo_da_pontuacao(?, ?)', [pontos, quantidadeUsuarios]);
            // O resultado do SELECT está em resultSets[0]
            const ids = resultSets[0]
                .map(row => row.id)
                .filter(userId => userId !== id);
            return ids;
        } catch (error) {
            console.error('Erro ao buscar usuários abaixo da pontuação', error);
            throw error;
        }
    },
    buscarPosicaoDeUsuarioNoRanking: async (id) => {
        try {
            const [rows] = await db.execute('CALL buscar_posicao_no_ranking_por_id_usuario(?)', [id]);
            // Supondo que a procedure retorna um SELECT com a posição na primeira linha
            return rows[0][0].posicao;
        } catch (error) {
            console.error('Erro ao buscar posição do usuário no ranking', error);
            throw error;
        }
    },
};

module.exports = usuarioModel;