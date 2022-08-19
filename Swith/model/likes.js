const Likes = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        // 모델 이름
        'Likes',
        // 컬럼 정의
        {
            user_id: {
                type: DataTypes.STRING(20), 
                allowNull: false, 
            },
            study_id: {
                type: DataTypes.INTEGER,
                allowNull: false,  
            }
        },
        // 모델의 옵션
        {
            charset: "utf8", // 한국어 설정
            collate: "utf8_general_ci", // 한국어 설정
            timestamps: false, 
            tableName: 'Likes', 
            freezeTableName: true,
        }
    );

    return model;
}

module.exports = Likes;