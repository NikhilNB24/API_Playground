const Products = require("../models/Products.js");
const express = require("express");
const { response } = require("express");

const productRoute = new express.Router();

// GET request with "sortBy" option using query parameters
productRoute.get("/", async (req, res) => {
    try {
        const sortBy = req.query.sortBy;
        const status = req.query.status; // Stock status, i.e, In stock or out of stock
        console.log(status);
        let products;

        switch (sortBy || status) {
            case "name":
                products = await Products.find().sort({ name: 1 });
                res.status(200).send(products);
                break;
            case "price":
                products = await Products.find().sort({ price: 1 });
                res.status(200).send(products);
                break;
            case "stock":
                products = await Products.find().sort({ stock: 1 });
                res.status(200).send(products);
                break;
            case "InStock":
                products = await Products.find({ stock: { $gt: 0 } });
                res.status(200).send(products);
                break;
            case "OutOfStock":
                products = await Products.find({ stock: { $eq: 0 } });
                res.status(200).send(products);
                break;
            default:
                products = await Products.find();
                res.status(200).send(products);
                break;
        }
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// GET(specific) request
productRoute.get("/:id", async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// POST request
productRoute.post("/", async (req, res) => {
    try {
        let products = new Products({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            stock: req.body.stock,
        });
        products = await products.save();
        res.status(201).send(products);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// PUT request
productRoute.put("/:id", async (req, res) => {
    try {
        let product = await Products.findByIdAndUpdate(
            req.params.id,
            {
                name: req.body.name,
                description: req.body.description,
                price: req.body.price,
                stock: req.body.stock,
            },
            { new: true }
        );
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// PATCH REQUEST
productRoute.patch("/:id", async (req, res) => {
    try {
        let product = await Products.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true }
        );
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// DELETE request
productRoute.delete("/:id", async (req, res) => {
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
