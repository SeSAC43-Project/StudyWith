const User = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        // 모델 이름
        'user',
        // 컬럼 정의
        {
            user_id: {
                type: DataTypes.STRING(20), 
                allowNull: false, 
                primaryKey: true, 
            },
            user_password: {
                type: DataTypes.STRING(45), 
                allowNull: false, 
            },
            hint: {
                type: DataTypes.STRING(10),
                allowNull: false, 
            },
            hint_answer: {
                type: DataTypes.STRING(50),
                allowNull: false, 
            },
            user_name: {
                type: DataTypes.STRING(6),
                allowNull: false, 
            },
            user_email: {
                type: DataTypes.STRING(45),
                allowNull: false, 
            },
            user_image: {
                type: DataTypes.STRING(100),
                defaultValue: 'user_default.jpg',
            },
            category1: {
                type: DataTypes.STRING(20),
                allowNull: false, 
            },
            category2: {
                type: DataTypes.STRING(20),
                allowNull: false, 
            },
            category3: {
                type: DataTypes.STRING(20),
                allowNull: false, 
            },
            join_date: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            }
        },
        // 모델의 옵션
        {
            charset: "utf8", // 한국어 설정
            collate: "utf8_general_ci", // 한국어 설정
            timestamps: false, 
            tableName: 'user', 
            freezeTableName: true,
        }
    );

    // /* foreign key 설정 */
    // User.associate = models => {
    //     // 1:N 관계, studygroup의 head_id가 user의 user_id를 참조 하고 있다.
    //     User.hasMany(models.Studygroup, {foreignKey: "head_id", sourceKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade'});
    //     // N:M 관계 
    //     User.belongsToMany(models.Studygroup, { through: 'Studymember', foreignKey:'study_id' });
    //     // N:M 관계 
    //     User.belongsToMany(models.Studygroup, { through: 'Likes' });
    //     // N:M 관계 
    //     User.belongsToMany(models.Studygroup, { through: 'Studylounge' });
    //     // N:M 관계 
    //     User.belongsToMany(models.Studylounge, { through: 'Reply' });
    // };

    return model;
}

module.exports = User;