const Models  = require('../model');

// 게시물 등록 페이지 렌더링
exports.write_index = (req, res) => {
    res.render('feed'); 
}

// 게시물 등록  
exports.post_write = (req, res) => {
    let Obj = {
        head_id : req.body.head_id, 
        study_category : req.body.study_category, 
        study_name : req.body.study_name,
        study_form : req.body.study_form, 
        study_recruit : req.body.study_recuit, 
        study_address : req.body.study_address, 
        study_image : req.body.study_image, 
        study_content : req.body.study_content, 
        start_period : req.body.start_period, 
        end_period : req.body.end_period, 
        study_regdate : Date.now(), 
        hashtag : req.body.hashtag, 
        study_views : 0, 
    }; 
    Models.Studygroup.create( Obj )
    .then((result) => {
        console.log(result);
        res.send({id: result.id});
    })
}