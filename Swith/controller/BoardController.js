const Models  = require('../model');

// 스터디라운지 조회 페이지 
exports.studylounge_index = async(req, res) => {
    // 맨위에 이동 및 스터디 표시 위하여 보내줄 스터디 데이터(게시물없어도 나와야함)
    const [studydata] = await Models.sequelize.query(`
        SELECT study_name, study_id
        FROM studygroup 
        WHERE study_id = ${req.query.study_id}; 
    `)

    // 게시물 관련 데이터
    const [result, metadata] = await Models.sequelize.query(`
        SELECT L.*, U.user_name AS write_name
        FROM studylounge AS L
            LEFT OUTER JOIN user AS U ON L.user_id = U.user_id
        WHERE L.study_id = ${req.query.study_id}; 
    `);
        
    console.log('게시물 result: ', result);

    // 만약 게시물이 하나도 없다면? 
    var isBoard = true // 게시물이 있음 
    if (result.length == 0 ){
        isBoard = false // 게시물이 없음
    }
    console.log('게시물 유무', isBoard)
    
    res.render('board', {isBoard: isBoard , boardData : result, studydata: studydata[0]});
}

// 스터디 라운지 게시물 등록 화면
exports.lounge_write = async(req, res) => {
    // 위치이동 및 스터디 이름 위한 스터디 정보
    const [studydata] = await Models.sequelize.query(`
        SELECT study_name, study_id
        FROM studygroup 
        WHERE study_id = ${req.query.study_id}; 
    `)

    console.log('여기가 스터디데이터', studydata);
    await res.render('boardPost', {studydata: studydata[0]});
}

// 스터디 라운지 게시물 등록
exports.post_studylounge = (req, res) => {
    let Obj = {
        user_id : req.session.user_id, 
        study_id : req.body.study_id, 
        title : req.body.title, 
        lounge_contents : req.body.lounge_contents
    };
    Models.Studylounge.create( Obj )
    .then((result) => {
        console.log(result);
        res.send({isResult: true, result: result})
    })
}

// 스터디 라운지 상세조회 화면
exports.lounge_detail = async(req, res) => {
    // 보내줄 데이터 
    const [result, metadata] = await Models.sequelize.query(`
        SELECT U.user_name AS write_name, L.* , G.study_name, R.*, R.user_id AS reply_writer, L.lounge_id AS real_lounge, L.user_id AS realUser_id
        FROM studylounge AS L
        LEFT OUTER JOIN user AS U ON L.user_id = U.user_id
        LEFT OUTER JOIN studygroup AS G ON L.study_id = G.study_id
        LEFT OUTER JOIN reply AS R ON L.lounge_id = R.lounge_id
        WHERE L.lounge_id = ${req.query.lounge_id}; 
        `
    );
    console.log('게시물 result: ', result);


    // 댓글 작성자 닉네임 리스트 생성
    var replynames = []
    var isReply = true;
    const board_data = result;
    // 만약 댓글 작성자가 있다면 
    if (board_data[0].reply_id != null) {
        // 댓글 작성자 닉네임 확인
        for (let i=0; i < board_data.length; i++) {
            let checkname = `
            SELECT U.user_name AS reply_name
            FROM reply AS R 
            INNER JOIN user AS U ON R.user_id = U.user_id
            WHERE R.user_id = '${board_data[i].reply_writer}';`
            
            const result2 = await Models.sequelize.query(checkname); 
            const namedata = result2[0];
            replynames.push(namedata[0].reply_name);
            console.log(namedata);
        }
        console.log(replynames);
    
        // 만약 게시물 없으면 (게시글이없으면 댓글도 없으므로 게시글만 체크)
        var isData = true // 게시물이 있음 
        if (result.length == 0 ){
            isData = false // 게시물이 없음
        }
        console.log('게시물 유무', isData)
    } else {
        // 댓글 작성자가 없다면
        isReply = false;
    }

    res.render('boardDetail', {isData: isData, detailData : result, isReply:isReply, replynames: replynames, currentUser:req.session.user_id});
}

// 스터디 라운지 상세조회 댓글 등록 기능
exports.post_reply = async(req, res) => {
    // 새로 추가되는 댓글 데이터
    let Obj = {
        lounge_id : req.body.lounge_id, 
        user_id : req.session.user_id, 
        reply_contents : req.body.reply_contents, 
    };
    // 댓글 DB에 추가
    const newReply = await Models.Reply.create( Obj );

    // 댓글 작성자 닉네임 불러오기 
    const replyname = await Models.sequelize.query(`
        SELECT U.user_name
        FROM user AS U
        INNER JOIN reply AS R ON U.user_id = R.user_id
        WHERE R.user_id = '${newReply.user_id}'
        GROUP BY R.user_id;
    `); 

    console.log('여기가 닉네임!!!!!!!!!',replyname[0]);

    res.send({isResult: true, result: newReply, replyname: replyname[0]})
};

// 스터디 라운지 게시물 삭제 기능
exports.board_remove = async(req, res) => {
    // 댓글 정보 먼저 삭제 후 라운지 게시물 삭제
    await Models.Reply.destroy({
        where: {lounge_id : req.body.lounge_id}
    }); 
    
    await Models.Studylounge.destroy({
        where: {lounge_id: req.body.lounge_id}
    });

    // await res.send("success delete");
    await res.send(true);
}


// 스터디 라운지 댓글 삭제 기능
exports.reply_remove = (req, res) => {
    Models.Reply.destroy({
        where: {reply_id : req.body.reply_id}
    });

    // res.send("success delete");
    res.send(true);
}