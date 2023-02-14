const path = require('path');
const { Game } = require(path.join(process.env.PWD, '/models'));

exports.getGameAll = (req, res, next) => {
    Game.findAll({
        order : [['game_id', 'ASC']]
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

exports.getGameOne = (req, res, next) => {
    Game.findOne({
        order : [['game_id', 'ASC']]
    }, {  
        where : {
            game_id : req.body.game_id
        }  
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

exports.createGame = (req, res, next) => {
    Game.create(req.body, {
        fields : ['game_id', 'game_name']
    }).then((response) => {
        res.json({
            message : 'success',
            data : response
        });
    }).catch((error) => {
        console.log(error);
        const err = new Error(error);
        next(err);
    });
}

exports.updateGame = (req, res, next) => {
    Result.update({
        game_name : req.body.game_name,
    }, { 
        where : {
            game_id : req.body.game_id
        }
    }).then((response) => {
        res.json({
            message : 'success',
            count : response[0]
        });
    }).catch((error) => {
        console.log(error);
        const err = new Error(error);
        next(err);
    })
}
