const express = require('express');
const app = express()
app.use(express.json());


const indexRoute = require('./routes/index')
app.use('/', indexRoute)

const genreRoute = require('./routes/genre')
app.use('/api/genres', genreRoute)

const port = process.env.PORT || 4000;
app.listen(port, ()=>console.log("Server Started on " + port))
