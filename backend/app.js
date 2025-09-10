const express = require('express');
const app = express();
const connectDB = require('./utils/db');
const authRoutes = require('./routes/authRoutes');
const problemRoutes = require('./routes/problemRoutes');
require('dotenv').config();

// Connect DB
connectDB();

// Middleware
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/problems', problemRoutes);

module.exports = app;
