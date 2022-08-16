const User = require('../model/User'); 

exports.login_index = (req, res) => {
    res.render('login'); 
}