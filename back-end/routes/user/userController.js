const path = require('path');
const { User } = require(path.join(process.env.PWD, '/models'));

exports.getUserAll = (req, res, next) => {
    User.findAll({
        order : [['user_id', 'ASC']]
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

exports.getUserOne = (req, res, next) => {
    User.findOne({
        order : [['user_id', 'ASC']]
    }, {  
        where : {
            user_id : req.body.user_id
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

exports.createUsers = (req, res, next) => {
    User.create(req.body, {
        fields : ['user_id', 'user_age', 'user_gender']
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
