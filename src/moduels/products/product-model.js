const { default: mongoose, model } = require("mongoose");

const productSchema  = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    price: {
        type: Number,
        require: true
    },
    category: {
        type: String,
        require: true
    },
    stock: {
        type: String,
        default: 0
    },
})

module.exports = mongoose.model('product', productSchema)