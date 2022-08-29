const Reply = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        // 모델 이름
        'reply',
        // 컬럼 정의
        {
            reply_id: {
                type: DataTypes.INTEGER, 
                allowNull: false,
                autoIncrement: true, 
                primaryKey: true, 
            },
            lounge_id: {
                type: DataTypes.INTEGER,
                allowNull: false,  
            },
            user_id: {
                type: DataTypes.STRING(20), 
                allowNull: false,
            },
            reply_contents: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            reply_regdate: {
                type: DataTypes.DATE, //mysql: DATETIME
                allowNull: false,
                defaultValue: DataTypes.NOW,
            }, 
        },
        // 모델의 옵션
        {
            charset: "utf8", // 한국어 설정
            collate: "utf8_general_ci", // 한국어 설정
            timestamps: false, 
            tableName: 'reply', 
            freezeTableName: true,
        }
    );

     /* foreign key 설정 */
     Reply.associate = models => {
        // N:1, Reply lounge_id는 Studylounge의 lounge_id에 속해 있다.
        Reply.belongsTo(models.Studylounge, {foreignKey: "lounge_id", targetKey: 'lounge_id', onDelete: 'cascade', onUpdate: 'cascade'});
    }

    return model;
}

module.exports = Reply;