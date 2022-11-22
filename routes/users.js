const _ = require('lodash');
const mongoose = require('mongoose');
const express = require('express');
const Joi = require('joi');
const router = express.Router();
const {User, validate} = require('../models/user');
const bcrypt = require('bcrypt');
const auth = require('../middleware/auth')

router.get('/me', auth, async (req, res) => {
    const user = await User.findById(req.user._id).select('-password');
    res.send(user);
});

router.post('/', async (req, res) => {
    const { error } = validate(req.body); 
    if (error) return res.status(400).send(error.details[0].message);

    // check if user already exists
    let user = await User.findOne({email: req.body.email});
    if (user) {
        return res.status(400).send('User already registered.');
    }

    user = new User(
        // name: req.body.name,
        // email: req.body.email,
        // password: req.body.password
        _.pick(req.body, ['name', 'email', 'password'])
    );
    const salt = await bcrypt.genSalt(10); // define the time it take to generate salt
    user.password = await bcrypt.hash(user.password, salt); // hash the password
    
    await user.save();

    const token = user.generateAuthToken();
    
    // send the token in the res header
    res.header('x-auth-token', token).send(_.pick(user, ['_id','name', 'email']));


});


module.exports = router;