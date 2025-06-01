const Post = require('../models/Post');
const User = require('../models/User');
const { Op } = require('sequelize');

// Get all posts
exports.getPosts = async (req, res) => {
    try {
        const posts = await Post.findAll({ include: User });
        return res.json({ data: posts});
    } catch (error) {
        return res.status(500).json({ error: error.message})
    }
}

exports.getPostsByUser = async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: { user_id: req.user.id },
        });
        return res.json({ data: posts });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};

// Get post by id
exports.getPostById = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id, { include: User});
        if (!post) {
            return res.status(404).json({ error: 'Post tidak ditemukan'});
        }
        return res.json({ data: post});
    } catch (error) {
        return res.status(500).json({ error: error.message});
    }
}

// Create a new post
exports.createPost = async (req, res) => {
    try {
        const { title, slug, subject } = req.body;
        const post = await Post.create({ 
            title, slug, subject, user_id: req.user.id
        });
        return res.status(201).json({ data: post});
    } catch (error) {
        return res.status(400).json({ error: error.message});
    }
}

// Update a post
exports.updatePost = async (req, res) => {
    try {
        const { title, slug, subject } = req.body;
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ error: 'Post tidak ditemukan'});
        }
        if (post.user_id !== req.user.id) {
            return res.status(403).json({ error: 'Anda tidak memiliki izin untuk mengubah post ini'});
        }
        await post.update({ title, slug, subject });
        return res.json({ message: 'Post berhasil diubah', data: post});
    } catch (error) {
        return res.status(400).json({ error: error.message});
    }
}

// Delete a post
exports.deletePost = async (req, res) => {
    try {
        const post = await Post.findByPk(req.params.id);
        if (!post) {
            return res.status(404).json({ error: "Post tidak ditemukan"});
        }
        if (post.user_id !== req.user.id) {
            return res.status(403).json({ error: "Anda tidak memiliki izin untuk menghapus post ini"});
        }
        await post.destroy();
        return res.json({ message: "Post berhasil dihapus"});
    } catch (error) {
        return res.status(500).json({ error: error.message});
    }
}

exports.searchPost = async (req, res) => {
    try {
        const posts = await Post.findAll({
            where: {
                title: {
                    [Op.like]: `%${req.params.keyword}%`,
                },
            },
        });
        return res.json({ data: posts });
    } catch (error) {
        return res.status(500).json({ error: error.message });
    }
};