const Models  = require('../model');

// 스터디라운지 조회 페이지 
exports.studylounge_index = async(req, res) => {
    // 보내줄 데이터 
    const [result, metadata] = await Models.sequelize.query(`
        SELECT L.*, U.user_name AS write_name
        FROM studylounge AS L
        LEFT OUTER JOIN user AS U ON L.user_id = U.user_id
        WHERE L.study_id = ${req.query.study_id}; 
        `
    );
        
    console.log('게시물 result: ', result);
    
    res.render('board', {boardData : result});
}

exports.post_studylounge = (req, res) => {
    
}