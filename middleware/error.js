const winston = require('winston');

module.exports = function(err, req, res, next) {
    // log
    //: error
    // warn
    // info
    // verbose
    // debug
    // silly
    winston.error(err.message, err);
    // internal server error 500
    res.status(500).send('Something failed');
}