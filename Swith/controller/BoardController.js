const Models  = require('../model');

// 스터디라운지 조회 페이지 
exports.studylounge_index = async(req, res) => {
    // 보내줄 데이터 
    const [studyname] = await Models.sequelize.query(`
        SELECT study_name 
        FROM studygroup 
        WHERE study_id = ${req.query.study_id}; 
    `)
    console.log(studyname[0]);

    const [result, metadata] = await Models.sequelize.query(`
        SELECT L.*, U.user_name AS write_name, G.study_name
        FROM studylounge AS L
        LEFT OUTER JOIN user AS U ON L.user_id = U.user_id
        LEFT OUTER JOIN studygroup AS G ON L.study_id = G.study_id
        WHERE L.study_id = ${req.query.study_id}; 
        `
    );
        
    console.log('게시물 result: ', result);

    // 만약 게시물이 하나도 없다면? 
    var isBoard = true // 게시물이 있음 
    if (result.length == 0 ){
        isBoard = false // 게시물이 없음
    }
    console.log('게시물 유무', isBoard)
    
    res.render('board', {isBoard: isBoard , boardData : result, studyname: studyname[0]});
}

// 스터디 라운지 게시물 등록 화면
exports.lounge_write = (req, res) => {
    res.render('boardPost', {study_id:req.query.study_id});
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
        SELECT U.user_name AS write_name, L.* , G.study_name, R.*, R.user_id AS reply_writer
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
    const board_data = result;

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

    res.render('boardDetail', {isData: isData, detailData : result, replynames: replynames, currentUser:req.session.user_id});
}

// 스터디 라운지 상세조회 댓글 등록 기능
exports.post_reply = (req, res) => {
    let Obj = {
        lounge_id : req.body.lounge_id, 
        user_id : req.session.user_id, 
        reply_contents : req.body.reply_contents, 
    };
    Models.Reply.create( Obj )
    .then((result) => {
        console.log(result);
        res.send({isResult: true, result: result})
    })
}

// 스터디 라운지 게시물 삭제 기능
exports.board_remove = async(req, res) => {
    // 댓글 정보 먼저 삭제 후 라운지 게시물 삭제
    await Models.Reply.destroy({
        where: {lounge_id : req.body.lounge_id}
    }); 
    
    await Models.Studylounge.destroy({
        where: {lounge_id: req.body.lounge_id}
    });

    await res.send("success delete");
}


// 스터디 라운지 댓글 삭제 기능
exports.reply_remove = (req, res) => {
    Models.Reply.destroy({
        where: {reply_id : req.body.reply_id}
    });

    res.send("success delete");
}