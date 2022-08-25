const Models  = require('../model');

// 마이페이지 유저 페이지
exports.mypage_index = async (req, res) => {
    // 보내줄 유저 데이터 
    const [result, metadata] = await Models.sequelize.query(
        `SELECT * FROM user WHERE user_id = '${req.session.user_id}';`
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
    let sql = `
    SELECT G.*, L.study_id AS likesStudy
	FROM user AS U
    LEFT OUTER JOIN likes AS L ON U.user_id = L.user_id
    RIGHT OUTER JOIN studygroup AS G ON L.study_id = G.study_id
    WHERE U.user_id = '${req.session.user_id}';
    `
    const result = await Models.sequelize.query(sql); 
    console.log('찜 목록 정보 : ', result);

    // 만약 찜한 스터디가 하나도 없다면? 
    var isLikes = true // 찜한 스터디가 있음
    if ( result[0].length == 0) {
        isLikes = false // 가입된 스터디가 없음
    }
    res.render('mypage2', {data: result[0], isLikes: isLikes}); 
}


// 마이페이지 마이 스터디 화면
exports.mypage_studys = async (req,res) => {
    // 보내줄 내가 가입한 스터디 정보 
    let sqlMember = `
    SELECT G.*
	FROM user AS U
    LEFT OUTER JOIN studymember AS M ON U.user_id = M.user_id
    RIGHT OUTER JOIN studygroup AS G ON M.study_id = G.study_id
    WHERE U.user_id = '${req.session.user_id}';`

    const memberStudy = await Models.sequelize.query(sqlMember);
    console.log('내가 가입한 스터디 :', memberStudy);

    // 보내줄 내가 조장인 스터디 정보
    let sqlHead = `
    SELECT G.*
	FROM user AS U
    RIGHT OUTER JOIN studygroup AS G ON U.user_id = G.head_id
    WHERE U.user_id = '${req.session.user_id}';`

    const HeadStudy = await Models.sequelize.query(sqlHead);
    console.log('내가 조장인 스터디 : ', HeadStudy);

    // 만약 가입한 스터디가 하나도 없다면? 
    var signStudy = true // 가입된 스터디가 있음
    if ( HeadStudy[0].length == 0 && memberStudy[0].length == 0) {
        signStudy = false // 가입된 스터디가 없음
    }
    console.log(signStudy);
    await res.render('mypage3', {HeadStudy: HeadStudy[0], memberStudy: memberStudy[0], signStudy: signStudy}); 
}

