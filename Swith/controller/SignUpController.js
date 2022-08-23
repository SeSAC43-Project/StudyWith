const models = require("../model");
const fs = require("fs");

/* 회원가입 화면 */
exports.signUp_index = (req, res) => {
    res.render('signUp'); 
}

/* 회원가입 시, 프로필 이미지 저장 */
exports.uploadProfile = (req, res) => {
    console.log("req.file", req.file);
    console.log( req.body.name );

    if ( req.body.name != "" ){
       // 넘어온 filename으로 이전 파일 삭제
        // 그냥 띄워보기만 하는 이미지 무한 저장하는 것 방지
        try{
            fs.unlink('./public/user/' + req.body.name)
        } catch(err) {
            console.error('there was an error :', error.message)
        }
    }
    res.json({
        success: true,
        filepath: req.file.path,
        fileName: req.file.filename,
        name : req.file.name, // 이전 파일 이름
    });
}

/* 회원가입 시, id 중복확인 */
exports.isId = (req, res) => {
    models.User.findOne( {
        where: {user_id: req.body.user_id}
    })
    .then((result) => {
        console.log(result)
        if (result == null) { // id가 없어서 가져온 데이터가 없으면
            return res.send(true); // 사용 가능
        } else {
            return res.send(false); // 사용 불가능
        }
    })
}


/* 회원가입 시, 닉네임 중복확인 */
exports.isName = (req, res) => {
    models.User.findOne( {
        where: {user_name: req.body.user_name}
    })
    .then((result) => {
        console.log(result)
        if (result == null) { // id가 없어서 가져온 데이터가 없으면
            return res.send(true); // 사용 가능
        } else {
            return res.send(false); // 사용 불가능
        }
    })
}


/* 회원가입 시, User 정보 저장 */
exports.post_user = (req, res) => {
    console.log(req.body);
    
    let user_image = '';

    if ( req.body.user_image == '') { // user 이미지가 없을 경우
        user_image = 'user_default.jpg';
    } else {
        user_image = req.body.user_image;
    }

    let object = {
        user_id: req.body.user_id,
        user_password: req.body.user_password,
        hint: req.body.hint,
        hint_answer: req.body.hint_answer,
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_image: user_image,
        category1: req.body.category1,
        category2: req.body.category2,
        category3: req.body.category3,
    };

    models.User.create( object )
    .then((result) => {
        res.send(result);
    })
}