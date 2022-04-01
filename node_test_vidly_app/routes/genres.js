const express=require('express');
const { Genre, validate } = require('../models/genres');
const auth = require('../middleware/auth');
const admin = require('../middleware/admin');
const asyncMiddleware = require('../middleware/async');

const route=express.Router();



// const generes=[
//     {id:1,name:'Action'},
//     {id:2,name:'Horror'},
//     {id:3,name:'Romance'},
//     {id:4,name:'Thriller'},
// ];


route.get('/',asyncMiddleware(async (req,res,next)=>{
    //throw new Error('not got genere');
    const genres= await Genre.find().sort('name');
    return res.send(genres);
}));

route.get('/:id',async (req,res)=>{
    const genre = await Genre.findById(req.params.id);
    //const genere=generes.find(c=>c.id===parseInt(req.params.id));
    if(!genre) return res.status(404).send('Genere Not found');
    return res.send(genre);
});

route.post('/',auth,async (req,res)=>{

    const { error } = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    //const genere = {id:generes.length+1, name:req.body.name};
    let genre = new Genre({ name:req.body.name})
    //generes.push(genere);
    genre=await genre.save();
    res.send(genre);
});

route.put('/:id',async (req,res)=>{
    //const genere=generes.find(c=>c.id===parseInt(req.params.id));
    const { error } = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    const genre = await Genre.findByIdAndUpdate(req.params.id,{name: req.body.name},{
        new:true
    });

    if(!genre) return res.status(404).send('Genere Not found');

    //genere.name=req.body.name;
    res.send(genre);
});

route.delete('/:id',[auth,admin] ,async (req,res)=>{

    const genre= await Genre.findByIdAndRemove(req.params.id);
    //const genere=generes.find(c=>c.id===parseInt(req.params.id));
    if(!genre) return res.status(404).send('Genere Not found with given GenereID');
    
    // const index=generes.indexOf(genere);
    // generes.splice(index,1)
    res.send(genre)
});



module.exports=route;