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
db.Studymember = require("./Studymember")(sequelize, Sequelize);
db.Likes = require("./likes")(sequelize, Sequelize);

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