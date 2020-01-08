const models = require("../../models");
const Product = models.Product;

function getProductById(id){
    return new Promise((resolve,reject)=>{
        Product.findOne({_id:id}).populate({
            path:"user",
            select: 'userName firstName lastName email phone'
        }).exec((err, product) => {
            if (err) return reject(err);
            resolve(product);
        });
    });
};

function getAllProducts(){
    return new Promise((resolve,reject)=>{
        Product.find({}).populate({
            path:"user",
            select: 'userName firstName lastName email phone'
        }).exec((err, products) => {
            if (err) return reject(err);
            resolve(products);
        });
    });
};

function getProductsByName(productName){
    return new Promise((resolve,reject)=>{
        let regex =  new RegExp(productName,'i');
        Product.find({name:{ $regex: regex } }).populate({
            path:"user",
            select: 'userName firstName lastName email phone'
        }).exec((err, products) => {
            if (err) return reject(err);
            resolve(products);
        });
    });
};

function getProductsByLocation(productgetLocation){
    return new Promise((resolve,reject)=>{
        Product.find({location:productgetLocation }).populate({
            path:"user",
            select: 'userName firstName lastName email phone'
        }).exec((err, products) => {
            if (err) return reject(err);
            resolve(products);
        });
    });
};

function getUserProducts(userId){
    return new Promise((resolve,reject)=>{
        Product.find({user:userId}).populate({
            path:"user",
            select: 'userName firstName lastName email phone'
        }).exec((err, products) => {
            if (err) return reject(err);
            resolve(products);
        });
    });
};


module.exports = {
    getAllProducts,
    getProductsByName,
    getUserProducts,
    getProductsByLocation,
    getProductById,
    }