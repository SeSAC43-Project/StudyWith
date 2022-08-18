const Studygroup = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        // 모델 이름
        'studygroup',
        // 컬럼 정의
        {
            study_id: {
                type: DataTypes.INTEGER, 
                allowNull: false,
                autoincrement: true, 
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
            },
            study_content: {
                type: DataTypes.STRING(20),
                allowNull: false,
            },
            start_period: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            end_period: {
                type: DataTypes.DATE,
                allowNull: false,
            },
            study_regdate: {
                type: DataTypes.DATE,
                allowNull: false,
                defaultValue: DataTypes.NOW,
            },
            hasgtag: {
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
            timestamps: false, 
            tableName: 'studygroup', 
            freezeTableName: true,
        }
    );

    return model;
}

module.exports = Studygroup;