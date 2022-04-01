const config = require("config");
const Joi = require("joi");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const userSchema=new mongoose.Schema({
    name:{type:String, required:true,min:3,max:80,
        trim: true},
    email:{type:String, required:true, unique:true,
        trim: true,
        lowercase: true, match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    isAdmin:{type:Boolean, default:false},
    password:{type:String, required:true,min:6,max:1024,
        trim: true}
});

userSchema.methods.generateAuthToken=function(){
    return jwt.sign({_id:this._id, isAdmin:this.isAdmin}, config.get('jwtPrivateKey'));
}

const Users=mongoose.model('users',userSchema);

function validateUser(body){
    const schema=Joi.object({
        name:Joi.string().required().min(3).max(80),
        email:Joi.string().required().email(),
        password:Joi.string().required().min(6).max(255)
    });

    return schema.validate(body);
}

exports.Users=Users;
exports.validate=validateUser;