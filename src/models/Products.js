const mongoose = require("mongoose");

const AppSchema = mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    stock: { type: Number, required: true },
});

const Products = mongoose.model("App", AppSchema);

module.exports = Products;
