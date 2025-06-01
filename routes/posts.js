const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    createPost,
    getPosts,
    getPostsByUser,
    getPostById,
    updatePost,
    deletePost,
    searchPost,
} = require('../controllers/postController');

// Protected routes
router.post('/', authMiddleware, createPost);
router.get('/', authMiddleware, getPostsByUser);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

// Public routes
router.get('/', getPosts);
router.get('/:id', getPostById);
router.get('/search/:keyword', searchPost);

module.exports = router;