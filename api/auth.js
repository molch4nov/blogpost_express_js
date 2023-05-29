const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db');
const authenticateToken = require('./authenticateToken');

const router = express.Router();

// Регистрация
router.post('/register', async (req, res) => {
    try {
        const { username, password } = req.body;
        console.log(req.body.username);
        // Хеширование пароля
        const hashedPassword = await bcrypt.hash(password, 10);

        // Вставка данных пользователя в базу данных
        await pool.query(
            'INSERT INTO users (username, password) VALUES ($1, $2)',
            [username, hashedPassword]
        );

        res.status(201).json({ message: 'Registration successful' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Registration failed' });
    }
});

// Авторизация
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;

        // Получение данных пользователя из базы данных
        const { rows } = await pool.query(
            'SELECT * FROM users WHERE username = $1',
            [username]
        );

        // Проверка наличия пользователя в базе данных
        if (rows.length === 0) {
            return res.status(401).json({ error: 'Authentication failed from rows length' });
        }

        const user = rows[0];

        // Проверка пароля
        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            return res.status(401).json({ error: 'Authentication failed' });
        }

        // Создание JWT
        const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, {
            expiresIn: '1h',
        });

        res.json({ token });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Authentication failed' });
    }
});

module.exports = router;
