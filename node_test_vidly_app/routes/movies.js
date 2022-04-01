const express = require("express");
const { Genre } = require("../models/genres");
const { Movies,validate } = require("../models/movies");

const route = express.Router();

route.get('/',async (req,res)=>{
    const movies = await Movies.find().sort('title')
    res.send(movies);
});

route.get('/:id', async (req,res)=>{
    const movie= await Movies.findById(req.params.id);
    if(!movie) return res.status(404).send("Movies Not found");
    res.send(movie);
});

route.post('/',async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);
    try {
        const genre = await Genre.findById(req.body.genreId);
        if(!genre) return res.status(404).send('Genere Not found');
        //console.log(genre);
        const movie = new Movies({
            title:req.body.title,
            numberInStock:req.body.numberInStock,
            dailyRentalRate:req.body.dailyRentalRate,
            genre:{
                _id:genre._id,
                name:genre.name
            },
        });
        await movie.save();
        return res.send(movie);
    } catch (error) {
        //console.log(error);
        res.status(404).send(error.message);
    }
});

route.put('/:id',async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send('Genere Not found');

    const movie = await Movies.findByIdAndUpdate(req.params.id, 
        {
            title:req.body.title,
            numberInStock:req.body.numberInStock,
            dailyRentalRate:req.body.dailyRentalRate,
            genre:{
                _id:genre._id,
                name:genre.name
            },
        }, {new:true});
    
    res.send(movie);
});

route.delete('/',(req,res)=>{
    const movie = Movies.findByIdAndDelete(req.params.id);
    if(!movie) return res.status(404).send('Movie Not found');
    res.send(movie);
});

module.exports=route;