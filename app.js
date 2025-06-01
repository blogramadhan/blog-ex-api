const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
// Untuk membaca input dari user
app.use(bodyParser.json());

// Routes
// Import routes yang sudah dibuat
const authRoutes = require('./routes/auth');
const postRoutes = require('./routes/posts');

// Gunakan routes
// Endpoint menyesuaikan dengan routes yang sudah dibuat
app.use('/api/auth', authRoutes);
app.use('/api/posts', postRoutes);

const sequelize = require('./config/database');
const User = require('./models/User');
const Post = require('./models/Post');

// Koneksi ke database
sequelize.authenticate()
    .then(() => console.log('Database terhubung'))
    .catch((err) => console.error('Database tidak terhubung:', err));

sequelize.sync({ force: false })
    .then(() => {
        console.log('Database synced');
        app.listen(3000, () => console.log('Server berjalan di port 3000'))
    })
    .catch(err => console.error('Database sync error:', err));