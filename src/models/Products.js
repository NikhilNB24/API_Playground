const mongoose = require("mongoose");

const AppSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        validate: {
            validator: (value) => /^[a-zA-Z0-9_ ]*$/.test(value),
            message: (prop) =>
                `${prop} should contain only alphabets and digits`,
        },
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => value > 0,
            message: (prop) => `${prop.path} should be greater than 0`,
        },
    },
    stock: {
        type: Number,
        required: true,
        validate: {
            validator: (value) => value > 0,
            message: (prop) => `${prop.path} should be greater than 0`,
        },
    },
});

const Products = mongoose.model("App", AppSchema);

module.exports = Products;
