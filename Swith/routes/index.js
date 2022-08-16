const express = require('express'); 
const UserRouter = express.Router();
const login = require('../controller/LoginController'); 
const multer = require('multer'); 

UserRouter.get('/login', login.login_index); 

module.exports = UserRouter;