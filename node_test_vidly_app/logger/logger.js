const winston = require('winston');

//winston.add(winston.transports.File, { filename: 'somefile.log' });
const logger = winston.createLogger({
    transports: [
      //new winston.transports.Console(),
      new winston.transports.File({ filename: 'combined.log' })
    ]
  });

  module.exports=logger;