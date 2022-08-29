const Models  = require('../model');

// 스터디라운지 조회 페이지 
exports.studylounge_index = async(req, res) => {
    // 보내줄 데이터 
    const [result, metadata] = await Models.sequelize.query(`
        SELECT L.*, U.user_name AS write_name, G.study_name
        FROM studylounge AS L
        LEFT OUTER JOIN user AS U ON L.user_id = U.user_id
        LEFT OUTER JOIN studygroup AS G ON L.study_id = G.study_id
        WHERE L.study_id = ${req.query.study_id}; 
        `
    );
        
    console.log('게시물 result: ', result);
    
    res.render('board', {boardData : result});
}

// 스터디 라운지 게시물 등록
exports.post_studylounge = (req, res) => {
    let Obj = {
        user_id : req.session.user_id, 
        study_id : req.body.study_id, 
        title : req.bdoy.title, 
        lounge_contents : req.body.lounge_contents
    };
    Models.Studylounge.create( Obj )
    .then((result) => {
        console.log(result);
        res.send({isResult: true, result: result})
    })
}