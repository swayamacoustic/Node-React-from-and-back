const express = require('express');
const app = express();
const mongoose = require('mongoose');
const fs = require('fs');
const path = require('path');
const cors = require('cors');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const mongoStore = require('connect-mongo')(session);


//parser middlewares
app.use(express.json({limit:'10mb',extended:true}));
app.use(express.urlencoded({limit:'10mb',extended:true}));
app.use(cookieParser());



//connecting to mongodb
const {mongoURI} = require('./config/key');

mongoose.connect(mongoURI, { useUnifiedTopology: true, useNewUrlParser: true});

mongoose.connection.once('open', function () {
    console.log("Connected to Database  Successfully.");
});
mongoose.set('useCreateIndex', true);


app.use(cors());
app.use(logger("dev"));

//session setup
app.use(session({
    name : 'pick real',
    secret : '9081544252',
    resave : true,
    httpOnly : true,
    saveUninitialized: true,
    store : new mongoStore({mongooseConnection : mongoose.connection}),
    cookie : { maxAge : 80*80*800 }
  }));



//public folder as static
app.use(express.static(path.resolve(__dirname + "/public")));

//view folder
app.set('views', path.resolve(__dirname + "/app/view"));


//ejs engine
app.set('view engine', 'ejs');

//models file dynamic
fs.readdirSync("./app/models").forEach(function (file) {
    if (file.indexOf(".js")) {
        require("./app/models/" + file);
    }
}); 

//controller file dynamic
fs.readdirSync("./app/controller").forEach(function (file) {
    if (file.indexOf(".js")) {                                           /*if file.indexOf('.js)= "undefined" it wont execute */
        const route = require("./app/controller/" + file);
        route.controller(app);
    }
});



app.listen(5000, (req, res) => {
    console.log('port 5000');
    
});