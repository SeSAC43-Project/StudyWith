const Models  = require('../model');

// 로그인 페이지 렌더링
exports.login_index = (req, res) => {
    res.render('login'); 
}

// 로그인 시스템 구현 
exports.post_login = (req, res) => {
    Models.User.findOne({
        where: {user_id : req.body.user_id}
    }).then((result) => {
        console.log('post login 실행 :', result); 

        if (req.body.user_password == result.user_password) {
            req.session.user_id = req.body.user_id; 
            console.log(req.session);
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
    Models.User.findOne({
        where: { user_id : req.body.user_id }
    }).then((result) => {
        console.log('비번찾기 실행 :', result);
        // hint와 answer db와 일치하는 지 확인
        if (req.body.hint == result.hint && req.body.hint_answer == result.hint_answer) {
            res.send('True'); 
        } else {
            res.send(null);
        }
    });
}

// 비밀번호 변경 페이지 렌더링, 아이디 갑 전달
exports.post_modify = (req, res) => {
    res.render('modify', {id: req.body.user_id});
}

// 비밀번호 변경 실행 
exports.post_update = (req, res) => {
    let newObj = {
        user_password : req.body.user_password
    };
    Models.User.update( newObj, {where: {user_id: req.body.user_id}})
    .then((result) => {
        res.send('비밀번호 수정 성공!');
    });
}

