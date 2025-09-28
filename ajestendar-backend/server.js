const express = require('express');
const nodemailer = require('nodemailer');
const cors = require('cors');

const app = express();
const PORT = 3000;

// A URL do seu frontend (site visual do Portfólio)
const FRONTEND_URL = 'https://ajestendar-portfolio-1.onrender.com'; 
// Middleware para permitir requisições de outras origens e para processar JSON
// 1. ANÁLISE DE JSON (DEVE VIR PRIMEIRO)
app.use(express.json());

// 2. CONFIGURAÇÃO DE CORS 
app.use(cors({
    origin: '*', // Aceita QUALQUER DOMÍNIO (Recomendado para APIs de Portfólio/Teste)
    methods: 'GET,POST',
}));

// Configuração do Nodemailer com suas credenciais do Gmail
// Configuração do Nodemailer usando SMTP do SendGrid (Com timeout estendido)
const transporter = nodemailer.createTransport({
    host: 'smtp.sendgrid.net', // Servidor SMTP do SendGrid
    port: 587, // Porta padrão para TLS/STARTTLS
    secure: false, 
    auth: {
        user: 'apikey', 
        pass: process.env.SENDGRID_API_KEY 
    },
    // NOVO: Aumenta o tempo de espera antes de desistir (de 30s para 60s)
    connectionTimeout: 60000, 
    // NOVO: Força o uso de TLS, que é mais compatível com o Render
    tls: {
        ciphers: 'SSLv3'
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