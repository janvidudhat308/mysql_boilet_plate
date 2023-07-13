const config = require('./config');
//const logger = require('../loggers/logger');
const logger=require('../loggers/logger');
const { log } = require('winston');

class GeneralResponse {
    constructor(message, result, statusCode = "") {
        logger.info("message", message)
        console.log('-----------------');
        console.log('fghjk');
        console.log(logger.level);
        logger.info("message",message);
        this.message = message;
        this.statusCode = statusCode == "" ? config.HTTP_SUCCESS : statusCode;
        this.result = result;
    }
}

module.exports = {
    GeneralResponse
}