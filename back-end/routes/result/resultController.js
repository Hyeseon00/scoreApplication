const { Op } = require('sequelize');
const path = require('path');
const { Result } = require(path.join(process.env.PWD, '/models'));

exports.getResultAll = (req, res, next) => {
    Result.findAll({
        order : [['result_id', 'DESC']]
    }).then((response) => {
        res.json({
            message : 'success',
            data_list : response
        });
    }).catch((error) => {
        console.log(error);
        const err = new Error(error);
        next(err);
    })
}

// 유저별 게임 결과 조회 
exports.getResultUserOne = (req, res, next) => {
    Result.findOne({
        where : { // "user_id"로 받아서 db의 user_id_A, user_id_B와 값 비교
            [Op.or] : [{ user_id_A : req.params.user_id }, { user_id_B : req.params.user_id }]
        },  
        // include : [{
        //     model : Book,          
        // }],
    }).then((response) => {
        res.json({
            message : 'success',
            data : response,
        });
    }).catch((error) => {
        console.log(error);
        const err = new Error(error);
        next(err);
    });
}

// 게임별 게임 결과 조회 
exports.getResultGameOne = (req, res, next) => {
    Result.findOne({
        where : { // game_id 기준
            game_id : req.params.game_id,
        },  
        include : [{
            model : Book,            
        }],
    }).then((response) => {
        res.json({
            message : 'success',
            data : response,
        });
    }).catch((error) => {
        console.log(error);
        const err = new Error(error);
        next(err);
    });
}

exports.createResult = (req, res, next) => {
    Result.create(req.body, {
            fields : ['result_id', 'game_id', 'user_id_A', 'user_id_B', 'result_score_A', 'result_score_B', 'result_date']
        }).then((response) => {
            res.json({
                message : 'success',
                data : response
            });
        }).catch((error) => {
            console.log(error);
            const err = new Error(error);
            next(err);
        })
}

exports.deleteResult = (req, res, next) => {
    Result.destroy({
        where : {
            result_id : req.params.result_id,
        }
    }).then((response) => {
        res.json({
            message : 'success',
            count : response //영향을 받은 행 수
        });
    }).catch((error) => {
        console.log(error);
        const err = new Error(error);
        next(err);
    });
}