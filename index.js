const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
require('dotenv').config();
const localRouter = require('./src/routers/local-router');
const authRoutes = require('./src/routers/authRoutes');

dotenv.config();
const app = express();

const PORT = process.env.PORT || 3000;
app.use(cors());

app.use(express.json());

// Middleware to log request URL
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

// Connect to MongoDB
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        console.log('Connected To MongoDB');
    })
    .catch((err) => {
        console.log('Error:', err.message);
    });

app.use('/api', localRouter);
app.use('/api/auth', authRoutes);

app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(404).json({ message: 'Something Went Wrong' });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
