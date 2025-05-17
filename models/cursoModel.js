const db = require('../config/db.js') 

const cursoModel = {
    novoRegisto: async (nome, descricao) => {
        try {
            const sql = 'CALL inserir_curso (?, ?)';
        } catch (error) {
            console.error('Erro ao registrar novo curso', error);
            throw error;
        }
    },
    edicaoRegistro: async (id, nome, descricao) => {
    try {
      if (!id) {
        throw new Error('ID do curso é necessário');
      }
      const sql = 'CALL editar_curso_por_id(?, ?, ?)';

      const [result] = await db.query(sql, [id, nome, descricao]);

      if (result.affectedRows === 0) {
        throw new Error('Curso não encontrado');
      }
      return { id, nome, descricao };
    } catch (error) {
        console.error('Erro ao editar curso ', error)
      throw error;
    }
  },
  excluirRegistro: async(id)=>{
    try {
      if(!id){
        throw new Error("ID  do curso é necessario");
      }

      const sql = 'CALL excluir_curso_por_id(?)'

      const [result] = await db.query(sql, [id]);

      if(result.affectedRows === 0){
        throw new Error("Curso não encontrado!");
      }
      return{message: 'Curso deletado com sucesso!'}

    } catch (error) {
      throw error
    }
    }

};

module.exports = cursoModel;
