--------------------------- SCRIPT DAS QUESTÔES DO CURSO - DESENVOLVIMENTO DE SISTEMAS ---------------------------

USE QUIZ;

-- ID do curso: 1
CALL inserir_curso(
    'Desenvolvimento de Sistemas', 
    'Curso focado em lógica, programação e desenvolvimento de software.'
);

-- ID: 1
CALL inserir_disciplina(
    'Programação e Algoritmos',
    1 
);

-- ID: 2
CALL inserir_disciplina(
    'Programação Web',
    1 
);

-- ID: 3
CALL inserir_disciplina(
    'Desenvolvimento de Sistemas',
    1 
);

-- ID: 4
CALL inserir_disciplina(
    'Banco de Dados',
    1 
);

-- ID: 5
CALL inserir_disciplina(
    'Mobile',
    1 
);

-- ID: 6
CALL inserir_disciplina(
    'Sistemas Embarcados',
    1 
);

-- ID: 7
CALL inserir_disciplina(
    'Fundamentos da Informática',
    1 
);

-- ID: 8
CALL inserir_disciplina(
    'Inglês Instrumental',
    1 
);

-- ID: 9
CALL inserir_disciplina(
    'Ética e Ciadadania Organizacional',
    1 
);

-- ID: 10
CALL inserir_disciplina(
    'Design Digital',
    1 
);

-- ID: 11
CALL inserir_disciplina(
    'LTT',
    1 
);

-- ID: 12
CALL inserir_disciplina(
    'APS',
    1 
);

-- ID: 13
CALL inserir_disciplina(
    'OSA',
    1 
);



------------------------------------ Questões de Programação e Algorítmos ------------------------------------

-- Questão 1
CALL inserir_questao(
    'Qual das opções abaixo melhor define o conceito de um algoritmo?',
    2, -- ID da dificuldade (médio)
    1 -- ID da disciplina 
);

CALL inserir_alternativa('Um programa que executa operações matemáticas de forma automática.', false, 1);
CALL inserir_alternativa('Um conjunto finito de passos lógicos organizados para resolver um problema.', true, 1);
CALL inserir_alternativa('Uma linguagem de programação utilizada para escrever programas.', false, 1);
CALL inserir_alternativa('Um método de depuração utilizado para identificar erros em um código.', false, 1);

-- Questão 2
CALL inserir_questao(
    'Em um algoritmo, qual é a principal função de um operador lógico?',
    2, -- ID da dificuldade (médio)
    1
);

CALL inserir_alternativa('Executar cálculos matemáticos envolvendo múltiplos valores.', false, 2);
CALL inserir_alternativa('Comparar dois valores para determinar qual é o maior.', false, 2);
CALL inserir_alternativa('Avaliar condições compostas, retornando verdadeiro ou falso.', true, 2);
CALL inserir_alternativa('Definir o tipo de variável que será utilizada no programa.', false, 2);


-- Questão 3
CALL inserir_questao(
    'Qual é o principal motivo para utilizar tratamento de erros e exceções em um programa?',
    3, -- ID da dificuldade (avançado)
    1 
);

CALL inserir_alternativa('Garantir que todas as funções sejam executadas, mesmo que ocorram erros.', false, 3);
CALL inserir_alternativa('Prevenir que o programa seja finalizado inesperadamente ao lidar com situações imprevistas.', true, 3);
CALL inserir_alternativa('Aumentar o desempenho do código, eliminando falhas de sintaxe.', false, 3);
CALL inserir_alternativa('Identificar todas as variáveis não utilizadas em tempo de execução.', false, 3);


-- Questão 4
CALL inserir_questao(
    'Durante a execução de um algoritmo estruturado, você decide implementar laços de repetição com condições de parada. Qual dos cenários abaixo exemplifica melhor o uso desse tipo de laço?',
    3,
    1
);

CALL inserir_alternativa('Um contador que imprime números de 1 a 100 sem interrupção.', false, 4);
CALL inserir_alternativa('Um programa que lê números de um usuário até que um valor negativo seja inserido.', true, 4);
CALL inserir_alternativa('Um cálculo matemático baseado em operadores aritméticos e relacionais.', false, 4);
CALL inserir_alternativa('Uma validação de entrada em que todos os números digitados devem ser pares.', false, 4);


-- Questão 5
CALL inserir_questao(
    'Em um programa estruturado, por que o uso de funções recursivas pode ser vantajoso em relação a laços de repetição tradicionais?',
    3,
    1
);

CALL inserir_alternativa('Funções recursivas são sempre mais rápidas do que laços de repetição.', false, 5);
CALL inserir_alternativa('Permitem resolver problemas complexos, como fatoriais e Fibonacci, de forma mais natural e organizada.', true, 5);
CALL inserir_alternativa('Eliminam a necessidade de variáveis locais no código.', false, 5);
CALL inserir_alternativa('São mais fáceis de implementar em qualquer tipo de linguagem de programação.', false, 5);


------------------------------------ Questões de Programação Web ------------------------------------
-- Questão 1 
CALL inserir_questao(
    'Qual é o elemento raiz de um documento HTML?',
    1, -- ID da dificuldade (fácil)
    2  -- ID da disciplina (Programação Web)
);

CALL inserir_alternativa('<body>', false, 6);
CALL inserir_alternativa('<header>', false, 6);
CALL inserir_alternativa('<html>', true, 6);
CALL inserir_alternativa('<section>', false, 6);


-- Questão 2
CALL inserir_questao(
    'Qual é a finalidade da tag <meta charset="UTF-8"> no cabeçalho de um documento HTML?',
    2, -- ID da dificuldade (médio)
    2
);

CALL inserir_alternativa('Definir o tipo de conteúdo da página.', false, 7);
CALL inserir_alternativa('Definir o formato de codificação de caracteres utilizado.', true, 7);
CALL inserir_alternativa('Adicionar um título à página.', false, 7);
CALL inserir_alternativa('Definir o idioma da página.', false, 7);


-- Questão 3 
CALL inserir_questao(
    'No contexto do HTML, qual é a principal diferença entre as tags <script> e <noscript>?',
    3,
    2
);

CALL inserir_alternativa('<script> é usada para incluir scripts JavaScript, enquanto <noscript> é usada para incluir conteúdos alternativos quando o JavaScript está desabilitado no navegador.', true, 8);
CALL inserir_alternativa('Ambas são usadas para inserir códigos CSS.', false, 8);
CALL inserir_alternativa('<noscript> é usada para scripts JavaScript, e <script> é para códigos CSS.', false, 8);
CALL inserir_alternativa('Não existe diferença, são usadas para os mesmos propósitos.', false, 8);


-- Questão 4 
CALL inserir_questao(
    'Em um documento HTML, a tag <html> deve conter qual dos seguintes elementos obrigatórios dentro de seu conteúdo?',
    1,
    2
);

CALL inserir_alternativa('Somente a tag <header>.', false, 9);
CALL inserir_alternativa('A tag <body> e <head>.', true, 9);
CALL inserir_alternativa('Somente a tag <head>.', false, 9);
CALL inserir_alternativa('Apenas a tag <footer>.', false, 9);


-- Questão 5 
CALL inserir_questao(
    'O que acontece se você usar um setTimeout para alterar a cor de fundo de um elemento, mas dentro da função de callback você perde o contexto correto da variável que referencia o elemento?',
    3,
    2
);

CALL inserir_alternativa('O código irá funcionar normalmente, pois o contexto é preservado dentro de setTimeout.', false, 10);
CALL inserir_alternativa('O setTimeout causará um erro, porque o contexto não pode ser acessado corretamente.', true, 10);
CALL inserir_alternativa('A cor de fundo será alterada para a cor correta, mas o elemento não será encontrado dentro do setTimeout.', false, 10);
CALL inserir_alternativa('O setTimeout ignorará a alteração de cor, mas não causará nenhum erro.', false, 10);

