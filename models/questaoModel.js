const db = require('../config/db');

const questaoModel = {
  // Criar nova questão
  inserirQuestao: async (enunciado, dificuldade, id_disciplina) => {
    try {

      const sql = 'CALL inserir_questao(?, ?, ?)'
      const [result] = await db.query(sql,[enunciado, dificuldade, id_disciplina]);

      return true;
    } catch (error) {
        console.error('Error ao inserir questão');
        throw new Error('Erro ao inserir questão');
    }
  },

  // Atualizar questão
  editarQuestao: async (id, enunciado, dificuldade) => {
    try {
      if (!id) {
        throw new Error('ID da questão é obrigatório!');
      }
      const sql = 'CALL editar_questao_por_id(?, ?, ?)'
      const [rows] = await db.query(sql, [id, enunciado, dificuldade]);

      if (rows.affectedRows === 0) {

        throw new Error('Questão não encontrada!');  
      }

      return {id, enunciado, dificuldade}

    } catch (error) {
        console.error('Error ao editar questão', error)
        throw new Error('Erro ao editar questão');
    }
  },

  // Excluir questão
  excluirQuestao: async (id) => {
    try {
      if (!id){ 
        throw new Error('ID da questão é obrigatório!');
    }
      const sql = 'CALL excluir_questao_por_id(?)'
      const [rows] = await db.query(sql, [id]);

      if (rows.affectedRows === 0) {

        throw new Error('Questão não encontrada ou já excluída.');  
      }

      return true;

    } catch (error) {
       console.error('Error ao excluir questão', error);
       throw new Error('Erro ao excluir questão');
    }

  },

  
  buscarQuestoesPorDisciplina: async (id_disciplina) => {
    try {
      if (!id_disciplina) {
        throw new Error('ID_disciplina é obrigatório!');
      }
      const sql = 'CALL consultar_questoes_por_disciplina(?)'
      const [rows] = await db.query(sql,[id_disciplina]);

      return rows; 

    } catch (error) {
       console.error('Error ao buscar disciplina', error);
      throw error('Error ao buscar disciplina');
    }
  }
};

module.exports = questaoModel;
