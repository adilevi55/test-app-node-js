const models = require("../../models");
const Product = models.Product;

function deleteProduct(id) {
    return new Promise((resolve, reject) => {
        Product.deleteOne({ _id: id }, err => {
            if (err) return reject(err);
            resolve()
        });
    });
};

module.exports = {deleteProduct}