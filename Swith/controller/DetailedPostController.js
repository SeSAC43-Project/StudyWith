const models = require("../model");
const { sequelize } = require("../model/index"); 

/* 게시물 상세 조회 화면 렌더링*/
exports.detailedPost_index = async (req, res) => {

    // 일반가입멤버인지 아닌지 check
    const [isMember_results, metadata1] = await sequelize.query(`SELECT * from studymember where studymember.user_id='${req.query.user_id}' AND studymember.study_id=${req.query.study_id};`);

    if ( isMember_results.length === 0 ) { // 일반가입멤버가 아니면

        // 조장인지 아닌지 check
        const [isHead_results, metadata3] = await sequelize.query(`SELECT * from studygroup  where studygroup.head_id='${req.query.user_id}' AND studygroup.study_id=${req.query.study_id};`);

        if ( isHead_results.length === 0 ) { // 가입X 이면

            const [isnotgroup_results, metadata6] = await sequelize.query(
                `SELECT U.user_id, U.user_name, U.user_image, G.study_id, G.head_id, G.study_name, G.study_content, G.study_form, G.study_address, G.study_recruit, G.study_category, G.study_image, G.study_content, G.start_period, G.end_period, G.hashtag, G.study_views
                FROM studygroup G
                LEFT JOIN studymember AS M
                ON G.study_id = M.study_id
                LEFT JOIN user AS U
                    ON U.user_id = M.user_id
                WHERE G.study_id = ${req.query.study_id}; `);

            console.log("가입X result:", isnotgroup_results);

            return res.render('detailedPost3', {result: isnotgroup_results});

        } else { // 조장이면
           
            const [isHead_results, metadata6] = await sequelize.query(
                `SELECT U.user_id, U.user_name, U.user_image, G.study_id, G.head_id, G.study_name, G.study_content, G.study_form, G.study_address, G.study_recruit, G.study_category, G.study_image, G.study_content, G.start_period, G.end_period, G.hashtag, G.study_views
                FROM studygroup G
                LEFT JOIN studymember AS M
                ON G.study_id = M.study_id
                LEFT JOIN user AS U
                    ON U.user_id = M.user_id
                WHERE G.study_id = ${req.query.study_id}; `);

            console.log("조장O result:", isHead_results);

            return res.render('detailedPost', {result: isHead_results});
        }  

    } else { // 일반가입멤버이면

        const [member_data, metadata2] = await sequelize.query(`SELECT M.user_id, U.user_name, U.user_image, G.study_id, G.head_id, G.study_name, G.study_content, G.study_form, G.study_address, G.study_recruit, G.study_category, G.study_image, G.study_content, G.start_period, G.end_period, G.hashtag, G.study_views from user U 
            inner join studymember M on M.user_id = U.user_id inner join studygroup G on G.study_id = M.study_id where M.study_id=${req.query.study_id};`);

        console.log("일반멤버o result:", member_data);

        return res.render('detailedPost2', {result: member_data});
        
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
