const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const pool = require('./db');
const authenticateToken = require('./authenticateToken');
var bodyParser = require('body-parser');

const router = express.Router();
var jsonParser = bodyParser.json();

router.post('/blog',bodyParser.json(), authenticateToken, async (req, res) => {
    try {
        const message = req.body.message;
        console.log(message);
        const userId = req.user.userId;

        const { rows } = await pool.query(
            'INSERT INTO blog_posts (message, author_id) VALUES ($1, $2) RETURNING *',
            [message, userId]
        );

        const createdPost = rows[0];
        res.json({ post: createdPost });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to create blog post' });
    }
});


router.get('/blog', async (req, res) => {
    try {
        const page = req.query.page || 1;
        const limit = 20;
        const offset = (page - 1) * limit;

        // Получение записей блога с пагинацией
        const { rows } = await pool.query(
            'SELECT * FROM blog_posts ORDER BY date DESC LIMIT $1 OFFSET $2',
            [limit, offset]
        );

        res.json({ posts: rows });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to retrieve blog posts' });
    }
});

// Редактирование записи блога
router.put('/blog/:postId', authenticateToken, async (req, res) => {
    try {
        const { postId } = req.params;
        const { message } = req.body;
        const userId = req.user.userId;

        // Проверка, является ли пользователь автором записи
        const { rows } = await pool.query(
            'SELECT * FROM blog_posts WHERE id = $1 AND author_id = $2',
            [postId, userId]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Обновление записи блога
        await pool.query(
            'UPDATE blog_posts SET message = $1 WHERE id = $2',
            [message, postId]
        );

        res.json({ message: 'Blog post updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to update blog post' });
    }
});

// Удаление записи блога
router.delete('/blog/:postId', authenticateToken, async (req, res) => {
    try {
        const { postId } = req.params;
        const userId = req.user.userId;

        // Проверка, является ли пользователь автором записи
        const { rows } = await pool.query(
            'SELECT * FROM blog_posts WHERE id = $1 AND author_id = $2',
            [postId, userId]
        );

        if (rows.length === 0) {
            return res.status(401).json({ error: 'Unauthorized' });
        }

        // Удаление записи блога
        await pool.query('DELETE FROM blog_posts WHERE id = $1', [postId]);

        res.json({ message: 'Blog post deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Failed to delete blog post' });
    }
});

module.exports = router;
