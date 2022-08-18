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
                type: DataTypes.STRING(100),
                allowNull: false, 
            },
            hint_answer: {
                type: DataTypes.STRING(50),
                allowNull: false, 
            },
            user_name: {
                type: DataTypes.STRING(20),
                allowNull: false, 
            },
            user_email: {
                type: DataTypes.STRING(20),
                allowNull: false, 
            },
            user_image: {
                type: DataTypes.STRING(100),
                allowNull: false, 
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
            timestamps: false, 
            tableName: 'user', 
            freezeTableName: true,
        }
    );

    return model;
}

module.exports = User;