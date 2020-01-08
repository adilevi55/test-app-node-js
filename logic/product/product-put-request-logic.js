const models = require("../../models");
const Product = models.Product;

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

module.exports = {updateProduct}