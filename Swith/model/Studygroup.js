const Studygroup = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        // 모델 이름
        'studygroup',
        // 컬럼 정의
        {
            study_id: {
                type: DataTypes.INTEGER, 
                allowNull: false,
                autoIncrement: true, 
                primaryKey: true, 
            },
            head_id: {
                type: DataTypes.STRING(20), 
                allowNull: false,
            },
            study_name: {
                type: DataTypes.STRING(20), 
                allowNull: false,
            },
            study_category: {
                type: DataTypes.STRING(10), 
                allowNull: false,
            },
            study_form: {
                type: DataTypes.STRING(45), 
                allowNull: false,
            },
            study_recruit: {
                type: DataTypes.STRING(3), 
                allowNull: false,
            },
            study_address: {
                type: DataTypes.STRING(50), 
            },
            study_image: {
                type: DataTypes.STRING(100),
                defaultValue: 'group_default.jpg',
            },
            study_content: {
                type: DataTypes.TEXT,
                allowNull: false,
            },
            start_period: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            end_period: {
                type: DataTypes.DATEONLY,
                allowNull: false,
            },
            study_regdate: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            hashtag: {
                type: DataTypes.TEXT,
                allowNull: false, 
            },
            study_views: {
                type: DataTypes.INTEGER,
                defaultValue: 0,
            }
            
        },
        // 모델의 옵션
        {
            charset: "utf8", // 한국어 설정
            collate: "utf8_general_ci", // 한국어 설정
            timestamps: false, 
            tableName: 'studygroup', 
            freezeTableName: true,
        }
    );

    /* foreign key 설정 */
    Studygroup.associate = models => {
        // N:1, studygroup의 head_id는 user의 user_id에 속해 있다.
        Studygroup.belongsTo(models.User, {foreignKey: "head_id", targetKey: 'user_id', onDelete: 'cascade', onUpdate: 'cascade'});
        // N:M 관계 
        Studygroup.belongsToMany(models.User, { through: 'Studymember' });
        // N:M 관계 
        Studygroup.belongsToMany(models.User, { through: 'Likes' });
        // N:M 관계 
        Studygroup.belongsToMany(models.User, { through: 'Studylounge' });
    }

    return model;
}

module.exports = Studygroup;