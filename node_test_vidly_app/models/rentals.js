const Joi = require("joi");
const mongoose = require("mongoose");

const rentalSchema = new mongoose.Schema({
    customer:{
        type:new mongoose.Schema({
            name:{type:String, required:true, trim:true, minlength:3, maxlength:50},
            phone:{type:String, required:true, trim:true, minlength:10, maxlength:10},
            isGold:{type:Boolean, required:true, default:false}
        }),
        required:true
    },

    movie: {
        type:new mongoose.Schema({
            title: { type: String, required: true, minlength: 3, maxlength: 50, trim:true },
            dailyRentalRate: { type: Number, required: true, default: 0 }
        }),
        required:true
    },

    dateOut: {type:Date, required:true,default: Date.now},
    dateReturned: {type:Date},
    rentalFee: {type:Number, min:0}
});

const Rental = mongoose.model('Rental',rentalSchema);

function validateRental(body){
    const schema = Joi.object({
        customerId: Joi.ObjectId().required(),
        moviesId: Joi.ObjectId().required()
    });
    
    return schema.validate(body);
}

exports.Rental=Rental;
exports.validate=validateRental;