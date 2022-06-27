const mongoose = require("mongoose");

const AppSchema = mongoose.Schema({
    name: { type: String, required: true },
    cp: { type: Number, required: true },
    sp: Number,
});

const Products = mongoose.model("App", AppSchema);

module.exports = Products;
