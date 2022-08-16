const Models  = require('../model');

exports.login_index = (req, res) => {
    res.render('login'); 
}

// 로그인 시스템 구현 
exports.post_login = (req, res) => {
    Models.User.findOne({
        where: {user_id: req.body.id}
    }).then((result) => {
        console.log('post login 실행 :', result); 

        if (req.body.pw == result.user_password) {
            res.send('login 성공!');
            return 
        }
        res.send('로그인 실패'); 
    });
}