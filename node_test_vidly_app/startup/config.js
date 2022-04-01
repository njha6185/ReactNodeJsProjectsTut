const config = require('config');
module.exports=function(){
    if(!config.get('jwtPrivateKey')){
        console.error("Fatal Error, jwt Key Not exist");
        process.exit(1);
    }
}