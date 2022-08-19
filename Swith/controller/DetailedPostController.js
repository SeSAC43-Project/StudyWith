const models = require("../model");

/* 게시물 상세 조회 화면 */
exports.detailedPost_index = async (req, res) => {

    // 그룹장인지 아닌지 검사
    const [isHead_results, metadata] = await sequelize.query(`SELECT * from user inner join studygroup on studygroup.head_id=user.user_id where user.user_id='${req.query.user_id}' AND studygroup.study_id=${req.query.study_id};`);

    if (isHead_results == null ) { // 그룹장이 아니면 멤버인지 아닌지 검사
        const [isMember_results, metadata] = await equelize.query(`SELECT * from user inner join studymember on studymember.user_id=user.user_id where user.user_id='${req.query.user_id}' AND studymember.study_id=${req.query.study_id};`);
        
        await models.Studygroup.findOne({
            where: {study_id : req.body.study_id}
        }).then((result) => {

            if (isHead_results != null) { // 조장이면
                return res.send('detailedPost', {result: result, isMember: true, isHead: true})
            } else if (isMember_results != null) { // 멤버이면
                return res.send('detailedPost', {result: result, isMember: true, isHead: false})
            } else if (isMember_results == null) { // 가입안한 사람이면
                return res.send('detailedPost', {result: result, isMember: false, isHead: false})
            }
        });
    }  
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
        res.send(result);
    })
}

/* 조회수 정보 저장 */
exports.post_views = (req, res) => {

}