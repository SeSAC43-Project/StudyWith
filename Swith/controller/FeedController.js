const Models  = require('../model');
const fs = require('fs').promises;

// 게시물 등록 페이지 렌더링
exports.write_index = (req, res) => {
    res.render('feed'); 
}

// 게시물 등록  
exports.post_write = (req, res) => {

    let study_image = '';

    if ( req.body.study_image == '') { 
        // group 이미지가 없을 경우 기본이미지 지정
        study_image = 'group_default.jpg';
    } else {
        study_image = req.body.study_image;
    }

    // 게시물 등록 정보
    let Obj = { 
        head_id : req.session.user_id,
        study_category : req.body.study_category, 
        study_name : req.body.study_name,
        study_form : req.body.study_form, 
        study_recruit : req.body.study_recruit,
        study_address : req.body.study_address, 
        study_image : study_image, 
        study_content : req.body.study_content, 
        start_period : req.body.start_period, 
        end_period : req.body.end_period, 
        hashtag: req.body.hashtag, 
    }; 
    
    Models.Studygroup.create( Obj )
    .then((result) => {
        console.log(result);
        res.send({isResult: true, result: result});
    })
}

// 게시물 등록시, 프로필 이미지 저장 
exports.uploadProfile = (req, res) => {
    console.log('req.file : ', req.file); 
    console.log('req.body.name : ', req.body.name); 
    
    if ( req.body.name != '') {
        // 넘어온 filename으로 이전 파일 삭제
        // 그냥 띄워보기만 하는 이미지 무한 저장하는 것 방지
        try{
            fs.unlink('./public/group/' + req.body.name)
        } catch(err) {
            console.error('there was an error :', error.message)
        }
    }
    res.json({
        success: true,
        study_image: req.file.path,
        fileName: req.file.filename,
        name : req.file.name, // 이전 파일 이름
    })
}
