/**
 * @author: CalendulaED
 * 
 */
// import express
const { json } = require('express');
const express = require('express');
const app = express();
// import Joi for the input validation
const Joi = require('joi');

// need to use json
app.use(express.json());

// create a local array to store the movie
movies = [
    {id: 1,  name: "Harry Potter1", genres: "Fantasy"},
    {id: 2, name: "Harry Potter2", genres: "Fantasy"},
    {id: 3, name: "Harry Potter3", genres: "Fantasy"},
];

// create Get requires to get all movies 
app.get('/api/movies', (req, res)=> {
    res.send(movies);
});

// create Get request to get specific movie
app.get('/api/movie/:id', (req, res) => {
    // check the movie name in the database
    // console.log(typeof(movies.name));
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    // if can't find the movie return 404
    if (!movie) return res.status(404).send('Cannot find this movie');
    res.send(movie);
});

// create Get request on root
app.get('/', (req, res)=> {
    res.send('Welcome!')
})

// create POST to upload a new movie
app.post('/api/movies', (req, res)=> {
    // check input validation
    const { error } = validationMovie(req.body);
    // if not valid
    if (error) return res.status(400).send(error.details[0].message);

    // add the new movie
    const movie = {
        id: movies.length + 1,
        name: req.body.name,
        genres: req.body.genres
    }
    // push it to the database
    movies.push(movie);
    res.send(movie);
});

// method to check input validation with Joi
function validationMovie(movie) {
    // define the rules for movie
    const schema = {
        name: Joi.string().min(3).required(),
        genres: Joi.string().min(3).required()
    };
    return Joi.validate(movie, schema);
};

// create PUT for update the movie
app.put('/api/movie/:id', (req, res)=> {
    // find the movie
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    // if can't find the movie return 404
    if (!movie) return res.status(404).send('Cannot find this movie');


    // check input validation
    const { error } = validationMovie(req.body);
    // if not valid
    if (error) return res.status(400).send(error.details[0].message);

    // update the movie
    movie.name = req.body.name;
    movie.genres = req.body.genres;
    res.send(movie);
});

// create DELETE to remove movie
app.delete('/api/movie/:id', (req, res)=> {
    // find the movie
    const movie = movies.find(c => c.id === parseInt(req.params.id));
    // if can't find the movie return 404
    if (!movie) return res.status(404).send('Cannot find this movie');

    // remove it
    const index = movies.indexOf(movie);
    movies.splice(index, 1);

    // return the removed
    res.send(movie);
});

// Change the PORT accordingly if needed
const port = process.env.PORT || 3000;
app.listen(port, ()=> {
    console.log(`Listening to port ${port}...`)
})