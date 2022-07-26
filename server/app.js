const express = require('express');
const app = express();
const cors = require('cors');
const postRoutes = require('./routes/post');
const userRoutes = require('./routes/user');
const path = require('path');
require('dotenv').config({ path: './config/.env' });
require('./config/db');

app.use(express.json());
app.use(cors());

app.use('/api/post', postRoutes);
app.use('/api/auth', userRoutes);
app.use('/images', express.static(path.join(__dirname, 'images')));

module.exports = app;