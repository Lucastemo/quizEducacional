const db = require('../config/db');

const questaoModel = {
  // Criar nova questão
  novoRegistro: async (enunciado, dificuldade, id_disciplina) => {
    try {

      const sql = 'CALL inserir_questao(?, ?, ?)'
      await db.query(sql,[enunciado, dificuldade, id_disciplina]);

      return true;
    } catch (error) {
        console.error('Error ao inserir questão');
        throw new Error('Erro ao inserir questão');
    }
  },

  // Atualizar questão
  edicaoRegistro: async (id, enunciado, dificuldade) => {
    try {
      if (!id) {
        throw new Error('ID da questão é obrigatório!');
      }
      const sql = 'CALL editar_questao_por_id(?, ?, ?)'
      await db.query(sql, [id, enunciado, dificuldade]);


      return {id, enunciado, dificuldade}

    } catch (error) {
        console.error('Error ao editar questão', error)
        throw new Error('Erro ao editar questão');
    }
  },

  // Excluir questão
  excluirRegistro: async (id) => {
    try {
      if (!id){ 
        throw new Error('ID da questão é obrigatório!');
    }
      const sql = 'CALL excluir_questao_por_id(?)'
      await db.query(sql, [id]);
      return true;

    } catch (error) {
       console.error('Error ao excluir questão', error);
       throw new Error('Erro ao excluir questão');
    }

  },

  
  consultaPorDisciplina: async (id_disciplina) => {
    try {
      if (!id_disciplina) {
        throw new Error('ID_disciplina é obrigatório!');
      }
      const sql = 'CALL consultar_questoes_por_disciplina(?)'
      const [rows] = await db.query(sql,[id_disciplina]);

      return rows[0]; 

    } catch (error) {
       console.error('Error ao buscar disciplina', error);
      throw error('Error ao buscar disciplina');
    }
  }
};

module.exports = questaoModel;
