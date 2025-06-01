const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    createPost,
    getPosts,
    getPostById,
    updatePost,
    deletePost,
} = require('../controllers/postController');

// Protected routes
router.post('/', authMiddleware, createPost);
router.put('/:id', authMiddleware, updatePost);
router.delete('/:id', authMiddleware, deletePost);

// Public routes
router.get('/', getPosts);
router.get('/:id', getPostById);

module.exports = router;