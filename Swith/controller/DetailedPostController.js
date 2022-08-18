const models = require("../model");

/* 게시물 상세 조회 화면 */
exports.detailedPost_index = (req, res) => {
    //study_id 값으로 조회해서 게시물 정보 읽어오고,
    //user_id 값으로 조회해서 멤버 가입되어 있는지 확인 (join)
    models.Studygroup.findOne( {
        where: {study_id: req.body.study_id}
    })
    .then((result) => {
        console.log(result);
        result
    })
}