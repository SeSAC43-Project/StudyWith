const Models  = require('../model');

// 로그인 화면 렌더링
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

// 비밀번호 찾기 화면 렌더링
exports.find_index = (req, res) => {
    res.render('find'); 
}

// 비밀번호 찾기 구현 
exports.post_find = (req, res) => {
    console.log('비번찾기');
}

// 비밀번호 변경 화면 렌더링
exports.modify_index = (req, res) => {
    res.render('modify'); 
}

// 비밀번호 변경 구현 
exports.post_modify = (req, res) => {
    console.log('비번변경');
}
