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
            res.send(result.user_password); 
            return 
        }
        res.send('질문과 답을 재확인 해주세요');
    });
}

// 비밀번호 변경 화면 렌더링
exports.modify_index = (req, res) => {
    res.render('modify'); 
}

// 비밀번호 변경 구현 
exports.post_modify = (req, res) => {
    console.log('비번변경');
}
