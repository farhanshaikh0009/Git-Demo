const mongoose = require('mongoose');
// import mongoose from "mongoose";
// let Schema = mongoose.Schema

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    age: {
        type: Number,
        require: true
    },
    email: {
        type: String,
        unique: true,
        require: true
    },
})

module.exports = mongoose.model('User', userSchema);