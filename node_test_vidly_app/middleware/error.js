const logger = require("../logger/logger");


module.exports=function(err,req,res,next){
    //Log in file
    logger.log('error',"err.message,errSomething Failed");
    return res.status(500).send("Something Failed");
}