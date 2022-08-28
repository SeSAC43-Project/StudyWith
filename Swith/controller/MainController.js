const Models  = require('../model');

// 메인 페이지 렌더링
exports.main_index = (req, res) => {
    var user_id;
    if (req.session.user_id != null) {
        user_id = req.session.user_id;
    } else {
        user_id = "";
    }
    res.render('main', {session_id: user_id}); 
}

// 메인 페이지 검색 기능
exports.main_search = async (req, res) => {
     // 검색어가 없는 경우 전체 스터디 정보 보여주기
    
    // 검색어가 있으면 검색 
    console.log('검색어 : ',req.body.search);
    console.log('카테고리 : ',req.body.category);

    let searchsql = `
    SELECT G.*, COUNT(M.user_id) + 1 AS num
        FROM studygroup G
        LEFT OUTER JOIN studymember M
        ON G.study_id = M.study_id 
        WHERE G.study_name LIKE '%${req.body.search}%' 
            OR G.study_category LIKE '%${req.body.search}%' 
            OR G.study_category LIKE '%${req.body.category}%' 
            OR G.hashtag LIKE '%${req.body.search}%'
        GROUP BY G.study_id;`;

    const result = await Models.sequelize.query(searchsql);
    console.log('검색 결과 :', result);

    // 좋아요 정보 넣을 리스트 생성
    var likeList = []
    const study_data = result[0];

    // 유저가 좋아요 했는 지 확인
    for (let i=0; i < study_data.length; i++) {
        let likesql = `
        SELECT COUNT(*) AS likes
        FROM likes 
        WHERE user_id = '${req.session.user_id}' and study_id ='${study_data[i].study_id}';`
        
        const result2 = await Models.sequelize.query(likesql);
        const likedata = result2[0];
        likeList.push(likedata[0].likes);
    }

    console.log(likeList);

    await res.render('search', {data: result[0], search: req.body.search, category: req.body.category, likeList: likeList});
    }


// search 페이지에서 상세페이지로 가는 루트 
exports.search_detail = (req, res) => {
    console.log('req.body.study_id', req.body.study_id); 
    res.send({study_id: req.body.study_id, user_id: req.session.user_id});
}

// search 페이지에서 카테고리마다 게시글 검색되도록 
exports.search_category = async (req, res) => {
    let categorySql = `
    SELECT G.*, COUNT(M.user_id) + 1 AS num
    FROM studygroup AS G
    LEFT OUTER JOIN studymember AS M ON G.study_id = M.study_id 
    WHERE G.study_category LIKE '%${req.body.study_category}%'
    GROUP BY G.study_id;`;

    const result = await Models.sequelize.query(categorySql);
    console.log('여기가 카테고리 ', result);

    // 좋아요 정보 넣을 리스트 생성
    var likeList = []
    const cate_data = result[0];

    // 유저가 좋아요 했는 지 확인
    for (let i=0; i < cate_data.length; i++) {
        let likesql = `
        SELECT COUNT(*) AS likes
        FROM likes 
        WHERE user_id = '${req.session.user_id}' and study_id ='${cate_data[i].study_id}';`
        
        const result2 = await Models.sequelize.query(likesql);
        const likedata = result2[0];
        likeList.push(likedata[0].likes);
    }

    console.log(likeList);

    await res.send({data: result[0], flag:true, likeList: likeList});
}

// 메인페이지 좋아요 기능
exports.main_likes = (req, res) => {
    let object = {
        study_id : req.body.study_id, 
        user_id : req.session.user_id
    }
    Models.Likes.create( object )
    .then((result) => {
        console.log('좋아요 결과는:',result);
        res.send({isLikes: true, study_id : req.body.study_id});
    })
}

// 메인페이지 좋아요 취소 기능
exports.likes_remove = (req, res) => {
    Models.Likes.destroy({
        where: {
            user_id : req.session.user_id, 
            study_id : req.body.study_id
        }
    }).then((result) => {
        console.log('좋아요 삭제: ', result);
        res.send({isDislikes: true, study_id : req.body.study_id});
    })
}