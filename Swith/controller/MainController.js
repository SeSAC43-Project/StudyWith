const Models  = require('../model');

// 메인 페이지 렌더링
exports.main_index = (req, res) => {
    res.render('main'); 
}

exports.main_search = (req, res) => {
    if (req.query.search == "") { // 검색어가 없는 경우
        res.send(''); 
        return 
    }

    // 검색어가 있으면 검색 
    console.log('요긴 컨트롤러',req.query.search);

    Models.Studygroup.findAll({
        where: {
            [Models.Op.or] : [
                {
                    hashtag : {
                        [Models.Op.like]: '%'+ req.query.search + '%'
                    }
                },
                {
                    study_name : {
                        [Models.Op.like]: '%'+ req.query.search + '%'
                    }
                }
            ]
        }
    })
    .then((result) => {
        console.log(result);
        res.send({data: result});
    })
}