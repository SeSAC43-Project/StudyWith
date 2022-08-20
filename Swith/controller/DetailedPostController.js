const models = require("../model");
const { sequelize } = require("../model/index"); 

/* 게시물 상세 조회 화면 렌더링*/
exports.detailedPost_index = async (req, res) => {

    const headSql = `SELECT M.user_id, U.user_name, U.user_image, G.study_id, G.head_id, G.study_name, G.study_content, G.study_form, G.study_address, G.study_recruit, G.study_category, G.study_image, G.study_content, G.start_period, G.end_period, G.hashtag, G.study_views from user U 
        inner join studygroup G on G.head_id = U.user_id 
        inner join studymember M on M.study_id = G.study_id 
        where U.user_id='${req.query.user_id}' AND G.study_id=${req.query.study_id};`;

    // 그룹장인지 아닌지 검사
    const [isHead_results, metadata] = await sequelize.query(headSql);

    if ( isHead_results.length === 0 ) { // 그룹장이 아니면 멤버인지 아닌지 검사

        const memberSql = `SELECT M.user_id, U.user_name, U.user_image, G.study_id, G.head_id, G.study_name, G.study_content, G.study_form, G.study_address, G.study_recruit, G.study_category, G.study_image, G.study_content, G.start_period, G.end_period, G.hashtag, G.study_views from user U 
            inner join studymember M on M.user_id = U.user_id
            inner join studygroup G on G.study_id = M.study_id 
            where U.user_id='${req.query.user_id}' AND M.study_id=${req.query.study_id};`;

        const [isMember_results, metadata1] = await sequelize.query(memberSql); //멤버인지 가입안한 사람인지 검사
        console.log("isMember_results 값:", isMember_results)
        const DataSql = `SELECT M.user_id, U.user_name, U.user_image, G.study_id, G.head_id, G.study_name, G.study_content, G.study_form, G.study_address, G.study_recruit, G.study_category, G.study_image, G.study_content, G.start_period, G.end_period, G.hashtag, G.study_views from user U 
            inner join studymember M on M.user_id = U.user_id
            inner join studygroup G on G.study_id = M.study_id 
            where M.study_id=${req.query.study_id};`

        const [results, metadata2] = await sequelize.query(DataSql); //보내줄 데이터

        if (isMember_results.length === 0 ) { // 가입 안한 사람이면
            return res.render('detailedPost', {result: results, isMember: false})
        } else { // 멤버이면
            return res.render('detailedPost', {result: results, isMember: true})
        }

    } else { // 그룹장이면
        console.log("isHead_results:", isHead_results);
        return res.render('detailedPost', {result: isHead_results})
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
