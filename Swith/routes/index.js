const express = require('express'); 
const UserRouter = express.Router();
const FeedRouter = express.Router();
const detailedPostRouter = express.Router();
const login = require('../controller/LoginController');
const signUp = require('../controller/SignUpController');
const feed = require('../controller/FeedController');
const detailedPost = require('../controller/DetailedPostController');
const main = require('../controller/MainController');
const multer = require('multer');
const path = require('path');

/* 프로필 이미지 업로드 */
const profileUpload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'public/user/'); // 파일 저장위치: public/user/
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null,  Date.now() + ext ); // 파일이름: id+현재날짜.확장자
        },
    }),
    limits: { fileSize: 5*1024*1024 },
});

/* 로그인 관련 */
UserRouter.get('/login', login.login_index); // 로그인 화면
UserRouter.post('/login',login.post_login); // 로그인 실행
UserRouter.get('/find',login.find_index); // 비밀번호 찾기 화면
UserRouter.post('/find',login.post_find); // 비밀번호 찾기 실행 
UserRouter.post('/modify',login.post_modify); // 비밀번호 변경 화면
UserRouter.post('/update', login.post_update); // 비밀번호 변경 실행

/* 회원가입 관련 */
UserRouter.get('/signup', signUp.signUp_index); //회원가입 화면
UserRouter.post('/signup', signUp.post_user); // 회원가입
UserRouter.post('/signup/upload', profileUpload.single('profileImg'), signUp.uploadProfile); // 프로필 이미지 업로드
UserRouter.post('/signup/isId', signUp.isId); // 아이디 중복검사
UserRouter.post('/signup/isName', signUp.isName); // 닉네임 중복검사

/* 게시물 관련 */
FeedRouter.get('/write', feed.write_index); // 게시물 등록 index

/* 게시물 상세 조회 관련 */
detailedPostRouter.get('/detailPost', detailedPost.detailedPost_index); //게시물 상세 조회 화면

module.exports = {
    UserRouter, 
    FeedRouter,
    detailedPostRouter
}