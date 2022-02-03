const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require('cors');
require("dotenv/config");

const app = express();
const PORT = 3000;

// to parse form data
app.use(bodyParser.json());

// To access Cross Origin Policy
app.use(cors());

// Import Routes
const postRoute = require('./routes/post');

// so whenever we go to post the below line gets triggered and we don't have to write /posts in `routes/post.cjs`
app.use('/posts', postRoute);

// ! Middleware
// app.use('/posts', () => {
//     console.log(`This is a middleware running.`);
// });

// Routes
app.get('/', (req, res) => {
    res.send(`We are on Home and the URL is localhost:${PORT}`);
});

// the thing below has been moved to `routes/post.cjs`
// app.get('/posts', (req, res) => {
//     res.send(`We are on Posts and the URL is localhost:${PORT}/posts`);
// });

// Connect to DB.
mongoose.connect(process.env.DB_CONNECTION, { useNewUrlParser: true, useUnifiedTopology: true }, () => console.log(`Connected to DB`))


// Creating a Server
app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
});