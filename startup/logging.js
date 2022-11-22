const winston = require('winston');
// require('winston-mongodb');
require('express-async-errors');

module.exports = function() {
    // process.on('uncaughtException', (ex) => {
//     // console.log('We got an uncaught exception');
//     winston.error(ex.message, ex);
//     process.exit(1);
// });

winston.handleExceptions(
    new winston.transports.Console({ colorize: true, prettyPrint: true}),
    new winston.transports.File({ filename: 'uncaughtExceptions.log'}));

process.on('unhandledRejection', (ex) => {
    // console.log('We got an unhandled rejection');
    winston.error(ex.message, ex);
    process.exit(1);
});




winston.add(winston.transports.File, {filename: 'logfile.log'});
// winston.add(winston.transports.MongoDB, {db: 'mongodb://localhost/movie'});

}