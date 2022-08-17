create databse swith;

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
    join_date DATETIME NOT NULL
);

-- 로그인 테스트
insert into user values('aa', '1234', '이름은?', 'swith', 'swith', 'swith@naver.com', 'image', 'study', 'coding', 'cpding', '2022-08-16');