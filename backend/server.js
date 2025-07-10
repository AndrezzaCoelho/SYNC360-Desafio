// backend/server.js

require('dotenv').config();

const express = require('express');
const mysql = require('mysql2/promise');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json({ limit: '10mb' }));

const dbConfig = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME
};

let connection;

async function initializeDatabaseConnection() {
    try {
        connection = await mysql.createConnection(dbConfig);
        console.log('[Backend] Conectado ao banco de dados MySQL!');

        await connection.execute(`
            CREATE TABLE IF NOT EXISTS usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nome_completo VARCHAR(255),
                data_nascimento DATE,
                cidade VARCHAR(255),
                estado VARCHAR(255),
                cep VARCHAR(10),
                rua VARCHAR(255),
                bairro VARCHAR(255),
                biografia TEXT,
                foto_perfil LONGBLOB,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        console.log('Tabela "usuarios" verificada/criada com sucesso no MySQL.');

    } catch (error) {
        console.error('[Backend] ERRO CRÍTICO: Falha ao conectar ou inicializar o banco de dados MySQL.');
        console.error('[Backend] Detalhes técnicos do erro:', error.message);
        process.exit(1);
    }
}

initializeDatabaseConnection();

app.get('/api/user/:id', async (req, res) => {
    const userId = req.params.id;

    try {
        const [rows] = await connection.execute('SELECT * FROM usuarios WHERE id = ?', [userId]);

        if (rows.length > 0) {
            const userData = rows[0];
            if (userData.foto_perfil) {
                userData.foto_perfil = Buffer.from(userData.foto_perfil).toString('base64');
            } else {
                userData.foto_perfil = null;
            }
            res.json(userData);
        } else {
            res.status(404).json({ message: 'Usuário não encontrado' });
        }
    } catch (error) {
        console.error('[Backend] Erro ao buscar usuário por ID:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar usuário.' });
    }
});

app.get('/usuario', async (req, res) => {
    try {
        const [rows] = await connection.execute('SELECT * FROM usuarios LIMIT 1');
        if (rows.length === 0) {
            return res.status(404).json({ message: 'Nenhum usuário encontrado. Por favor, cadastre um.' });
        }
        const userData = rows[0];
        if (userData.foto_perfil) {
            userData.foto_perfil = Buffer.from(userData.foto_perfil).toString('base64');
        } else {
            userData.foto_perfil = null;
        }
        res.json(userData);
    } catch (error) {
        console.error('[Backend] Erro ao buscar dados do usuário (rota /usuario):', error);
        res.status(500).json({ message: 'Erro interno do servidor ao buscar dados do usuário.' });
    }
});

app.put('/api/user/:id', async (req, res) => {
    const userId = req.params.id;
    const { nome_completo, data_nascimento, cidade, estado, cep, rua, bairro, biografia, foto_perfil } = req.body;

    let fotoPerfilBuffer = null;
    if (foto_perfil && typeof foto_perfil === 'string') {
        const base64Data = foto_perfil.replace(/^data:image\/(png|jpeg|jpg|gif|bmp|webp);base64,/, '');
        try {
            if (base64Data) {
                fotoPerfilBuffer = Buffer.from(base64Data, 'base64');
            } else {
                fotoPerfilBuffer = null;
            }
        } catch (e) {
            console.error('[Backend] Erro ao converter Base64 para Buffer:', e);
            return res.status(400).json({ message: 'Formato de imagem Base64 inválido.' });
        }
    } else if (foto_perfil === null) {
        fotoPerfilBuffer = null;
    }

    try {
        const [existingUsers] = await connection.execute('SELECT id FROM usuarios WHERE id = ?', [userId]);

        if (existingUsers.length === 0) {
            return res.status(404).json({ message: 'Usuário não encontrado para atualização.' });
        }

        const [result] = await connection.execute(
            `UPDATE usuarios SET 
                nome_completo = ?, 
                data_nascimento = ?, 
                cidade = ?, 
                estado = ?, 
                cep = ?, 
                rua = ?, 
                bairro = ?, 
                biografia = ?, 
                foto_perfil = ? 
            WHERE id = ?`,
            [nome_completo, data_nascimento, cidade, estado, cep, rua, bairro, biografia, fotoPerfilBuffer, userId]
        );

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Dados do usuário atualizados com sucesso!' });
        } else {
            res.status(200).json({ message: 'Dados do usuário recebidos, mas nenhuma alteração foi necessária.' });
        }

    } catch (error) {
        console.error('[Backend] ERRO DETALHADO ao atualizar dados do usuário:', error);
        res.status(500).json({ message: 'Erro interno do servidor ao atualizar dados do usuário.' });
    }
});

app.post('/api/user/:id', async (req, res) => {
    const userId = req.params.id;
    const { nome_completo, data_nascimento, cidade, estado, cep, rua, bairro, biografia, foto_perfil } = req.body;

    if (!nome_completo || !cidade || !estado || !cep || !rua || !bairro || !biografia) {
        return res.status(400).json({ message: 'Todos os campos de texto são obrigatórios.' });
    }

    let fotoPerfilBuffer = null;
    if (foto_perfil && typeof foto_perfil === 'string') {
        const base64Data = foto_perfil.replace(/^data:image\/(png|jpeg|jpg|gif|bmp|webp);base64,/, '');
        try {
            if (base64Data) {
                fotoPerfilBuffer = Buffer.from(base64Data, 'base64');
            } else {
                fotoPerfilBuffer = null;
            }
        } catch (e) {
            console.error('[Backend] Erro ao converter Base64 para Buffer na rota POST:', e);
            return res.status(400).json({ message: 'Formato de imagem Base64 inválido.' });
        }
    } else if (foto_perfil === null) {
        fotoPerfilBuffer = null;
    }

    try {
        const [existingUsers] = await connection.execute('SELECT id FROM usuarios WHERE id = ?', [userId]);

        if (existingUsers.length > 0) {
            await connection.execute(
                `UPDATE usuarios SET 
                    nome_completo = ?, 
                    data_nascimento = ?,
                    cidade = ?, 
                    estado = ?, 
                    cep = ?, 
                    rua = ?, 
                    bairro = ?, 
                    biografia = ?, 
                    foto_perfil = ? 
                WHERE id = ?`,
                [nome_completo, data_nascimento, cidade, estado, cep, rua, bairro, biografia, fotoPerfilBuffer, userId]
            );
            res.status(200).json({ message: 'Dados do usuário atualizados com sucesso via POST!' });
        } else {
            await connection.execute(
                `INSERT INTO usuarios (id, nome_completo, data_nascimento, cidade, estado, cep, rua, bairro, biografia, foto_perfil) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
                [userId, nome_completo, data_nascimento, cidade, estado, cep, rua, bairro, biografia, fotoPerfilBuffer]
            );
            res.status(201).json({ message: 'Novo usuário cadastrado com sucesso!' });
        }
    } catch (error) {
        console.error('[Backend] Erro ao salvar dados do usuário (rota POST):', error);
        res.status(500).json({ message: 'Erro interno do servidor ao salvar dados do usuário.' });
    }
});


app.listen(port, () => {
    console.log(`[Backend] Servidor rodando em http://localhost:${port}`);
});