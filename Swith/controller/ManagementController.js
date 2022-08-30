const models = require("../model");
const { sequelize } = require("../model/index"); 


/* 게시물 수정 화면 페이지 이동 */
exports.get_management =  (req, res) => {

    models.Studygroup.findOne({
        where: { study_id: req.query.study_id }
    }).then((result) => {
        console.log('Studygroup 정보:', result); 
        res.render('management', {result: result});
    });
}


/* 게시물 수정 버튼 클릭 */
exports.patch_management = (req, res) => {

    let study_image = '';

    if ( req.body.study_image == '') { // user 이미지가 없을 경우
        study_image = 'group_default.jpg';
    } else {
        study_image = req.body.study_image;
    }

    let newObj = {
        study_name: req.body.study_name,
        study_category: req.body.study_category,
        study_recruit: req.body.study_recruit,
        study_image: study_image,
        study_content: req.body.study_content,
        start_period: req.body.start_period,
        end_period: req.body.end_period,
        hashtag: req.body.hashtag,
    }

    models.Studygroup.update( newObj, {
        where: { study_id: req.body.study_id }
    }).then((result) => {
        res.send("success update");
    });
}

/* 게시물 삭제 버튼 클릭 */
exports.delete_management = async (req, res) => {
    // studymemeber, Likes 정보 먼저 삭제 후, studygroup 정보 삭제
    await models.Likes.destroy({
        where: { study_id: req.body.study_id }
    });
    
    await models.Studymember.destroy({
        where: { study_id: req.body.study_id }
    });
    
    await models.Studygroup.destroy({
        where: { study_id: req.body.study_id }
    });
    await res.send("success delete");
}
