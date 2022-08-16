const models = require("../model");


//회원가입 시, 프로필 이미지 저장


//회원가입 시, id 중복확인


//회원가입 시, 닉네임 중복확인


//회원가입 시, User 정보 저장
exports.post_user = (req, res) => {

    let object = {
        user_id: req.body.user_id,
        user_password: req.body.user_password,
        hint: req.body.hint,
        hint_answer: req.body.hint_answer,
        user_name: req.body.user_name,
        user_email: req.body.user_email,
        user_image: req.body.user_image,
        category1: req.body.category1,
        category2: req.body.category2,
        category3: req.body.category3,
    };

    models.User.create( object )
    .then((result) => {
        res.send({ id: result.id });
    })
}