const Products = require("../models/Products.js");
const express = require("express");
const { response } = require("express");

const router = new express.Router();

// GET request with "sortBy" option using query parameters
router.get("/", async (req, res) => {
    try {
        const sortBy = req.query.sortBy;
        const status = req.query.status; // Stock status, i.e, In stock or out of stock
        let products;

        switch (sortBy || status) {
            case "name":
                products = await Products.find().sort("name");
                res.status(200).send(products);
                break;
            case "price":
                products = await Products.find().sort("price");
                res.status(200).send(products);
                break;
            case "stock":
                products = await Products.find().sort("stock");
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
router.get("/:id", async (req, res) => {
    try {
        const product = await Products.findById(req.params.id);
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

// POST request
router.post("/", async (req, res) => {
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
router.put("/:id", async (req, res) => {
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
router.patch("/:id", async (req, res) => {
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
router.delete("/:id", async (req, res) => {
    try {
        const product = await Products.findByIdAndRemove(req.params.id);
        if (!product) return response.status(400).send("Resource not found...");
        res.status(200).send(product);
    } catch (error) {
        res.status(400).send(error.message);
        console.log(error.message);
    }
});

module.exports = router;
