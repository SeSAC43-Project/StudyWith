const Models  = require('../model');

// 로그인 페이지 렌더링
exports.login_index = (req, res) => {
    res.render('login', {user_id: req.session.user_id}); 
}

// 로그인 시스템 구현 
exports.post_login = (req, res) => {
    Models.User.findOne({
        where: {user_id : req.body.user_id}
    }).then((result) => {
        
        if(result == null) {
            return res.send('false');
        }
        console.log("result",result);
        
        if (req.body.user_password == result.user_password) {
            req.session.user_id = req.body.user_id; 
            console.log(req.session);
            return res.send('true'); // 로그인 성공
        }
        return res.send('false'); // 로그인 실패 
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

// id 유무 검사 
exports.find_isId = (req, res) => {
    Models.User.findOne({
        where: {user_id : req.body.user_id }
    })
    .then((result) => {
        console.log('id 유무 검사 : ', result); 
        if (result == null) { // id가 DB 존제하지 않는 경우(가입되지 않은 아이디)
            console.log('아이디 없음')
            return res.send(false); // 사용 불가
        } else {
            console.log('아이디 있음')
            return res.send(true); // 사용 가능
        }
    })
}

// 로그아웃
exports.logout = (req, res) => {
    req.session.destroy(() => {
      req.session;
    });
    res.send("true");
  };