const express = require('express'); 
const UserRouter = express.Router();
const login = require('../controller/LoginController');
const signUp = require('../controller/SignUpController');
const multer = require('multer'); 

const profileUpload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'public/'); // 파일 저장위치: public/
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, req.body.id + Date.now() + ext ); // 파일이름: id+현재날짜.확장자
        },
    }),
    limits: { fileSize: 5*1024*1024 },
});

/* 로그인 관련 */
UserRouter.get('/login', login.login_index); 

/* 회원가입 관련 */
UserRouter.post('/signup', signUp.post_user);
UserRouter.post('/signup/upload', profileUpload.single('view input value name'), signUp.uploadProfile);


module.exports = UserRouter;