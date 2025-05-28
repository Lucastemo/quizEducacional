const db = require('../config/db.js') 

const cursoModel = {
    novoRegisto: async (nome, descricao) => {
        try {
            const sql = 'CALL inserir_curso (?, ?)';
            await db.query(sql, [nome, descricao]);

           return true;
        } catch (error) {
            console.error('Erro ao registrar novo curso', error);
            throw error;
        }
    },

    edicaoRegistro: async (id, nome, descricao) => {
    try {

      const sql = 'CALL editar_curso_por_id(?, ?, ?)';
      
      await db.query(sql, [id, nome, descricao]);

      if (result.affectedRows === 0) {
        throw new Error('Curso não encontrado');
      }

      return true

    } catch (error) {
        console.error('Erro ao editar curso ', error)
      throw error;
    }
  },
  
  excluirRegistro: async(id)=>{
    try {
      
      const sql = 'CALL excluir_curso_por_id(?)'

      await db.query(sql, [id]);

      if(result.affectedRows === 0){
        throw new Error("Curso não encontrado!");
      }

    } catch (error) {
      throw error
    }
  
    },

    consultaRegistro: async (req, res) => {
            //Método que verifica o email informado através da 'procedure'
            try {
              const sql = 'CALL consultar_cursos';

              await db.execute(sql);
                if (result.length === 0) {
                    return res.status(404).json({error: 'Curso não encontrado.'});
                }
                return result[0];
                
            } catch (error) {
                return res.status(500).json({ error: 'Erro interno ao buscar curso.'});
            }
        }

};

module.exports = cursoModel;