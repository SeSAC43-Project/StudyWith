const Models  = require('../model');

// 게시물 등록 페이지 렌더링
exports.write_index = (req, res) => {
    res.render('feed'); 
}