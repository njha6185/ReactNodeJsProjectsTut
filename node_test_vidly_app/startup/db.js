const mongoose = require('mongoose');
module.exports=function(){
    mongoose.connect("mongodb://localhost/vidly")
    .then(()=>console.log("MongoDb connected Successfully"));
}