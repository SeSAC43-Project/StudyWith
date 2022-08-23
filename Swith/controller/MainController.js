const Models  = require('../model');

// 메인 페이지 렌더링
exports.main_index = (req, res) => {
    res.render('main'); 
}

// 메인 페이지 검색 기능
exports.main_search = (req, res) => {
    // if (req.body.search == "") { // 검색어가 없는 경우 전체 스터디 정보 보여주기
    //     res.render('main'); 
    //     return 
    // }
    
    // 검색어가 있으면 검색 
    console.log('검색어 : ',req.body.search);
    console.log('카테고리 : ',req.body.category);
    
    Models.Studygroup.findAll({
        where: {
            [Models.Op.or] : [
                {
                    hashtag : {
                        [Models.Op.like]: '%'+ req.body.search + '%'
                    }
                },
                {
                    study_name : {
                        [Models.Op.like]: '%'+ req.body.search + '%'
                    }
                }, 
                {
                    study_category : {
                        [Models.Op.like]: '%'+ req.body.search + '%'
                    }
                },
                {
                    study_category : {
                        [Models.Op.like]: '%'+ req.body.category + '%'
                    }
                }
            ]
        }
    })
    .then((result) => {
        console.log(result);
        res.render('search', {data: result, search: req.body.search, category: req.body.category});
    })
}

exports.search_detail = (req, res) => {
    console.log('req.body.study_id', req.body.study_id); 
    res.send({study_id: req.body.study_id, user_id: req.session.user_id});
}

exports.search_category = (req, res) => {
    Models.Studygroup.findAll({
        where: {  
            study_category : {
                [Models.Op.like]:'%'+ req.body.study_category + '%'
            }
        }
    })
    .then((result) => {
        console.log('여기가 카테고리 ', result);
        res.send({data: result, flag: true});
    })
}