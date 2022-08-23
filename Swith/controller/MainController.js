const Models  = require('../model');

// 메인 페이지 렌더링
exports.main_index = (req, res) => {
    res.render('main'); 
}

// 메인 페이지 검색 기능
exports.main_search = (req, res) => {
    if (req.body.search == "") { // 검색어가 없는 경우
        res.send(''); 
        return 
    }
    
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
                        [Models.Op.like]: '%'+ req.body.category + '%'
                    }
                }
            ]
        }
    })
    .then((result) => {
        console.log(result);
        res.render('search', {data: result, search: req.body.search});

    })
}
