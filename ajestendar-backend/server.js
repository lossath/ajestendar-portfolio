const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

// Middleware para permitir requisições de outras origens e para processar JSON
app.use(cors());
app.use(express.json());

// Configuração do Nodemailer com suas credenciais do Gmail
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'contatogu2tech@gmail.com', // Substitua pelo seu email do Gmail
        pass: 'txujswbtbzhuludd'       // Substitua pela senha de app que você gerou
    }
});

// Rota para o envio do email
app.post('/send-email', (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: 'contatogu2tech@gmail.com',       // Seu email
        to: 'contatogu2tech@gmail.com',         // Para onde a mensagem será enviada
        subject: `Nova mensagem de contato de ${name}`,
        text: `Nome: ${name}\nEmail: ${email}\n\nMensagem:\n${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            res.status(500).json({ success: false, message: 'Ocorreu um erro ao enviar a mensagem.' });
        } else {
            console.log('Email enviado: ' + info.response);
            res.status(200).json({ success: true, message: 'Mensagem enviada com sucesso!' });
        }
    });
});

//rota para a subscrição da newletter
app.post('/subscribe', async (req, res) => {
    // 1. Recebe o email enviado pelo frontend
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ message: 'E-mail é obrigatório.' });
    }

    // 2. Monta o e-mail
    const mailOptions = {
         from: 'contatogu2tech@gmail.com',       // Seu email
        to: 'contatogu2tech@gmail.com',         // Para onde a mensagem será enviada
        subject: 'Novo Inscrito na Newsletter Orgânica!',
        html: `
            <p>Um novo usuário se inscreveu na newsletter!</p>
            <p><strong>E-mail:</strong> ${email}</p>
            <p>Data: ${new Date().toLocaleString('pt-BR')}</p>
        `
    };

    try {
        // 3. Usa o NodeMailer (supondo que você já tem o transporter configurado)
        await transporter.sendMail(mailOptions); 

        // 4. Responde ao frontend com sucesso
        return res.status(200).json({ message: 'Inscrição enviada com sucesso!' });
    } catch (error) {
        console.error('Erro no NodeMailer:', error);
        return res.status(500).json({ message: 'Falha ao processar a inscrição.' });
    }
});

// Inicia o servidor
app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});