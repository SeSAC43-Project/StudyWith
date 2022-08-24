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

    let newObj = {
        study_name: req.body.study_name,
        study_category: req.body.study_category,
        study_recruit: req.body.study_recruit,
        study_image: req.body.study_image,
        study_content: req.body.study_content,
        start_period: req.body.start_period,
        end_period: req.body.end_period,
        hasgtag: req.body.hasgtag
    }

    models.Studygroup.update( newObj, {
        where: { study_id: req.body.study_id }
    }).then((result) => {
        res.send("success update");
    });
}

/* 게시물 삭제 버튼 클릭 */
exports.delete_management = (req, res) => {

    models.Studygroup.destroy({
        where: { study_id: req.body.study_id }
    }).then((result) => {
        res.send("success delete");
    });
}