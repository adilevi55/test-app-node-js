const express = require("express");
const logicGetReqProduct = require("../logic/product/product-get-request-logic");
const logicPutReqProduct = require("../logic/product/product-put-request-logic");
const logicPostReqProduct = require("../logic/product/product-post-request-logic");
const logicDeleteReqProduct = require("../logic/product/product-delete-request-logic");
const route = express.Router();
const imgLogic = require("../img-logic");

route.get("/all-products", async (req,res) =>{
    try{
        const products = await logicGetReqProduct.getAllProducts();
        res.json(products);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
});

route.get("/name/:productName", async (req,res) =>{
    try{
        const products = await logicGetReqProduct.getProductsByName(req.params.productName);
        res.json(products);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
});

route.get("/location/:location", async (req,res) =>{
    try{
        const products = await logicGetReqProduct.getProductsByLocation(req.params.location);
        res.json(products);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
});

route.get("/user/:userId", async (req,res) =>{
    try{
        const products = await logicGetReqProduct.getUserProducts(req.params.userId);
        res.json(products);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
});

route.post("/add",imgLogic.upload.single('img'), async (req,res) =>{
    try{
        console.log(req.file);
        const product = await logicPostReqProduct.addProdcut(req);
        res.status(201).json(product);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
});

route.put("/:_id",imgLogic.upload.single('img'), async (req,res) =>{
    try{
        const product = await logicPutReqProduct.updateProduct(req,req.params._id);
        res.json(product);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
});

route.get("/id/:_id", async (req,res) =>{
    try{
        const product = await logicGetReqProduct.getProductById(req.params._id);
        res.json(product);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
});

route.delete("/:_id", async (req,res) =>{
    try{
        const product = await logicDeleteReqProduct.deleteProduct(req.params._id);
        res.status(204).json(product);
    }
    catch(err){
        console.log(err)
        res.status(500).json(err)
    }
});

module.exports = route;