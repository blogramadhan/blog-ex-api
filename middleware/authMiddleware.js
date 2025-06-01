const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your-secret-key';  // Harus sama dengan JWT_SECRET di authController.js

module.exports = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];  // Bearer <token>

    if (!token) {
        return res.status(401).json({ error: 'Akses ditolak' });
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET);
        req.user = decoded;  // Simpan data user yang sudah terverifikasi
        next();
    } catch (error) {
        return res.status(401).json({ error: 'Token tidak valid' });
    }
};