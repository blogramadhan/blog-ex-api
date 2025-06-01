const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const JWT_SECRET = 'your-secret-key';  // Ganti dengan secret key yang lebih aman

// Register User
exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const user = await User.create({ username, email, password });
        return res.status(201).json({ message: 'User berhasil didaftarkan' });
    } catch (error) {
        return res.status(400).json({ error: error.message });
    }
};

// Login User
exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        // Menggunakan scope 'withPassword' untuk mendapatkan password
        const user = await User.scope('withPassword').findOne({ where: { email } });

        if (!user) {
            return res.status(400).json({ error: 'Email atau password salah' });    
        }
        const validPassword = await bcrypt.compare(password, user.password);
        if (!validPassword) {
            return res.status(400).json({ error: 'Email atau password salah' });
        }   
        
        // Generate token
        const token = jwt.sign({ id: user.id }, JWT_SECRET, { expiresIn: '1h' });
        return res.json({ message: 'Login berhasil', token })
    } catch (error) {
        return res.status(400).json({ error: error.message});
    }
};