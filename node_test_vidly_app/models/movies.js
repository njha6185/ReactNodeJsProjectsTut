const Joi = require("joi");
const mongoose = require("mongoose");
const {validate:validateGenere, genreSchema} = require('./genres');

const moviesSchema = new mongoose.Schema({
  title: { type: String, required: true, minlength: 3, maxlength: 50, trim:true },
  numberInStock: { type: Number, required: true, default: 0, min: 0, max: 100 },
  dailyRentalRate: { type: Number, required: true, default: 0 },
  genre:{
    type:genreSchema,
    required:true
}
//   genre:{
//       type:mongoose.Schema.Types.ObjectId,
//       ref:'Genere'
//   }
});

const Movies= mongoose.model('Movies',moviesSchema);

function validateMovies(body){
    const schema= Joi.object({
        title:Joi.string().required().min(3).max(50),
        numberInStock: Joi.number().required().default(0).min(0).max(100),
        dailyRentalRate: Joi.number().required().default(0),
        genreId: Joi.ObjectId().required()
    });
    return schema.validate(body)
}

exports.Movies=Movies;
exports.validate=validateMovies;
