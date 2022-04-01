const express=require('express');
const { Customer, validate } = require('../models/customers');


const route=express.Router();


// const generes=[
//     {id:1,name:'Action'},
//     {id:2,name:'Horror'},
//     {id:3,name:'Romance'},
//     {id:4,name:'Thriller'},
// ];

route.get('/',async (req,res)=>{
    const customers= await Customer.find().sort('name');
    res.send(customers);
});

route.get('/:id',async (req,res)=>{
    const customer = await Customer.findById(req.params.id);
    //const genere=generes.find(c=>c.id===parseInt(req.params.id));
    if(!customer) return res.status(404).send('Customer Not found');
    res.send(customer);
});

route.post('/',async (req,res)=>{

    const { error } = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    //const genere = {id:generes.length+1, name:req.body.name};
    let customer = new Customer({ name:req.body.name, phone:req.body.phone, isGold:req.body.isGold})
    //generes.push(genere);
    customer=await customer.save();
    res.send(customer);
});

route.put('/:id',async (req,res)=>{
    //const genere=generes.find(c=>c.id===parseInt(req.params.id));
    const { error } = validate(req.body);
    if(error) return res.status(404).send(error.details[0].message);

    const customer = await Customer.findByIdAndUpdate(req.params.id,
        { name:req.body.name, phone:req.body.phone, isGold:req.body.isGold},{
        new:true
    });

    if(!customer) return res.status(404).send('Genere Not found');

    //genere.name=req.body.name;
    res.send(customer);
});

route.delete('/:id',async (req,res)=>{

    const customer= await Customer.findByIdAndRemove(req.params.id);
    //const genere=generes.find(c=>c.id===parseInt(req.params.id));
    if(!customer) return res.status(404).send('Genere Not found with given GenereID');
    
    // const index=generes.indexOf(genere);
    // generes.splice(index,1)
    res.send(customer)
});



module.exports=route;