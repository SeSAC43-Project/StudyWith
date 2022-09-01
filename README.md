# StudyWith 
### 같은 목표를 가지고 같이 공부할 사람을 찾는 웹사이트 구현 프로젝트 💙(8/17 - 9/1)
## 서비스 소개
<img width="933" alt="스크린샷 2022-09-01 오후 5 12 04" src="https://user-images.githubusercontent.com/92668655/187865685-dc906c6d-ce2a-4d3d-b2eb-eb149c2c3d38.png">

## 팀 소개 
|팀원명|역할(파일명 기준)|
|:--:|:--|
[곽시하(팀장)](https://github.com/SashaGwak)|Front) main, search, login, find, feed, modify, mypage, boardDetail, boardPost</br>Back) Board, Feed, Login, Main, Mypage, model, DB설계|
|[김세준](https://github.com/yesejun-can)|Front)signup, main, navbar&footer, mypage, boardPost, boardDetail, 와이어프레임설계, ppt|
|[성유하](https://github.com/sungyuha)|Front) find, modify, detailedPost, management, 와이어프레임설계, ppt|
|[윤미진](https://github.com/mijinyun)|Front) Login, feed, main, search, board, boardDetail, 와이어프레임설계, 발표|
|[이주옥](https://github.com/juoklee)|Front) signup, detailedPost, management, main</br>Back) DetaildPost, management, signup, model, DB설계|


### 팀원별 responsibility
<img width="926" alt="스크린샷 2022-09-01 오후 5 19 59" src="https://user-images.githubusercontent.com/92668655/187867183-cdb7754d-f9c3-46e0-b671-f2aef2fd7d1a.png">
<img width="924" alt="스크린샷 2022-09-01 오후 5 20 32" src="https://user-images.githubusercontent.com/92668655/187867306-0191ee8a-c359-49c7-a2e1-f53f2cd83656.png">

## DEMO 💻
* [SWTIH 페이지🖌](http://49.50.164.134:8000/swith)


|메인페이지|
|:--:|
|![ezgif com-gif-maker](https://user-images.githubusercontent.com/92668655/187877696-d801b3d1-0c4c-4e62-9b13-b323e6c5413e.gif)|
|* navbar, 스터디 검색, 스터디 등록 페이지 이동</br>* 스터디 등록을 누르면 등록 페이지로 이동</br>* 로그인 버튼을 클릭시 로그인/회원 가입 페이지로 이동</br>* 검색을 통하여 맞춤형 데이터로 검색 가능 </br>* 맞춤형 데이터로 정보 제공(공부인증 챌린지, 이용가이드 - 서비스 준비중, 스터디 이용방법 등 제공)</br>* 하단 맞춤형 데이터로 카테고리 검색 가능 |


|로그인 페이지|
|:--:|
|![로그인](https://user-images.githubusercontent.com/92668655/187881596-1dae6397-dee9-4e10-9abf-8147562f2327.gif)|
|* 로그인 폼-아이디 유효성 검사기능 추가(DB 존재여부확인)</br>* 로그인 세션(로그인 상태유지) 기능</br>* 아이디를 기억해줘 기능(세션, 쿠키 활용)</br>* 회원 가입 및 비밀번호 찾기 페이지 이동 가능|

|스터디 등록|
|:--:|
|<img width="867" alt="스크린샷 2022-09-01 오후 6 31 33" src="https://user-images.githubusercontent.com/92668655/187881841-bc3e3cec-afa4-486c-8794-2a2594e3291e.png">|

|스터디 조회|
|:--:|
|![스터디조회](https://user-images.githubusercontent.com/92668655/187882958-e21a9f45-b945-48e5-9717-0b9876929b4b.gif)|
|* 스터디 그룹의 카테고리 선택하여 스터디 그룹 조회 가능</br>* 원하는 스터디 그룹 맞춤형으로 검색 가능</br>* 스터디 그룹 데이터 모달창으로 간략히 조회가능</br> 좋아요 버튼 클릭하여 관심있는 스터디 체크 가능|

|스터디 상세조회|
|:--:|
|![스터디상세조회](https://user-images.githubusercontent.com/92668655/187884724-3c5fa69d-9beb-4f77-9246-f66a291bac51.gif)|
|* 스터디 그룹 카톡 URL 공유하기 기능</br>* 좋아요 버튼을 누르면 찜 기능</br>* 가입한 스터디팀원들만 소통할 수있는 게시판 페이지로 이동할 수있는 기능</br>* 가입 가능한 스터디 그룹은 가입 가능</br>* 인원이 모두 찬 스터디 그룹은 모집완료로 표시|

|스터디 관리|
|:--:|
|![스터디관리](https://user-images.githubusercontent.com/92668655/187886820-fc60185b-2c9b-46e5-8403-bde076dac2c5.gif)|
|* 스터디 등록 페이지의 작성한 내용 데이터 조회(작성한 내용 수정가능)</br>* 등록시 작성한 스터디 형태만 수정 불가</br>* 삭제하기 버튼을 누르면 게시물 삭제</br>* 조장만 게시물 관리페이지로 갈 수 있는 기능|

|스터디 게시판 조회 및 댓글 기능|
|:--:|
|![스터디 게시판](https://user-images.githubusercontent.com/92668655/187889262-9d0dc488-c1ab-4307-b96a-82ce1dbf0a83.gif)|
|* 인스타그램 컨셉으로 작성된 게시물 조회(제목, 날짜, 내용, 데이터 조회)</br>* 참여하는 스터디원 모두 게시물 작성 가능</br>* 삭제기능으로 게시판 삭제 가능</br>* 댓글 기능으로 스터디원과 함께 소통가능</br>* 자신이 쓴 댓글 삭제 가능|

|마이페이지|
|:--:|
|![ezgif com-gif-maker](https://user-images.githubusercontent.com/92668655/187924835-b521c32c-5a20-427f-aed3-2232f439889a.gif)|
|* 회원정보 수정 기능</br>* 가입한 스터디 그룹 조회 가능(내가 조장인 스터디& 내가  참여하고 있는 스터디)</br>* 내가 좋아요한 스터디 그룹조회</br>* 스터디 그룹 데이터 모달창으로 간략히 조회|



## 기획 및 설계 
### 팀 노션 
* [Swith Notion 📓 ](https://www.notion.so/StudyWith-e93a4cc462c24d248243f0695eeaca56)
### Milestone
<img width="884" alt="스크린샷 2022-09-01 오후 5 23 58" src="https://user-images.githubusercontent.com/92668655/187868033-13e385e0-157a-41ec-bfae-f88cc7c661dd.png">

### 와이어 프레임 
<img width="622" alt="스크린샷 2022-09-01 오후 5 24 52" src="https://user-images.githubusercontent.com/92668655/187868209-0019aa7c-dc88-46d9-8080-f33916d97266.png">


### ERD
<img width="598" alt="스크린샷 2022-09-01 오후 5 25 50" src="https://user-images.githubusercontent.com/92668655/187868501-0450ef2c-4ce4-4ca2-8a5d-83387a971086.png">

### 개발 환경 
![개발환경](https://user-images.githubusercontent.com/92668655/187923449-02bc4a7d-d475-421f-856f-08863966bf58.jpg)
