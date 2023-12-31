const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const path = require('path');


const app = express();
const PORT = process.env.PORT;

//middleware
app.use(express.json());
app.use(cors());


//database connection
mongoose.set('strictQuery', true);
mongoose.connect(process.env.DB_URL,
    { useNewUrlParser: true, useUnifiedTopology: true }
)

const db = mongoose.connection;
db.on('error', (error) => {
    console.log(error);
});
db.once('open', () => {
    console.log("Connected to database");
});

//set files static
app.use(express.static('public'));

//route prefix
app.use('/',require('./routes/users'));


//server connection
app.listen(PORT,()=>{
    console.log('Server is Running');
})