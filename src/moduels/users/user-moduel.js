const mongoose = require('mongoose');
// import mongoose from "mongoose";
// let Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        require: true,
        unique: true
    },
    password: {
        type: String,
        require: true
    },
    createdAt: {
        type: String,
        require: true
    },
})

module.exports = mongoose.model('User', userSchema);