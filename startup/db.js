const winston = require('winston');
const mongoose = require('mongoose');
const config = require('config');


module.exports = function() {
    // connect to mongodb
    const db = config.get('db')
    mongoose.connect(db)
    .then(()=> winston.info(`Connected to ${db}..`))
    // global reject handle will deal with this

}