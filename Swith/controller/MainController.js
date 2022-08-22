const Models  = require('../model');

// 메인 페이지 렌더링
exports.main_index = (req, res) => {
    res.render('main'); 
}

// 
exports.main_search = (req, res) => {
    if (req.body.search == "") { // 검색어가 없는 경우
        res.send(''); 
        return 
    }
    
    // 검색어가 있으면 검색 
    console.log('요긴 컨트롤러',req.body.search);
    
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
                }
            ]
        }
    })
    .then((result) => {
        console.log(result);
        res.render('search', {data: result, search: req.body.search});

        search 
        data[0].study_id
    })
}