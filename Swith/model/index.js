const Sequelize = require("sequelize");
const { Op } = require('sequelize');
const config = require("../config/config.json")["development"];
const db = {};
const sequelize = new Sequelize(
    config.database,
    config.username,
    config.password,
    config
);

db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.Op = Op;

db.User = require("./User")(sequelize, Sequelize);
db.Studygroup = require("./Studygroup")(sequelize, Sequelize);
db.Studymember = require("./Studymember")(sequelize, Sequelize);
db.Likes = require("./likes")(sequelize, Sequelize);
db.Studylounge= require("./Studylounge")(sequelize, Sequelize);
db.Reply= require("./Reply")(sequelize, Sequelize);


/* foreign key설정 include 되는 코드!!*/
// db.Studygroup.hasMany(db.Studymember, {
//     foreignKey: 'study_id', 
//     as: 'studymember', // studymember 별칭
//     onDelete: 'cascade', 
//     onUpdate: 'cascade'
// }); 

// 얘가 있으면 include 실행안됨 중복되는 듯 
// db.Studymember.belongsTo(db.Studygroup);

/* foreign key설정 */
// db.Studygroup.hasMany(db.User, {
//     foreignKey: 'user_id',
//     allowNull: false,
//     constraints: true,
//     onDelete: 'cascade'
// })
// db.User.belongsTo(db.Studygroup, {
//     foreignKey: 'user_id'
// });

module.exports = db;