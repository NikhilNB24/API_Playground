const Products = require("../models/Products.js");
const express = require("express");
const { response } = require("express");

const productRoute = new express.Router();

// GET request
productRoute.get("/products/", async (req, res) => {
    try {
        const products = await Products.find();
        res.status(200).send(products);
    } catch (error) {
        res.status(400).send(error);
    }
});

// POST request
productRoute.post("/products/", async (req, res) => {
    try {
        let products = new Products({
            name: req.body.name,
            cp: req.body.cp,
            sp: req.body.sp,
        });
        products = await products.save();
        res.status(201).send(products);
    } catch (error) {
        res.status(400).send(error);
    }
});

// PUT request
productRoute.put("/products/:id", async (req, res) => {
    try {
        let product = await Products.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                cp: req.body.cp,
                sp: req.body.sp,
            },
            { new: true }
        );
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error);
    }
});

// DELETE request
productRoute.delete("/products/:id", async (req, res) => {
    try {
        const product = await Products.findByIdAndRemove(req.params.id);
        if (!product) return response.status(400).send("Resource not found...");
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }
});

module.exports = productRoute;
