const Models  = require('../model');

// 로그인 페이지 렌더링
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

// 비밀번호찾기 페이지 렌더링
exports.fine_index = (req, res) => {
    res.render('user_find'); 
}

// 비밀번호 찾기 기능 구현
exports.post_find = (req, res) => {
    console.log(req.body);
}

