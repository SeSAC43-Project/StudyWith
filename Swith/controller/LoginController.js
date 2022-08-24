const Models  = require('../model');
const { sequelize } = require("../model/index"); 

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
            res.send('True'); // 로그인 성공
            return 
        }
        res.send('False'); // 로그인 실패 
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

// 마이페이지 유저 페이지
exports.mypage_index = async (req, res) => {
    // 보내줄 유저 데이터 
    const [result, metadata] = await sequelize.query(
        `select * FROM user WHERE user_id = '${req.session.user_id}';`
    )
    console.log('result', result);
    await res.render('mypage', {data: result}); 
}

// 마이페이지 유저 정보 변경
exports.user_update = (req, res) => {
    let newObj = {
        user_name : req.body.user_name, 
        user_email : req.body.user_email, 
        user_password : req.body.user_password, 
        category1 : req.body.category1,
        category2 : req.body.category2,
        category3 : req.body.category3
    }
    Models.User.update( newObj, {where: {user_id: req.session.user_id}})
    .then((result) => {
        console.log(result);
        res.send('수정 성공');
    })
}

// 마이페이지 찜목록 화면
exports.mypage_likes = async (req, res) => {
    // 보내줄 좋아요 스터디 목록
    let sql = `SELECT G.*, L.study_id as likesStudy
	from user U
    left outer join likes L on U.user_id = L.user_id
    right outer join studygroup G on L.study_id = G.study_id
    WHERE U.user_id = '${req.session.user_id}';
    `
    const result = await sequelize.query(sql); 
    console.log('찜 목록 정보 : ', result);
    res.render('mypage2', {data: result[0]}); 
}

// 마이페이지 마이 스터디 화면
exports.mypage_studys = async (req,res) => {
    // 보내줄 내가 가입한 스터디 정보 
    let sqlMember = `
    SELECT G.*
	from user U
    left outer join studymember M on U.user_id = M.user_id
    right outer join studygroup G on M.study_id = G.study_id
    WHERE U.user_id = '${req.session.user_id}';`

    const memberStudy = await sequelize.query(sqlMember);
    console.log('내가 가입한 스터디 :', memberStudy);

    // 보내줄 내가 조장인 스터디 정보
    let sqlHead = `
    SELECT G.*
	from user U
    right outer join studygroup G on U.user_id = G.head_id
    WHERE U.user_id = '${req.session.user_id}';
    `
    const HeadStudy = await sequelize.query(sqlHead);
    console.log('내가 조장인 스터디 : ', HeadStudy);

    // 만약 가입한 스터디가 하나도 없다면? 
    var signStudy = true // 가입된 스터디가 있음
    if ( HeadStudy[0].length == 0 && memberStudy[0].length == 0) {
        signStudy = false // 가입된 스터디가 없음
    }
    console.log(signStudy);

    res.render('mypage3', {HeadStudy: HeadStudy[0], memberStudy: memberStudy[0], signStudy: signStudy}); 
}

