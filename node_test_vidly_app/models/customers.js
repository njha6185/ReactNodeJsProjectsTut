const mongoose = require('mongoose');
const Joi = require('joi');

const customerSchema=new mongoose.Schema({
    name:{type:String, required:true, trim:true, minlength:3, maxlength:50},
    phone:{type:String, required:true, trim:true, minlength:10, maxlength:10},
    isGold:{type:Boolean, required:true},
})

const Customer=mongoose.model('Customer',customerSchema);


function validateCustomer(body){
    const schema=Joi.object({
        name:Joi.string().required(),
        isGold: Joi.boolean().required(),
        phone: Joi.string().length(10).required()
    });

    return schema.validate(body);
};

exports.Customer=Customer;
exports.validate=validateCustomer;