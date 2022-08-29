CREATE DATABASE swith; -- DB 생성 

USE swith; -- DB 사용
 
-- TABLE 생성
CREATE TABLE user (
	user_id VARCHAR(20) NOT NULL PRIMARY KEY, -- 유저 id
    user_password VARCHAR(45) NOT NULL, -- 유저 비밀번호
    hint VARCHAR(10) NOT NULL, -- 비밀번호 찾기 질문 (1, 2, 3, ..)
    hint_answer VARCHAR(50) NOT NULL, -- 비밀번호 찾기 답
    user_name VARCHAR(6) NOT NULL, -- 유저 닉네임
    user_email VARCHAR(45) NOT NULL, -- 유저 이메일
    user_image VARCHAR(100) DEFAULT 'user_default.jpg', -- 유저 프로필 이미지
    category1 VARCHAR(20) NOT NULL, -- 관심 카테고리 1
    category2 VARCHAR(20) NOT NULL, -- 관심 카테고리 2
    category3 VARCHAR(20) NOT NULL, -- 관심 카테고리 3
    join_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP -- 유저 가입 날짜
);

CREATE TABLE studygroup (
	study_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- 스터디 그룹 id
    head_id VARCHAR(20) NOT NULL, -- 그룹장의 user_id
    FOREIGN KEY (`head_id`) REFERENCES `user` (`user_id`),
    study_name VARCHAR(20) NOT NULL, -- 그룹 명
    study_category VARCHAR(10) NOT NULL, -- 그룹 카테고리 
    study_form VARCHAR(45) NOT NULL, -- 그룹 형식 (온라인, 오프라인)
    study_recruit VARCHAR(3) NOT NULL, -- 그룹 모집 인원 수
    study_address VARCHAR(50), -- 오프라인일 경우 주소
    study_image VARCHAR(100) DEFAULT 'group_default.jpg', -- 그룹 프로필 이미지
    study_content MEDIUMTEXT NOT NULL, -- 그룹 소개
    start_period DATE NOT NULL, -- 그룹 시작일
    end_period DATE NOT NULL, -- 그룹 종료일 
    study_regdate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP, -- 그룹 게시물 등록 날짜
    hashtag MEDIUMTEXT, -- 해시태그 (#으로 구분)
    study_views INT DEFAULT 0 -- 조회수
);

CREATE TABLE studymember (
    member_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- primary key 있어야해서 생성함
	study_id INT NOT NULL, -- 스터디 그룹 id
    user_id VARCHAR(20) NOT NULL, -- 그룹장이 아닌 일반 멤버의 user_id
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
    FOREIGN KEY (`study_id`) REFERENCES `studygroup` (`study_id`)
);

CREATE TABLE likes (
    likes_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, -- primary key 있어야해서 생성함
    user_id VARCHAR(20) NOT NULL, -- 좋아요 한 유저의 id
    study_id INT NOT NULL, -- 좋아요 한 스터디 그룹 id
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
    FOREIGN KEY (`study_id`) REFERENCES `studygroup` (`study_id`)
);

CREATE TABLE studylounge (
    lounge_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    user_id VARCHAR(20) NOT NULL, 
    study_id INT NOT NULL,
    title VARCHAR(20) NOT NULL, 
    lounge_contents MEDIUMTEXT NOT NULL,
    lounge_regdate DATE,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
    FOREIGN KEY (`study_id`) REFERENCES `studygroup` (`study_id`)
);

CREATE TABLE reply (
    reply_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY, 
    lounge_id INT NOT NULL, 
    user_id VARCHAR(20) NOT NULL, 
    study_id INT NOT NULL,
    reply_contents VARCHAR(200) NOT NULL,
    relpy_regdate DATETIME,
    FOREIGN KEY (`user_id`) REFERENCES `user` (`user_id`),
    FOREIGN KEY (`study_id`) REFERENCES `studygroup` (`study_id`),
    FOREIGN KEY (`lounge_id`) REFERENCES `studylounge` (`lounge_id`)
);

-- table 삭제
drop table likes; 
drop table studymember; 
drop table studygroup; 
drop table user;

----------------------------------------------------------
--* 테스트 코드

-- 로그인 테스트
insert into user values('aa', '1234', '1', 'swith', 'swith', 'swith@naver.com', 'image', 'study', 'coding', 'coding', '2022-08-16');

--스터디 그룹 테스트
INSERT INTO studygroup (head_id, study_name, study_category, study_form, study_address, study_recruit, study_image, study_content, start_period, end_period, hashtag) VALUES("aa", "swith", "IT", "오프라인", "서울시 영등포구 문래동","6", "123456789.jpg","안녕하세요 swith입니다", '2022-08-16', '2022-12-30', "#공부#그룹#화이팅" );

-- 조회 test
SELECT * FROM user;
SELECT * FROM studygroup;
SELECT * FROM studymember;

-- 스터디 가입 테스트
INSERT INTO studymember (study_id, user_id) VALUES (1, "aa");

-- 삭제 테스트
DELETE FROM user WHERE user_id='aa';

-- 게시물 테스트
insert into studylounge values('1', 'aa', '1', '스터디 공지', '문래역 1번 출구에서 만나요!', '2022-08-29');

-- 댓글 테스트
insert into reply values('1', '1', 'bb', '1', '좋아요 저는 참석 가능', '2022-08-29');

----------------------------------------------------------
--* Back 참고용
--좋아요 수 카운트
SELECT COUNT(*) FROM user WHERE user_id=1;


--규리쌤이 알려주신 join
create database test;
use test;
create table user (
	user_id int(2) not null primary key,
    username varchar(4) 
);

insert into user values (4,'abcd');

create table studygroup (
	study_id int(2) not null primary key,
    user_id int(2) not null,
    studyname varchar(10),
    foreign key (user_id) references user(user_id)
    );

insert into studygroup values(2,4,'sesac4');
    
create table studymember (
	id int(5) not null primary key,
    study_id int(2) not null,
    user_id int(2) not null,
    foreign key (study_id) references studygroup(study_id),
    foreign key (user_id) references user(user_id)
);

insert into studymember values(5,2,3);
    
    
select * from studymember;
select * from studygroup inner join user on user.user_id = studygroup.user_id where study_id=1;
SELECT * from user inner join studymember on studymember.user_id = user.user_id inner join studygroup on studygroup.study_id = studymember.study_id;

