const { sequelize, Studymember } = require("../model/index");
const Models  = require('../model');

// 메인 페이지 렌더링
exports.main_index = (req, res) => {
    res.render('main'); 
}

// 메인 페이지 검색 기능
exports.main_search = async (req, res) => {
    // if (req.body.search == "") { // 검색어가 없는 경우 전체 스터디 정보 보여주기
    //     res.render('main'); 
    //     return 
    // }
    
    // 검색어가 있으면 검색 
    console.log('검색어 : ',req.body.search);
    console.log('카테고리 : ',req.body.category);
    
    // const result = await Models.Studygroup.findAll({
    //         WHERE: {
    //             [Models.Op.or] : [
    //                 {
    //                     hashtag : {
    //                         [Models.Op.like]: '%'+ req.body.search + '%'
    //                     }
    //                 },
    //                 {
    //                     study_name : {
    //                         [Models.Op.like]: '%'+ req.body.search + '%'
    //                     }
    //                 }, 
    //                 {
    //                     study_category : {
    //                         [Models.Op.like]: '%'+ req.body.search + '%'
    //                     }
    //                 },
    //                 {
    //                     study_category : {
    //                         [Models.Op.like]: '%'+ req.body.category + '%'
    //                     }
    //                 }
    //             ]
    //         }
    //     });

    // var currentMember = {}
    // console.log(result.length);
    // for (i=0; i<result.length; i++) {
    //     const result2 = await sequelize.query(`
    //         SELECT study_id, COUNT(*) AS cnt
    //         FROM studymember
    //         WHERE '${result[i].study_id}'
    //         GROUP BY study_id `)
        
    //     currentMember[result[i].study_id] = result2;
    //     }

    // console.log('현재멤버', currentMember);


    let sql = `select studygroup.*, count(studymember.user_id) as num from studygroup left outer join studymember on studygroup.study_id = studymember.study_id where studygroup.study_name like '%${req.body.search}%' group by studygroup.study_id
    UNION
    select studygroup.*, count(studymember.user_id) as num from studygroup left outer join studymember on studygroup.study_id = studymember.study_id where studygroup.study_category like '%${req.body.search}%' group by studygroup.study_id
    UNION
    select studygroup.*, count(studymember.user_id) as num from studygroup left outer join studymember on studygroup.study_id = studymember.study_id where studygroup.study_category like '%${req.body.category}%' group by studygroup.study_id
    UNION
    select studygroup.*, count(studymember.user_id) as num from studygroup left outer join studymember on studygroup.study_id = studymember.study_id where studygroup.hashtag like '%${req.body.search}%' group by studygroup.study_id;`;

    const result3 = await sequelize.query(sql);
    await res.render('search', {data: result3[0], search: req.body.search, category: req.body.category});
    }


// search 페이지에서 상세페이지로 가는 루트 
exports.search_detail = (req, res) => {
    console.log('req.body.study_id', req.body.study_id); 
    res.send({study_id: req.body.study_id, user_id: req.session.user_id});
}

// search 페이지에서 카테고리마다 게시글 검색되도록 
exports.search_category = async (req, res) => {
    let sql = `
    select studygroup.*, count(studymember.user_id) as num from studygroup left outer join studymember on studygroup.study_id = studymember.study_id where studygroup.study_category like '%${req.body.study_category}%' group by studygroup.study_id;`;

    const result3 = await sequelize.query(sql);
    
    console.log('여기가 카테고리 ', result3);
    await res.send({data: result3[0], flag:true});
    // Models.Studygroup.findAll({
    //     where: {  
    //         study_category : {
    //             [Models.Op.like]:'%'+ req.body.study_category + '%'
    //         }
    //     }
    // })
    // .then((result) => {
    //     console.log('여기가 카테고리 ', result);
    //     res.send({data: result, flag: true});
    // })
}