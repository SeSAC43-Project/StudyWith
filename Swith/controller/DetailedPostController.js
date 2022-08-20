const models = require("../model");
const { sequelize } = require("../model/index"); 

/* 게시물 상세 조회 화면 렌더링*/
exports.detailedPost_index = async (req, res) => {

    // 그룹장인지 아닌지 검사
    const isHead_results= await sequelize.query(`SELECT * from user 
        inner join studygroup on studygroup.head_id=user.user_id 
        where user.user_id='${req.query.user_id}' AND studygroup.study_id=${req.query.study_id};`);

    if (isHead_results == null ) { // 그룹장이 아니면 멤버인지 아닌지 검사
        const isMember_results = await sequelize.query(`SELECT * from user 
            inner join studymember on studymember.user_id=user.user_id 
            where user.user_id='${req.query.user_id}' AND studymember.study_id=${req.query.study_id};`);
        
        await models.Studygroup.findOne({
            where: {study_id: req.query.study_id}
        }).then((result) => {
            if (isMember_results != null) { // 멤버이면
                return res.render('detailedPost', {result: result, isMember: true, isHead: false})
            } else { // 가입안한 사람이면
                return res.render('detailedPost', {result: result, isMember: false, isHead: false})
            }
        });
    } else { // 그룹장이면
        await models.Studygroup.findOne({
            where: {study_id: req.query.study_id}
        }).then((result) => {
            console.log("result:", result);
            return res.render('detailedPost', {result: result, isMember: true, isHead: true})
        });
    }
}


/* 조장: 게시물 수정하러가기 클릭 시 정보 저장*/
exports.get_editgroup =  (req, res) => {

    models.Studygroup.findOne({
        where: {study_id: req.query.study_id}
    }).then((result) => {
        console.log('Studygroup 정보:', result); 
        res.render(); // 게시물 수정화면으로 이동(아직 미정)
    });
}

/* 일반멤버: 탈퇴하기 버튼 클릭시 정보 삭제*/
exports.delete_leavegroup =  (req, res) => {

    models.Studymember.destroy({ where: { 
        user_id: req.body.user_id,
        study_id: req.body.study_id } })
    .then((result) => {
        res.send("탈퇴완료");
    })
}

/* 가입안한 사람: 가입하기 버튼 클릭 시 정보 저장*/
exports.post_joingroup =  (req, res) => {

    let object = {
        user_id: req.body.user_id,
        study_id: req.body.study_id
    };

    models.Studymember.create( object )
    .then((result) => {
        res.send("가입완료");
    })
}
