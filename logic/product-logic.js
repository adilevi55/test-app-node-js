const models = require("../models");
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

function deleteProduct(id) {
    return new Promise((resolve, reject) => {
        Product.deleteOne({ _id: id }, err => {
            if (err) return reject(err);
            resolve()
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

function addProdcut(reqProdcut){
    return new Promise((resolve,reject)=>{
        let reqBody = reqProdcut.body;
        let imgName = reqProdcut.file.originalname.split(".png");
        reqBody.img = imgName[0];
        const product = new Product(reqBody);
        product.save((err,newProduct)=>{
            if(err) return reject(err);
            resolve(newProduct)
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
}
function updateProduct(reqBody,id){
    return new Promise((resolve,reject)=>{
        let product = reqBody.body;
        if(reqBody.file !== undefined){
            let imgName = reqBody.file.originalname.split(".png");
            product.img = imgName[0];
        }

        Product.updateOne({_id:id},product,err=>{
            if(err)return reject(err); 
            resolve(product)
        })
    })
};

module.exports = {
    getAllProducts,
    getProductsByName,
    addProdcut,
    getUserProducts,
    getProductsByLocation,
    updateProduct,
    getProductById,
    deleteProduct
    }