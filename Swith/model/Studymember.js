const Studymember = (Sequelize, DataTypes) => {
    const model = Sequelize.define(
        // 모델 이름
        'Studymember',
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
            timestamps: false, 
            tableName: 'user', 
            freezeTableName: true,
        }
    );

    return model;
}

module.exports = Studymember;