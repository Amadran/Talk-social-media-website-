// requires
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// express app, port, and middleware
const app = express();
const PORT = process.env.PORT | 5000;
app.use(cors());
app.use(express.json());

// MongoDB database connection
const URI = process.env.ATLAS_URI;
mongoose.connect(URI, {useNewUrlParser: true, useCreateIndex: true, useUnifiedTopology: true});
mongoose.connection.once('open', () => {
    console.log("Server successfully connected to MongoDB Atlas");
});

// require routes
const homeRouter = require('./routes/home.js');
const loginRouter = require('./routes/login.js');
app.use('/login', loginRouter);
app.use('/home', homeRouter);

// start server
app.listen(PORT, () => {
    console.log(`Now listening on port ${PORT}`);
});