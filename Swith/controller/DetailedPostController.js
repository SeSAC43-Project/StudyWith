const models = require("../model");
const { sequelize } = require("../model/index"); 

/* 게시물 상세 조회 화면 렌더링*/
exports.detailedPost_index = async (req, res) => {

    //보내줄 데이터
    const [result, metadata] = await sequelize.query(`SELECT U.user_id, U.user_name, U.user_image, G.*
    from user U 
    inner join studygroup G on G.head_id = U.user_id
    WHERE G.study_id = ${req.query.study_id}
    UNION
    SELECT U.user_id, U.user_name, U.user_image, G.*
    FROM user U
    inner join studymember M on U.user_id = M.user_id 
    inner join studygroup G on G.study_id = M.study_id
    WHERE M.study_id = ${req.query.study_id};`);

    console.log("result:", result);

    //좋아요 여부
    var likeCheck = await models.Likes.findOne( {
        where: {
            user_id: req.session.user_id,
            study_id: req.query.study_id,
        }
    });
    console.log("likeCheck:", likeCheck);
    var islike;
    if ( likeCheck == null) {
        islike = false;
    } else {
        islike = true;
    }

    // 일반가입멤버인지 아닌지 check
    var memCheck = await models.Studymember.findOne( {
        where: {
            user_id: req.session.user_id,
            study_id: req.query.study_id,
        }
    });

    console.log("memCheck:", memCheck);

    if (memCheck == null || memCheck == undefined) { // 일반가입멤버가 아니면

        // 조장인지 아닌지 check
        var headCheck = await models.Studygroup.findOne( {
            where: {
                head_id: req.session.user_id,
                study_id: req.query.study_id,
            }
        });

        console.log("headCheck:", headCheck);

        if( headCheck == null || headCheck == undefined) { // 가입X
            console.log("가입x result:", result)
            return res.render('detailedPost3', {result: result, islike: islike});
        } else { // 조장이면
            return res.render('detailedPost', {result: result, islike: islike});
        }  
    } else { // 일반가입멤버이면
        return res.render('detailedPost2', {result: result, islike: islike});
    }
}


/* 일반멤버: 탈퇴하기 버튼 클릭시 정보 삭제*/
exports.delete_leavegroup =  (req, res) => {

    models.Studymember.destroy({ where: { 
        user_id: req.session.user_id,
        study_id: req.body.study_id } })
    .then((result) => {
        res.send("탈퇴완료");
    })
}

/* 가입안한 사람: 가입하기 버튼 클릭 시 정보 저장*/
exports.post_joingroup =  (req, res) => {

    let object = {
        user_id: req.session.user_id,
        study_id: req.body.study_id
    };

    models.Studymember.create( object )
    .then((result) => {
        res.send("가입완료");
    })
}
