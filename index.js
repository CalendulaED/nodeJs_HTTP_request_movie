const mongoose = require('mongoose');
const genres = require('./routes/genres');
const customers = require('./routes/customers');
const express = require('express');
const app = express();

// connect to mongodb
mongoose.connect('mongodb://localhost/movie')
.then(()=> console.log('Connected to MonogDB..'))
.catch(err => console.log('Can not connect to MongoDB...'));

app.use(express.json());
app.use('/api/genres', genres);
app.use('/api/customers', customers);


const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Listening on port ${port}...`));