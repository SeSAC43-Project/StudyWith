const express = require('express'); 
const multer = require('multer');
const path = require('path');

/* user 프로필 이미지 업로드 */
const profileUpload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'public/user/'); // 파일 저장위치: public/user/
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, Date.now() + ext ); // 파일이름: 현재날짜시간정보.확장자
        },
    }),
    limits: { fileSize: 5*1024*1024 }, // filesize 제한: 5MB
});

/* group 이미지 업로드 */
const groupProfileUpload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, 'public/group/'); // 파일 저장위치: public/group/
        },
        filename(req, file, cb) {
            const ext = path.extname(file.originalname);
            cb(null, Date.now() + ext );
        },
    }),
    limits: { fileSize: 5*1024*1024 },
});

/* 로그인 관련 */
const UserRouter = express.Router();
const login = require('../controller/LoginController');
UserRouter.get('/login', login.login_index); // 로그인 화면
UserRouter.post('/login',login.post_login); // 로그인 실행
UserRouter.get('/find',login.find_index); // 비밀번호 찾기 화면
UserRouter.post('/find',login.post_find); // 비밀번호 찾기 실행 
UserRouter.post('/modify',login.post_modify); // 비밀번호 변경 화면
UserRouter.post('/update', login.post_update); // 비밀번호 변경 실행

/* 회원가입 관련 */
const signUp = require('../controller/SignUpController');
UserRouter.get('/signup', signUp.signUp_index); //회원가입 화면
UserRouter.post('/signup', signUp.post_user); // 회원가입
UserRouter.post('/signup/upload', profileUpload.single('profileImg'), signUp.uploadProfile); // 프로필 이미지 업로드
UserRouter.post('/signup/isId', signUp.isId); // 아이디 중복검사
UserRouter.post('/signup/isName', signUp.isName); // 닉네임 중복검사

/* 게시물 관련 */
const FeedRouter = express.Router();
const feed = require('../controller/FeedController');
const detailedPost = require('../controller/DetailedPostController');
FeedRouter.get('/write', checkSession, feed.write_index); // 게시물 등록 화면
FeedRouter.post('/write', feed.post_write); // 게시물 등록 실행
FeedRouter.post('/write/upload', groupProfileUpload.single('studyImage'), feed.uploadProfile); // 게시물 등록 내 스터디 이미지 업로드 
FeedRouter.get('/detailedPost', detailedPost.detailedPost_index); //게시물 상세 조회 화면
FeedRouter.get('/detailedPost/edit', detailedPost.get_editgroup); // 그룹장: 게시물 수정 페이지 이동
FeedRouter.delete('/detailedPost/leave', detailedPost.delete_leavegroup); // 일반멤버: 탈퇴기능
FeedRouter.post('/detailedPost/join', detailedPost.post_joingroup); // 가입안한사람: 가입기능


/* 메인페이지 관련 */
const MainRouter = express.Router();
const main = require('../controller/MainController');
MainRouter.get('/', main.main_index); // 메인페이지 화면
MainRouter.get('/search', main.main_serch); // 메인페이지 검색 기능


/* 로그인 확인 미들웨어 */
function checkSession (req, res, next) {
    req.session.user_id = 'aa'
    if (req.session.user_id != null) next(); 
    else {
        res.redirect('/user/login');
    }
}
/* 게시물 상세 조회화면 로그인 확인 추가 예정 */

module.exports = {
    UserRouter, 
    FeedRouter,
    MainRouter
}