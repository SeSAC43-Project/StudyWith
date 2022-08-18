CREATE DATABASE swith;

USE swith;

CREATE TABLE user (
	user_id VARCHAR(20) NOT NULL PRIMARY KEY,
    user_password VARCHAR(45) NOT NULL,
    hint VARCHAR(100) NOT NULL,
    hint_answer VARCHAR(50) NOT NULL,
    user_name VARCHAR(20) NOT NULL,
    user_email VARCHAR(45) NOT NULL,
    user_image VARCHAR(100) NOT NULL,
    category1 VARCHAR(20) NOT NULL,
    category2 VARCHAR(20) NOT NULL,
    category3 VARCHAR(20) NOT NULL,
    join_date DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE studygroup (
	study_id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    head_id VARCHAR(45) NOT NULL,
    FOREIGN KEY (`head_id`) REFERENCES `user` (`user_id`),
    study_name VARCHAR(20) NOT NULL,
    study_form VARCHAR(45) NOT NULL,
    study_recruit INT NOT NULL,
    study_address VARCHAR(50) NOT NULL,
    study_image VARCHAR(45) NOT NULL,
    study_content MEDIUMTEXT NOT NULL,
    start_period DATETIME NOT NULL,
    end_period DATETIME NOT NULL,
    study_regdate DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    hasgtag MEDIUMTEXT,
    study_views INT DEFAULT 0
);


----------------------------------------------------------
-- 테스트 코드

-- 로그인 테스트
insert into user values('aa', '1234', '1', 'swith', 'swith', 'swith@naver.com', 'image', 'study', 'coding', 'coding', '2022-08-16');

--스터디 그룹 테스트
INSERT INTO studygroup (head_id, study_name, study_form, study_recruit,study_address,study_image,study_content,start_period,end_period,hasgtag)
VALUES("aa", "swith", "온라인", 6, "서울시 영등포구 문래동", "public/studygroup/12314","안녕하세요 swith입니다", '2022-08-16', '2022-12-30', "#공부#그룹#화이팅" );


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

