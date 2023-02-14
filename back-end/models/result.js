const Sequelize = require('sequelize');
const { sequelize } = require('.');

module.exports = class Result extends Sequelize.Model {
    static init(sequelize) { // init method : table에 대한 설정
        return super.init({ // 테이블의 컬럼 정보(attribute) 정의
            result_id : {
                type: Sequelize.INTEGER,
                allowable: false,
                unique: true
            },
            user_id_A : {
                type: Sequelize.STRING(45),
                allowable: false,
            },
            user_id_B : {
                type: Sequelize.STRING(45),
                allowable: false,
            },
            result_score_A : {
                type: Sequelize.INTEGER,
                allowable: false,
            },
            result_score_B : {
                type: Sequelize.INTEGER,
                allowable: false,
            },
            result_date : {
                type: Sequelize.DATE,
                allowable: false,
                defaultValue: Sequelize.NOW,
            },
            result_winner : {
                type: Sequelize.STRING(45)
            }
        }, { // 테이블 속성 및 모델 옵션 정의
            sequelize,
            timestamps: false,
            underscored: false,
            modelName: 'Result',
            tableName: 'results',
            paranoid: false,
            charset: 'utf8',
            collate: 'utf8_general_ci',
        });
    }
    static associate(db) { // associate method : 다른 모델과의 관계 설정
        db.Result.belongsToMany(db.User, { through : 'result_has_user' });
        db.Result.belongsToMany(db.Game, { through : 'result_has_game' });
    }
};