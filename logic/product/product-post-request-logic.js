const models = require("../../models");
const Product = models.Product;
const User = models.User;

function addProdcut(reqProdcut){
    return new Promise((resolve,reject)=>{
        User.findOne({_id:reqProdcut.body.user}, (err,user) =>{
            if(err) return reject(err);
            if(user === null) return reject({message:"User Not Found"});
        });
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

module.exports = {addProdcut}