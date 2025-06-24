# Quiz Educacional 🎓✨

Seja bem vindo ao Quiz Educacional! Este é um sistema desenvolvido em Node.js, Express e MySQL pelos alunos do curso técnico de Desenvolvimento de Sistemas da Etec Albert Einstein. Ele permite a criação, gerenciamento e realização de quizzes para fins educacionais.

## Funcionalidades 🛠️

- Cadastro e verificação para autenticação e autorização de usuários 🔐
- Criação e gerenciamento de Cursos, Disciplinas, Questões e Alternativas 📚
- Sistema de perguntas e respostas ❓✅
- Ranking de Jogadores 🏆
- Recuperação de senha via e-mail (opcional) ✉️

## Tecnologias Utilizadas 💻

- Node.js
- Express
- MySQL

## Tutorial de Instalação 📝

Siga os passos abaixo para rodar o projeto localmente:

1. **Clone o repositório**  
    ```bash
    git clone https://github.com/Lucastemo/quizEducacional.git
    ```

2. **Acesse a pasta do projeto**  
    ```bash
    cd quizEducacional
    ```

3. **Instale as dependências**  
    ```bash
    npm install
    ```

4. **Crie o banco de dados MySQL** 🗄️
    - Importe o arquivo `database.sql` para criar as tabelas necessárias.

5. **Configure as variáveis de ambiente** 🔑
    - Crie um arquivo `.env` seguindo o exemplo fornecido em `.env.example`.  
    - No arquivo `.env`, configure as credenciais do banco de dados conforme o seu ambiente.

6. **Configure o secret do JWT** 🕵️‍♂️
    - No arquivo `.env`, defina o valor da variável `JWT_SECRET` com uma chave secreta de sua escolha.

7. **(Opcional) Popule o banco de dados** 📝
    - Importe o arquivo `ds.sql` localizado na pasta `courses` para adicionar dados de exemplo.

8. **(Opcional) Configure as variáveis de recuperação de senha** 📧
    - No arquivo `.env`, preencha as variáveis `EMAIL_APP` e `EMAIL_APP_PASSWORD` para habilitar o envio de e-mails de recuperação de senha.
    - **Dica:** Para configurar o envio de e-mails para recuperação de senha, você irá precisar criar uma senha de app no Google. Veja como fazer isto neste guia oficial: [Como criar e usar senhas de app no Google](https://support.google.com/accounts/answer/185833?hl=pt-BR)

9. **Inicie o servidor**  
    ```bash
    node app.js
    ```

10. **Acesse a aplicação** 🌐
    - Abra o navegador e vá para [http://localhost:3000](http://localhost:3000)

    ## Extra: Conta Administrativa Inicial 👤

    Ao iniciar a aplicação, uma conta de administrador já está disponível para facilitar o acesso inicial ao sistema como administrador:

    - **E-mail:** `adm@email.com`
    - **Senha:** `adm123`

---