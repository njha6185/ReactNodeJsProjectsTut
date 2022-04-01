const _ = require("lodash");
const express = require("express");
const bcrypt = require("bcrypt");
const { validate, Users } = require("../models/users");
const auth = require("../middleware/auth");

const route=express.Router();

route.get('/', async (req,res)=>{
    const users = await Users.find().select('name email -_id');
    return res.send(users);
});

route.get('/me', auth, async (req,res)=>{
    const users = await Users.findById(req.user._id).select('name email -_id');
    return res.send(users);
});

route.post('/',async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    let user= await Users.findOne({email:req.body.email});
    if(user) return res.status(400).send("Email ID already exists!!!");

    try {
            user = new Users(_.pick(req.body,['name','email','password']));

            const salt = await bcrypt.genSalt(12);
            user.password=await bcrypt.hash(user.password,salt);
    
            await user.save();
            
            const token = user.generateAuthToken();
            return res.header('x-auth-token',token).send(_.pick(user,['name','email','isAdmin']));
    } catch (err) {
        res.status(404).send(err.message);
    }    
});

module.exports=route;