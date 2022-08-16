const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const multer = require('multer');
const port = 8000;

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use( express.static('public'));
app.use( bodyParser.json() );

app.listen(port, ()=>{
    console.log( "Server Port : ", port );
});