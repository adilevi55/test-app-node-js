const models = require("../models");
const User = models.User;
const bcrypt = require('bcrypt');

function login(reqUser){
    return new Promise((resolve,reject)=>{

    User.findOne({userName:reqUser.userName}, (err,checkUserUserName)=>{
        if(err) return reject(err);
        if(checkUserUserName === null) return reject({message:"User Name or Password are Invalid"});
        bcrypt.compare(reqUser.password,checkUserUserName.password,(err,resolte)=>{
            if(err)return reject(err);
            if(!resolte) return reject({message:"User Name or Password are Invalid"});
            checkUserUserName.password = null;
            resolve(checkUserUserName);               
    });
});
});
};

function register(reqUser){
    return new Promise((resolve,reject)=>{

    User.findOne({userName:reqUser.userName}, (err,checkUserUserName)=>{
        if(err) return reject(err);
        if(checkUserUserName !== null) return reject({message:"User Name already exists"});

        bcrypt.hash(reqUser.password,1,(err,hash) =>{
            if(err)return reject(err);
            const user = new User({
                userName:reqUser.userName,
                firstName:reqUser.firstName,
                lastName:reqUser.lastName,
                email:reqUser.email,
                phone:reqUser.phone,
                password:hash
            });
            user.save((err,newUser)=>{
                if(err)return reject(err);
                    resolve(newUser);
            })
        });

    });
});
};

module.exports = {
        login,
        register
    }