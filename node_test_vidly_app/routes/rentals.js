const express = require("express");
var Fawn = require("fawn");
const { default: mongoose } = require("mongoose");
const { Customer } = require("../models/customers");
const { Movies } = require("../models/movies");
const { Rental, validate } = require("../models/rentals");

//Fawn.init(mongoose);
Fawn.init("mongodb://localhost/vidly");
const route = express.Router();

route.get('/',async (req,res)=>{
    const rentals=await Rental.find();
    res.send(rentals);
});

route.get('/:id',async(req,res)=>{
    const rental = await Rental.findById(req.params.id);
    if(!rental) return res.status(400).send("rental Not found");
    return res.send(rental);
});

route.post('/',async (req,res)=>{
    const {error} = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    try {
        // if(!mongoose.Types.ObjectId.isValid(req.body.customerId))
        //     return res.status(400).send("'Invalid Customer ID");

        const customer = await Customer.findById(req.body.customerId);
        if(!customer) return res.status(404).send("Customer not found!!!");

        // if(!mongoose.Types.ObjectId.isValid(req.body.moviesId))
        //     return res.status(400).send("'Invalid Movie ID");

        const movie = await Movies.findById(req.body.moviesId);
        if(!movie) return res.status(404).send("Movie not found!!!");

        if(movie.numberInStock===0) return res.status(404).send("Movie not in Stock!!!");

        let rental = new Rental({
            customer:{
                _id: customer._id,
                name:customer.name,
                phone:customer.phone,
                isGold:customer.isGold
            },
            movie:{
                _id:movie._id,
                title:movie.title,
                dailyRentalRate:movie.dailyRentalRate
            }
        });

        // rental= await rental.save();

        // movie.numberInStock--;
        // movie.save();

        try {
            new Fawn.Task()
            .save('rentals',rental)
            .update('movies',{_id:movie._id},{
                $inc:{numberInStock: -1}
            })
            .run();
            return res.send(rental);
        } catch (error) {
            res.status.send('Something Went wrong!!');
        }
    } catch (err) {
        res.status(404).send(error.message);
    }
});

route.delete('/',(req,res)=>{
    const rental = Rental.findByIdAndDelete(req.params.id);
    if(!rental) return res.status(404).send('Rental Not found');
    res.send(rental);
});

module.exports=route;