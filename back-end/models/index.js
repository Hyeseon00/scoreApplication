'use strict';

const fs = require('fs'); // library for file system r/w
const path = require('path'); // library for Local PATH search
const Sequelize = require('sequelize'); // Sequelize class library

const basename = path.basename(__filename); // To exclude the current file name from the code below
const env = process.env.NODE_ENV || 'development'; // Gets the current node execution environment
const config = require(__dirname + '/../config/config.json')[env]; // Gets the object with db connection environment(config.json)
const db = {}; // empty object declaration

let sequelize; // empty variable declaration (variable where session information will be stored)
if (config.use_env_variable) { // For security reasons, define whether db's connection information is stored and read in the environment variable
  sequelize = new Sequelize(process.env[config.use_env_variable], config); // Create a new session with db(read environment variables)
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config); // Create a new session with db (read "config.json" file)
}

// model object declaration
const User = require('./user'); 
const Game = require('./game');
const Result = require('./result');

// db 객체에 User, Game, Result 모델 담기
db.User = User;
db.Game = Game;
db.Result = Result;

// 각 모델의 static.init method 호출
User.init(sequelize);
Game.init(sequelize);
Result.init(sequelize);

// 다른 테이블과의 관계 연결을 위한 associate method 실행
User.associate(db);
Game.associate(db);
Result.associate(db);


db.sequelize = sequelize; // session과 
db.Sequelize = Sequelize; // class를 db에 추가

module.exports = db;