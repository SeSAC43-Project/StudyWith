const { User, Studygroup } = require("../model");
const models = require("../model");

/* 게시물 상세 조회 화면 */
exports.detailedPost_index = async (req, res) => {
    //study_id 값으로 조회해서 게시물 정보 읽어오고,
    //user_id 값으로 조회해서 멤버 가입되어 있는지 확인 (join)

    //보내줘야 할 정보: studygroup, studymember join 결과

    var result = await models.User.create( object );
    await res.send(result);

    var result = await User.create({id: result.id});
    await Studygroup.create();
}


/* 가입하기 버튼 클릭 시 정보 저장*/
exports.post_reggroup =  (req, res) => {
    console.log("post_reggroup: ", req.body);

    let object = {
        user_id: req.body.user_id,
        study_id: req.body.study_id
    };

    models.Studygroup.create( object )
    .then((result) => {
        res.send({ result: result });
    })
}

/* 조회수 정보 저장 */
exports.post_views = (req, res) => {

}