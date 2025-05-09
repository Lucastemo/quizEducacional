const db = require('../config/db');

const Questao = {
  // Criar nova questão
  createQuestao: async (enunciado, dificuldade, id_disciplina) => {
    try {
      const [rows] = await db.query('CALL inserir_questao(?, ?, ?)',
        [enunciado, dificuldade, id_disciplina]);
        
      return { enunciado, dificuldade, id_disciplina };
    } catch (error) {
      throw error;
    }
  },

  // Atualizar questão
  updateQuestao: async (id, enunciado, dificuldade) => {
    try {
      if (!id) {
        throw new Error('ID da questão é obrigatório!');
      }

      await db.query('CALL editar_questao(?, ?, ?)', [id, enunciado, dificuldade]);

      return { id, enunciado, dificuldade };
    } catch (error) {
      throw error;
    }
  },

  // Excluir questão
  deleteQuestao: async (id) => {
    try {
      if (!id){ 
        throw new Error('ID da questão é obrigatório!');
    }

      await db.query('CALL excluir_questao(?)', [id]);
      return { id };
    } catch (error) {
      throw error;
    }
  },

  
  buscarDisciplina: async (id_disciplina) => {
    try {
      if (!id_disciplina) {
        throw new Error('ID_disciplina é obrigatório!');
      }

      const [rows] = await db.query('CALL buscar_questoes_disciplina(?)',
        [id_disciplina]);

      return rows[0]; 

    } catch (error) {
      throw error;
    }
  }
};

module.exports = Questao;
