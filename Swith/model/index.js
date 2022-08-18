const Sequelize = require("sequelize");
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

db.User = require("./User")(sequelize, Sequelize);
db.Studygroup = require("./Studygroup")(sequelize, Sequelize);

/* foreign key설정 */
db.Studygroup.hasMany(db.User, {
    foreignKey: 'user_id',
    allowNull: false,
    constraints: true,
    onDelete: 'cascade'
})
db.User.belongsTo(db.Studygroup, {
    foreignKey: 'user_id'
});
// User.sync({
//     force: process.env.TABLE_CREATE_ALWAYS === 'true', // true : (drop) table 데이터 없어질 수 있음
//     alter: process.env.TABLE_ALTER_SYNC === 'true'     // 개발 끝나면 false로 하기
// })
// Studygroup.sync({
//     force: process.env.TABLE_CREATE_ALWAYS === 'true', // true : (drop) table 데이터 없어질 수 있음
//     alter: process.env.TABLE_ALTER_SYNC === 'true'     // 개발 끝나면 false로 하기
// })

module.exports = db;