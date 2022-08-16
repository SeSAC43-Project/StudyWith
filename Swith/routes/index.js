const express = require('express'); 
const UserRouter = express.Router();
const login = require('../controller/LoginController'); 
const multer = require('multer'); 
const User = require('../model/User');

UserRouter.get('/login', login.login_index); 
// UserRouter.post('/login',login.post_login);

module.exports = UserRouter;