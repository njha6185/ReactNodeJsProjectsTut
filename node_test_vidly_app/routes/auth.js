const express = require("express");
const { Users } = require("../models/users");
const _ = require('lodash');
const bcrypt=require('bcrypt');
const Joi = require("joi");


const route=express.Router();

route.post('/',async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    let user= await Users.findOne({email:req.body.email});
    if(!user) return res.status(400).send("Invalid Email or password!!!");

    const validpassword=await bcrypt.compare(req.body.password,user.password);
    //console.log(validpassword);
    if(!validpassword) return res.status(400).send("Invalid Email or password!!!");

    const token =user.generateAuthToken();

    return res.send(token);
});

function validate(req){
    const schema=Joi.object({
        email:Joi.string().required().email(),
        password:Joi.string().required().min(6).max(255)
    });

    return schema.validate(req);
}

module.exports=route;