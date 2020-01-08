const express = require("express");
const logicAuthentication = require("../logic/authentication-logic");
const route = express.Router();


route.post("/logIn", async (req,res)=>{
    try{
        const costomer = await logicAuthentication.login(req.body);
        res.json(costomer);
    }
    catch(err){
        console.log(err);
        if(err.message) return res.status(409).json(err);
        res.status(500).json(err);
    }
});

route.post("/register", async (req,res)=>{
    try{
        const costomer = await logicAuthentication.register(req.body);
        res.status(201).json(costomer)
    }
    catch(err){
        if(err.message) return res.status(409).json(err);
        res.status(500).json(err);
    }
})

module.exports = route;