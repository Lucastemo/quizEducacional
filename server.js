
const express = require('express');
const mysql = require('mysql2');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const port = 3000;
const bcrypt = require('bcrypt');
const nodemailer = require('nodemailer');
const { EMAIL_USER, EMAIL_PASS } = require('./senhas_e_privados');

app.use(express.static(path.join(__dirname, 'public')));

const connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: 'aluno',
    database: 'AULA',
    port: 3302
});

connection.connect(err => {
    if (err) {
        console.error('Erro ao conectar ao banco. ', err);
        return;
    }
    console.log('Conectado ao banco de dados!!!');
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Enviar senha temporária
app.post('/recuperarSenha', async (req, res) => {
    const { email } = req.body;
    const senhaTemporaria = generateSenhaTemporaria();

    try {
        const hashedSenha = await bcrypt.hash(senhaTemporaria, 10);
        const sql = 'UPDATE usuario SET senha = ? WHERE email = ?';
        connection.query(sql, [hashedSenha, email], (err, result) => {
            if (err) return res.status(500).send('Erro ao redefinir senha.');
            if (result.affectedRows === 0) return res.status(404).send('Email não encontrado.');

            const transporter = nodemailer.createTransport({
                service: 'gmail',
                auth: {
                    user: EMAIL_USER,
                    pass: EMAIL_PASS
                }
            });

            const mailOptions = {
                from: EMAIL_USER,
                to: email,
                subject: 'Recuperação de Senha',
                text: `Sua nova senha temporária é: ${senhaTemporaria}`
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                    return res.status(500).send('Erro ao enviar e-mail.');
                }
                res.send('Senha temporária enviada para o seu e-mail.');
            });
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Erro no servidor.');
    }
});

// Função para gerar senha forte temporária
function generateSenhaTemporaria() {
    const letrasMaiusculas = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const especiais = '!@#$%&*';
    const numeros = '0123456789';

    let senha = '';
    senha += letrasMaiusculas[Math.floor(Math.random() * letrasMaiusculas.length)];
    senha += especiais[Math.floor(Math.random() * especiais.length)];
    for (let i = 0; i < 6; i++) {
        senha += numeros[Math.floor(Math.random() * numeros.length)];
    }
    return senha.split('').sort(() => 0.5 - Math.random()).join('');
}

// Ranking

// v v v v
//Precisa ser feito no backend
// ^ ^ ^ ^

// app.get('/ranking', (req, res) => {
//     const sql = 'SELECT jogador, pontuacao FROM ranking ORDER BY pontuacao DESC LIMIT 10';
//     connection.query(sql, (err, results) => {
//         if (err) {
//             console.error('Erro ao buscar o ranking: ', err);
//         }
//         res.json(results);
//     });
// });


app.listen(port, () => {
    console.log(`Servidor rodando na porta ${port}`);
});
