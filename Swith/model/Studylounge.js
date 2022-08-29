const Studylounge = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        // 모델 이름
        'studylounge',
        // 컬럼 정의
        {
            lounge_id: {
                type: DataTypes.INTEGER, 
                allowNull: false,
                autoIncrement: true, 
                primaryKey: true, 
            },
            study_id: {
                type: DataTypes.INTEGER,
                allowNull: false,  
            },
            user_id: {
                type: DataTypes.STRING(20), 
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            lounge_contents: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            lounge_regdate: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            }, 
        },
        // 모델의 옵션
        {
            charset: "utf8", // 한국어 설정
            collate: "utf8_general_ci", // 한국어 설정
            timestamps: false, 
            tableName: 'studylounge', 
            freezeTableName: true,
        }
    );
    
    /* foreign key 설정 */
    Studylounge.associate = models => {
        // 1:N 관계, Reply lounge_id가 Studylounge의 lounge_id를 참조 하고 있다.
        Studylounge.hasMany(models.Reply, {foreignKey: "lounge_id", sourceKey: 'lounge_id', onDelete: 'cascade', onUpdate: 'cascade'});
        // N:M 관계 
        Studylounge.belongsToMany(models.User, { through: 'Reply' });
    };

    return model;
}

module.exports = Studylounge;