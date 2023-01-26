const Sequelize = require('sequelize');
const { sequelize } = require('.');

module.exports = class User extends Sequelize.Model {
    static init(sequelize) { // init method : table에 대한 설정
        return super.init({ // 테이블의 컬럼 정보(attribute) 정의
            user_id : {
                type: Sequelize.INTEGER,
                allowable: false,
                unique: true
            },
            user_name : {
                type: Sequelize.STRING(45),
                allowable: false,
            },
            user_age : {
                type: Sequelize.INTEGER,
                allowable: false,
            },
            user_gender : {
                type: Sequelize.INTEGER,
                allowable: false,
            },
        }, { // 테이블 속성 및 모델 옵션 정의
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'User',
            tableName: 'users',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) { // associate method : 다른 모델과의 관계 설정
        db.User.belongsToMany(db.Result, { through : 'result_has_user' });
    }
};