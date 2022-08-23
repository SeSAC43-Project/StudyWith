const models = require("../model");
const { sequelize } = require("../model/index"); 

/* 게시물 수정 화면 페이지 이동 */
exports.get_management =  async (req, res) => {

    models.Studygroup.findOne({
        where: { study_id: req.query.study_id }
    }).then((result) => {
        console.log('Studygroup 정보:', result); 
        res.render('management', {result: result});
    });
}
