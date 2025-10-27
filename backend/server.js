
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authRoutes = require('./routes/authR');
const topicRoutes = require('./routes/topicsR');
const problemRoutes = require('./routes/problemsR');

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/topics', topicRoutes);
app.use('/api/problems', problemRoutes);

const PORT = process.env.PORT || 5000;
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/trackforce')
  .then(() => {
    console.log('MongoDB connected');
    app.listen(PORT, () => console.log('Server listening on', PORT));
  })
  .catch(err => {
    console.error('DB connection error:', err.message);
  });
