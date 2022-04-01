const express=require('express');
const logger = require('./logger/logger');

const app=express();

require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')();
require('./startup/validation')();
require('./startup/prod')(app);

process.on('uncaughtException',(ex)=>{
    //console.log(ex);
    logger.log('error',ex);
    process.exit(1);
});

process.on('unhandledRejection',(ex)=>{
    //console.log(ex);
    logger.log('error',"unhandled rejection");
    process.exit(1);
})

//throw new Error("Error occured to trst uncaughtException");
// const p = Promise.reject(new Error("Error occured to trst uncaughtException"));

// p.then(()=>console.log("Done"));

//console.log(config.get('jwtPrivateKey'));


const port = process.env.PORT || 3001;



app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});