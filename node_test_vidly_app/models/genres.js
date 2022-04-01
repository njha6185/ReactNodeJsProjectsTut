const Joi = require('joi');
const mongoose = require('mongoose');

const genreSchema = new mongoose.Schema({
    name:{type:String, required:true, trim:true, minlength:3, maxlength:50}
});

const Genre=mongoose.model('Genre',genreSchema);

function validateGenre(body){
    const schema=Joi.object({
        name:Joi.string().required()
    });

    return schema.validate(body);
};

exports.Genre=Genre;
exports.validate=validateGenre;
exports.genreSchema=genreSchema;