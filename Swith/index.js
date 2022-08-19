const express = require("express");
const session = require('express-session'); 
const app = express();
app.use(session({
    secret: 'secret key', 
    resave: false,
}))

const bodyParser = require("body-parser");
const multer = require('multer');
const port = 8000;

app.set("view engine", "ejs");
app.use(express.urlencoded({extended: true}));
app.use( "/public", express.static('public')); 
app.use( bodyParser.json() );

/* 회원가입&로그인 경로 */
const { UserRouter } = require('./routes');
app.use('/user', UserRouter);

/* 게시물 관련 경로 */
const { FeedRouter } = require('./routes');
app.use('/feed', FeedRouter);

app.listen(port, ()=>{
    console.log( "Server Port : ", port );
});